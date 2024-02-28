// import { totalPoints } from "./clearRows";

export const record = document.querySelector('.record');

export function writeToLocalStorage() {
    const recordStorage = localStorage.getItem("record");
    // if(!recordStorage) {
    //     return;
    // } else if (!totalPoints) {
    //     record.innerHTML = recordStorage;
    // }
    // if (recordStorage && recordStorage > totalPoints) {
    //     record.innerHTML = recordStorage;
    // } else {
    //     localStorage.setItem("record", totalPoints)
    //     record.innerHTML = totalPoints;
    // }
}
