// import { isPaused } from "./variables.js";
import { draw, init, startNewGame } from "../script.js";
import { generatePlayField } from "./generate.js";
import { moveTetrominoDown } from "./move.js";
import { duration } from "./level.js";
import { toggleVolume, volumeOff } from "./volume.js";

let gameInterval = null;
let isPaused = false;
// let duration = 1000;
const notification = document.querySelector(".notification");
const icon = document.querySelector(".notification use");
const startButton = document.querySelectorAll(".startButton");
const startIcon = document.querySelector(".startButton use");
const audio = document.querySelector('#audio');
const startGameBtn = document.querySelector(".notification #new-game");


function onClickStart(e) {
    e.preventDefault();

    const btn = e.target;
    console.log(e.target);
    switch (btn.dataset.play) {
        case "start":
            // console.log(startGameBtn);
            if(startGameBtn.hasAttribute('id')){
                startNewGame()
            } else {
                start();
            }
            
            // console.log("start");
            break;
        case "pause":
            pause();
            // console.log("pause");
            break;
        case "restart":
            init();
            start();
            // console.log("restart");
            break;
        case "volume":
            toggleVolume();
            // console.log("volume");
            break;
        default:
            break;
    }
}

function start() {
    clearGameInterval();
    isPaused = false;
    startInterval();
    // audio.autoplay= true;
    if(!volumeOff){
        audio.play();
    }
    startButton.forEach(elem => elem.setAttribute("data-play", "pause"))
    startIcon.setAttribute('href', "./assets/sprite.svg#icon-pause")
    icon.removeAttribute('href');
    notification.style.height = 0;
    notification.style.padding= 0;

}

function pause() {
    clearGameInterval();
    // audio.autoplay = false;
    isPaused = true;
    // audio.setAttribute("muted", true);
    // audio.setAttribute('autoplay', false);
    audio.pause();
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
    }, duration);

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
    startInterval,
    clearGameInterval,
    notification,
    icon,
    start,
    pause,
    toggleStartStop,
    isPaused
}