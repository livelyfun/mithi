import { EventEmitter } from "events";
import GSAP from "gsap";
import { Howl, Howler } from "howler";

import Experience from "./Experience.js";
import sounds from "./Utils/sounds.js";

const STORAGE_KEY = "sound-enabled-v3";
const MAX_SFX = 8;
const HOVER_QUERY = "(hover: hover) and (pointer: fine)";

export default class SoundManager extends EventEmitter {
    constructor() {
        super();
        this.experience = new Experience();
        this.theme = this.experience.theme;

        this.definitions = {};
        this.howls = {};
        this.failed = {};
        this.retried = {};
        this.lastPlayed = {};
        this.active = 0;
        this.lastThemeSound = 0;

        this.enabled = false;
        this.loaded = false;
        this.hidden = document.hidden;
        this.themeName = this.theme.theme;
        this.storedPreference = this.readPreference();
        this.preferenceOn = this.storedPreference !== false;

        this.music = null;
        this.night = null;

        sounds.forEach((sound) => {
            this.definitions[sound.id] = sound;
        });

        this.preload(["loader-dots", "cube-pop", "welcome-swell"]);

        this.soundButton = document.querySelector(".sound-button");
        this.hoverMedia = window.matchMedia
            ? window.matchMedia(HOVER_QUERY)
            : null;
        this.canHover = this.hoverMedia ? this.hoverMedia.matches : false;

        this.gestureEvents = ["pointerdown", "keydown", "touchstart"];
        this.onFirstGesture = this.onFirstGesture.bind(this);

        this.updateButton();
        this.setEventListeners();

        this.theme.on("switch", (theme) => this.onThemeSwitch(theme));
    }

    /* Preference -------------------------------------------------- */

    readPreference() {
        try {
            const value = localStorage.getItem(STORAGE_KEY);
            if (value === "on") {
                return true;
            }
            if (value === "off") {
                return false;
            }
            return null;
        } catch (error) {
            return null;
        }
    }

    savePreference(enabled) {
        this.storedPreference = enabled;
        try {
            localStorage.setItem(STORAGE_KEY, enabled ? "on" : "off");
        } catch (error) {
            // Storage can be unavailable in private mode. Sound still works.
        }
    }

    /* Public API --------------------------------------------------- */

    isEnabled() {
        return this.enabled;
    }

    enable() {
        this.preferenceOn = true;

        if (this.enabled) {
            this.startMusic();
            return;
        }

        this.enabled = true;
        this.savePreference(true);
        this.updateButton();
        this.load();

        if (Howler.ctx && Howler.ctx.state === "suspended") {
            Howler.ctx.resume();
        }

        this.startMusic();
        this.startNight();
        this.emit("enable");
    }

    disable() {
        this.preferenceOn = false;
        this.enabled = false;
        this.savePreference(false);
        this.updateButton();
        this.stopMusic(0.4);
        this.stopNight(0.3);
    }

    toggle() {
        if (this.enabled) {
            this.disable();
        } else {
            this.enable();
        }
    }

    play(id, options = {}) {
        if (!this.enabled || this.hidden) {
            return;
        }

        const definition = this.definitions[id];
        if (
            !definition ||
            definition.group === "music" ||
            definition.group === "ambience"
        ) {
            return;
        }

        const howl = this.howls[id];
        if (!howl || this.failed[id]) {
            return;
        }

        const state = howl.state();
        if (state !== "loaded" && !options.allowLoading) {
            return;
        }

        const now = performance.now();
        let minGap = 60;
        if (options.gap !== undefined) {
            minGap = options.gap;
        } else if (definition.gap !== undefined) {
            minGap = definition.gap;
        }

        if (
            this.lastPlayed[id] !== undefined &&
            now - this.lastPlayed[id] < minGap
        ) {
            return;
        }

        if (this.active >= MAX_SFX) {
            return;
        }

        let rate = options.rate !== undefined ? options.rate : 1;
        if (definition.randomRate) {
            rate *= 1 + (Math.random() * 0.08 - 0.04);
        }
        rate = Math.max(0.5, Math.min(4, rate));

        const multiplier = options.volume !== undefined ? options.volume : 1;
        const volume = Math.min(1, definition.volume * multiplier);

        const soundId = howl.play();
        if (soundId === null || soundId === undefined) {
            return;
        }

        this.lastPlayed[id] = now;
        this.active++;

        howl.volume(volume, soundId);
        howl.rate(rate, soundId);

        const release = () => {
            this.active = Math.max(0, this.active - 1);
        };
        howl.once("end", release, soundId);
        howl.once("stop", release, soundId);
        howl.once("playerror", release, soundId);
        if (options.allowLoading) {
            howl.once("loaderror", release);
        }
    }

