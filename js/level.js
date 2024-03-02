import { totalPoints } from "./clearRows.js";
import { clearGameInterval, startInterval } from "./start.js";

let level = 1;
let duration = 1000;

function changeLevel() {
    if(totalPoints >= level*500) {
        level++;
        duration= Math.floor(duration/1.2);
        console.log(duration);
        clearGameInterval();
        startInterval();
    }
}

export {changeLevel, level, duration}