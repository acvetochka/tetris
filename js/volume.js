
let volumeOff = false;
const volumeIcon = document.querySelector(".volumeButton use");
const audio = document.querySelector('#audio');
const startButton = document.querySelectorAll(".startButton");

function toggleVolume() {
    // if(startButton.dataset.play = "start") {
    //     volumeOff = false;
    //     return;
    // }
    volumeOff = !volumeOff;
    if (volumeOff) {
        volumeIcon.setAttribute("href", "./assets/sprite.svg#icon-volume-mute");
        audio.pause();
    }
    else {
        volumeIcon.setAttribute("href", "./assets/sprite.svg#icon-volume-high");
        audio.play();
    }

}

export { toggleVolume, volumeOff};