    /* Loading ------------------------------------------------------ */

    load() {
        if (this.loaded) {
            return;
        }
        this.loaded = true;

        sounds.forEach((definition) => {
            if (definition.group === "music") {
                this.music = this.create(definition);
            } else if (definition.group === "ambience") {
                this.night = this.create(definition);
            } else if (!this.howls[definition.id]) {
                this.howls[definition.id] = this.create(definition);
            }
        });
    }

    preload(ids) {
        ids.forEach((id) => {
            const definition = this.definitions[id];
            if (!definition || this.howls[id] || this.failed[id]) {
                return;
            }
            this.howls[id] = this.create(definition);
        });
    }

    create(definition) {
        const src = definition.fallback
            ? [definition.file, definition.fallback]
            : [definition.file];

        return new Howl({
            src: src,
            loop: Boolean(definition.loop),
            volume: definition.group === "sfx" ? definition.volume : 0,
            pool:
                definition.group === "sfx"
                    ? definition.pool || MAX_SFX
                    : 1,
            preload: true,
            onloaderror: () => {
                this.fail(definition.id, true);
            },
            onplayerror: () => {
                this.fail(definition.id, false);
            },
        });
    }

    fail(id, allowFallback) {
        if (this.failed[id]) {
            return;
        }

        const definition = this.definitions[id];
        if (
            allowFallback &&
            definition &&
            definition.fallback &&
            !this.retried[id]
        ) {
            this.retried[id] = true;
            const retry = this.create({
                ...definition,
                file: definition.fallback,
                fallback: null,
            });

            if (definition.group === "music") {
                this.music = retry;
                this.startMusic();
            } else if (definition.group === "ambience") {
                this.night = retry;
                this.startNight();
            } else {
                this.howls[id] = retry;
            }
            return;
        }

        this.failed[id] = true;
        console.warn(
            `[SoundManager] Could not load "${id}". Skipping that sound.`
        );
    }

    /* Music and ambience ------------------------------------------ */

    musicVolume() {
        return (
            this.definitions.music.volume *
            (this.themeName === "dark" ? 0.7 : 1)
        );
    }

    startMusic(duration = 3) {
        if (!this.music || !this.enabled || this.hidden || this.failed.music) {
            return;
        }

        if (!this.music.playing()) {
            this.music.volume(0);
            this.music.play();
        }
        this.fade(this.music, this.musicVolume(), duration);
    }

    stopMusic(duration = 0.4) {
        if (!this.music) {
            return;
        }

        this.fade(this.music, 0, duration, () => {
            if (this.music) {
                this.music.pause();
            }
        });
    }

    startNight() {
        if (
            !this.night ||
            !this.enabled ||
            this.hidden ||
            this.failed["ambience-night"] ||
            this.themeName !== "dark"
        ) {
            return;
        }

        if (!this.night.playing()) {
            this.night.volume(0);
            this.night.play();
        }
        this.fade(
            this.night,
            this.definitions["ambience-night"].volume,
            1.5
        );
    }

    stopNight(duration = 1.5) {
        if (!this.night) {
            return;
        }

        this.fade(this.night, 0, duration, () => {
            if (this.night) {
                this.night.pause();
            }
        });
    }

