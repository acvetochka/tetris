// import { isPaused } from "./variables.js";
import { draw, init } from "../script.js";
import { generatePlayField } from "./generate.js";
import { moveTetrominoDown } from "./move.js";

let gameInterval;
let isPaused = false;
const notification = document.querySelector(".notification");
const icon = document.querySelector(".notification use");
const startButton = document.querySelectorAll(".startButton");
const startIcon = document.querySelector(".startButton use")


function onClickStart(e) {
    e.preventDefault();

    const btn = e.target;
    switch (btn.dataset.play) {
        case "start":
            start();
            break;
        case "pause":
            pause();
            break;
        case "restart":
            init();
        default:
            break;
    }
}

function start() {
    clearGameInterval();
    isPaused = false;
    startInterval();
    startButton.forEach(elem => elem.setAttribute("data-play", "pause"))
    startIcon.setAttribute('href', "./assets/sprite.svg#icon-pause")
    icon.removeAttribute('href');
    notification.style.height = 0;
    notification.style.padding= 0;

}

function pause() {
    clearGameInterval();
    isPaused = true;
    startButton.forEach(elem => elem.setAttribute("data-play", "start"))
    startIcon.setAttribute('href', "./assets/sprite.svg#icon-play")
    icon.setAttribute('href', "./assets/sprite.svg#icon-play");
    icon.style.cursor = "pointer"
    notification.style.height = "auto";
}

function onIconClick(e) {
    e.preventDefault()
    isPaused = !isPaused;
    start()
}

function toggleStartStop(pause) {
    pause = !pause;
    isPaused = pause;
    return isPaused;
}

function startInterval() {
    gameInterval = setInterval(() => {
        moveTetrominoDown();
    }, 1000);

    setInterval(() => {
        draw();
    }, 50);
}

function clearGameInterval() {
    clearInterval(gameInterval);
}

export {
    onClickStart,
    onIconClick,
    clearGameInterval,
    notification,
    icon,
    start,
    pause,
    toggleStartStop,
    isPaused
}