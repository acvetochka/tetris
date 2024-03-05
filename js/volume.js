import { isPaused } from "./start.js";
import { volumeToLocalStorage } from "./writeToLocalStorage.js";
let volumeOff;
const volumeIcon = document.querySelector(".volumeButton img");
const audio = document.querySelector("#audio");
const startGame = document.querySelector(".notification #new-game");

function toggleVolume() {
  if (startGame.hasAttribute("id")) {
    return;
  }
  volumeOff = !volumeOff;
  changeVolumeIcon();
  volumeToLocalStorage();

    if (isPaused) {
      audio.pause();
    } else {
      if (volumeOff) {
        audio.pause();
      } else {
        audio.play();
      }
    }
}

function changeVolumeIcon() {
  volumeOff
    ? volumeIcon.setAttribute("src", "assets/volume-mute.svg")
    : volumeIcon.setAttribute("src", "assets/volume-high.svg");
}

function getVolume() {
  const localVolume = JSON.parse(localStorage.getItem("volumeOff"));

  volumeOff = localVolume;
  
  changeVolumeIcon();
}

export { toggleVolume, volumeOff, getVolume };