    fade(howl, volume, duration, onComplete) {
        if (!howl) {
            return;
        }

        if (howl.fadeTween) {
            howl.fadeTween.kill();
        }

        const state = { volume: howl.volume() };
        howl.fadeTween = GSAP.to(state, {
            volume: volume,
            duration: duration,
            ease: "none",
            onUpdate: () => howl.volume(state.volume),
            onComplete: () => {
                howl.fadeTween = null;
                if (onComplete) {
                    onComplete();
                }
            },
        });
    }

    /* Theme and tab visibility ------------------------------------ */

    onThemeSwitch(theme) {
        this.themeName = theme;

        if (!this.enabled || this.hidden) {
            return;
        }

        const now = performance.now();
        if (now - this.lastThemeSound >= 300) {
            this.lastThemeSound = now;
            this.play(theme === "dark" ? "theme-dark" : "theme-light");
        }

        if (this.music && this.music.playing()) {
            this.fade(this.music, this.musicVolume(), 1.5);
        }

        if (theme === "dark") {
            this.startNight();
        } else {
            this.stopNight();
        }
    }

    onVisibilityChange() {
        this.hidden = document.hidden;

        if (!this.enabled) {
            return;
        }

        if (this.hidden) {
            this.stopMusic(0.3);
            this.stopNight(0.3);
        } else {
            this.startMusic(0.6);
            this.startNight();
        }
    }

    /* Delegated UI sounds ----------------------------------------- */

    setEventListeners() {
        if (this.soundButton) {
            this.soundButton.addEventListener("click", () => this.toggle());
        }

        document.addEventListener("click", (event) => this.onClick(event));
        document.addEventListener("pointerover", (event) =>
            this.onPointerOver(event)
        );
        document.addEventListener("visibilitychange", () =>
            this.onVisibilityChange()
        );

        this.gestureEvents.forEach((name) => {
            document.addEventListener(name, this.onFirstGesture, {
                capture: true,
                passive: true,
            });
        });

        if (this.hoverMedia && this.hoverMedia.addEventListener) {
            this.hoverMedia.addEventListener("change", (event) => {
                this.canHover = event.matches;
            });
        }
    }

    onFirstGesture(event) {
        // Browsers block audio until a user gesture. Start on the first
        // click, key press, scroll, or tap unless the visitor saved "off".
        this.removeGestureListeners();

        const target = event.target;
        if (target instanceof Element && target.closest(".sound-button")) {
            return;
        }

        if (!this.preferenceOn) {
            return;
        }

        this.enable();
    }

    removeGestureListeners() {
        this.gestureEvents.forEach((name) => {
            document.removeEventListener(name, this.onFirstGesture, {
                capture: true,
            });
        });
    }

    onClick(event) {
        const target = event.target.closest("a, button");
        if (!target) {
            return;
        }

        if (target.closest(".toggle-button, .sound-button")) {
            return;
        }

        const href = target.getAttribute("href") || "";
        const path = href.split("?")[0].split("#")[0].toLowerCase();

        if (path.endsWith(".pdf")) {
            this.play("ding", { volume: 0.6 });
        } else {
            this.play("click");
        }
    }

    onPointerOver(event) {
        if (!this.canHover || event.pointerType === "touch") {
            return;
        }

        const target = event.target.closest("a, button");
        if (!target) {
            return;
        }

        if (target.closest(".toggle-button, .sound-button")) {
            return;
        }

        if (target.contains(event.relatedTarget)) {
            return;
        }

        this.play("hover", { volume: 0.6 });
    }

    /* Button state ------------------------------------------------ */

    updateButton() {
        if (!this.soundButton) {
            return;
        }

        const on = this.enabled || this.preferenceOn;
        this.soundButton.setAttribute("aria-pressed", String(on));
        this.soundButton.classList.toggle("off", !on);
    }

    update() {
        // Howler drives its own timing. Nothing to update per frame.
    }
}
