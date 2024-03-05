import { totalPoints } from "./clearRows.js";
import { getNotify } from "./helpers/getNotify.js";
import { volumeOff } from "./volume.js";

const record = document.querySelector('.record');
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

export {
    record,
    writeToLocalStorage,
    volumeToLocalStorage
}
