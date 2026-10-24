# Audio assets

These files are original synthesized placeholders, generated for this project, so the
site has working sound out of the box. Replace any of them with your own recordings
and update the source/license columns.

The code tolerates any file being missing: it logs one `console.warn` for that id and
keeps running.

Music is loaded as `music-main.webm` first, with `music-main.mp3` as the fallback.
WebM is preferred because MP3 loops can leave a tiny gap at the seam. Keep the SFX
total under about 300 KB and the music at or below 1.2 MB.

| id | file | what it should sound like | target length / budget | source | license |
|---|---|---|---|---|---|
| music | music-main.webm + music-main.mp3 | warm lo-fi keys, soft bass, brushed beat, vinyl texture, no vocals, loops seamlessly | 48s loop, <=1.2MB | Original synthesis (this project) | CC0 |
| ambience-night | ambience-night.mp3 | soft crickets / night air | 24s loop, <=500KB | Original synthesis (this project) | CC0 |
| click | ui-click.mp3 | soft, dry click | <0.15s | Original synthesis (this project) | CC0 |
| hover | ui-hover.mp3 | barely-there tick | <0.08s | Original synthesis (this project) | CC0 |
| pop | pop.mp3 | soft marimba-like pop; one file reused at many pitches | <0.3s | Original synthesis (this project) | CC0 |
| whoosh-soft | whoosh-soft.mp3 | airy swish | 0.4-0.6s | Original synthesis (this project) | CC0 |
| whoosh-big | whoosh-big.mp3 | rising swoosh for the cube spin | ~1s | Original synthesis (this project) | CC0 |
| water-bloop | water-bloop.mp3 | single bubble | <0.5s | Original synthesis (this project) | CC0 |
| power-on | power-on.mp3 | soft two-note computer chime | <0.8s | Original synthesis (this project) | CC0 |
| chair-spin | chair-spin.mp3 | rolling swirl | ~1s | Original synthesis (this project) | CC0 |
| ding | ding.mp3 | tiny bell | <0.8s | Original synthesis (this project) | CC0 |
| sparkle | sparkle.mp3 | gentle shimmer | <0.6s | Original synthesis (this project) | CC0 |
| theme-light | theme-light.mp3 | click + bright rising sparkle | <0.6s | Original synthesis (this project) | CC0 |
| theme-dark | theme-dark.mp3 | click + soft low falling tone | <0.6s | Original synthesis (this project) | CC0 |

## Default levels

These live in `Experience/Utils/sounds.js` so they can be tuned by ear.

| id | volume |
|---|---|
| music | 0.35 |
| ambience-night | 0.15 |
| click | 0.35 |
| hover | 0.12 |
| theme-light / theme-dark | 0.4 |
| pop | 0.45 |
| whoosh-soft | 0.25 |
| whoosh-big | 0.4 |
| water-bloop | 0.4 |
| power-on | 0.35 |
| chair-spin | 0.35 |
| ding | 0.3 |
| sparkle | 0.3 |
