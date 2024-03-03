import { totalPoints } from "./clearRows.js";

export const record = document.querySelector('.record');

export function writeToLocalStorage() {
    const recordStorage = localStorage.getItem("record");
    if(!recordStorage || recordStorage < totalPoints) {
        localStorage.setItem("record", totalPoints)
        record.innerHTML = totalPoints;
    } else {
            record.innerHTML = recordStorage;
    }
}
