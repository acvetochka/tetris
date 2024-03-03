
let volumeOff = false;
const volumeIcon = document.querySelector(".volumeButton img");
const audio = document.querySelector('#audio');
const startGame = document.querySelector(".notification #new-game");

function toggleVolume() {
    if(startGame.hasAttribute('id')) {
        volumeOff = false;
        return;
    }
    volumeOff = !volumeOff;
    if (volumeOff) {
        volumeIcon.setAttribute('src', "assets/volume-mute.svg")
        audio.pause();
    }
    else {
        volumeIcon.setAttribute('src', "assets/volume-high.svg")
        audio.play();
    }

}

export { toggleVolume, volumeOff};