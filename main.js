import "./style.css";
import Experience from "./Experience/Experience.js";

const experience = new Experience(document.querySelector(".experience-canvas"));

if (import.meta.env.DEV) {
    window.__experience = experience;
    window.__sound = experience.sound;
}
