import { totalPoints } from "./clearRows.js";
import { getNotify } from "./helpers/getNotify.js";
import { level } from "./level.js";
import { volumeOff } from "./volume.js";

const record = document.querySelector('.record');
const bestLevel = document.querySelector(".best-level");
let hasBestResult = false;

function writeToLocalStorage() {
    const recordStorage = localStorage.getItem("record");
    if(!recordStorage || recordStorage < totalPoints) {
        localStorage.setItem("record", totalPoints)
        record.innerHTML = totalPoints;
        if(!hasBestResult) {
            getNotify(`Best result`);
            hasBestResult = true;
        }
    } else {
            record.innerHTML = recordStorage;
    }
}

function volumeToLocalStorage() {
    localStorage.setItem("volumeOff", JSON.stringify(volumeOff));
}

function levelToLocalStorage() {
    const levelStorage = localStorage.getItem("level");
    if(!levelStorage || levelStorage < level) {
        localStorage.setItem("level", level)
        bestLevel.innerHTML = level;
    } else {
            bestLevel.innerHTML = levelStorage;
    }
}

function timeToLocalStorage() {

}


export {
    record,
    writeToLocalStorage,
    volumeToLocalStorage,
    levelToLocalStorage
}
