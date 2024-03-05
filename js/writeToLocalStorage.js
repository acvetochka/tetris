import { totalPoints } from "./clearRows.js";
import { volumeOff } from "./volume.js";

const record = document.querySelector('.record');

function writeToLocalStorage() {
    const recordStorage = localStorage.getItem("record");
    if(!recordStorage || recordStorage < totalPoints) {
        localStorage.setItem("record", totalPoints)
        record.innerHTML = totalPoints;
    } else {
            record.innerHTML = recordStorage;
    }
}

function volumeToLocalStorage() {
    localStorage.setItem("volumeOff", JSON.stringify(volumeOff));
}

export {
    record,
    writeToLocalStorage,
    volumeToLocalStorage
}
