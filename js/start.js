import { draw, init } from "../script.js";
import { isGameOver, moveTetrominoDown, toggleGameOver } from "./move.js";
import { duration } from "./level.js";
import { getVolume, toggleVolume, volumeOff } from "./volume.js";

let gameInterval = null;
let drawInterval = null;
let isPaused = false;

const notification = document.querySelector(".notification");
const icon = document.querySelector(".notification img");
const startButton = document.querySelectorAll(".startButton");
const startIcon = document.querySelector(".startButton img");
const audio = document.querySelector("#audio");
const startGameBtn = document.querySelector(".notification p");

function onClickStart(e) {
  e.preventDefault();

  const btn = e.target;
  switch (btn.dataset.play) {
    case "start":
      if (startGameBtn.hasAttribute("id") || isGameOver) {
        startNewGame();
      } else {
        start();
      }
      break;
    case "pause":
      pause();
      break;
    case "restart":
      init();
      break;
    case "volume":
      toggleVolume();
      break;
    default:
      break;
  }
}

function start() {
  clearGameInterval();
  isPaused = false;
  startInterval();
  if (!volumeOff) {
    audio.play();
  }
  startButton.forEach((elem) => elem.setAttribute("data-play", "pause"));
  startIcon.setAttribute("src", "./assets/pause.svg");

  icon.removeAttribute("src");
  notification.style.display = "none";
}

function pause() {
  clearGameInterval();
  isPaused = true;
  audio.pause();
  changePauseToStart();

  icon.setAttribute("src", "./assets/play.svg");
  icon.style.cursor = "pointer";

  notification.style.display = "flex";
  notification.style.padding = 0;
  notification.style.backgroundColor = "transparent";
  notification.style.boxShadow = "none";
}

function changePauseToStart() {
  startButton.forEach((elem) => elem.setAttribute("data-play", "start"));
  startIcon.setAttribute("src", "./assets/play.svg");
}

function onIconClick(e) {
  e.preventDefault();
  isPaused = !isPaused;
  if (startGameBtn.hasAttribute("id") || isGameOver) {
    startNewGame();
  } else {
    start();
  }
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

  drawInterval = setInterval(() => {
    draw();
  }, 50);
}

function clearGameInterval() {
  clearInterval(gameInterval);
  clearInterval(drawInterval);
}

function startNewGame() {
  init();
  getVolume();
  toggleGameOver();
  startGameBtn.removeAttribute("id");
  startGameBtn.textContent = "";
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
  isPaused,
  changePauseToStart,
  startNewGame
};
