import { totalPoints } from "./clearRows.js";
import { getNotify } from "./helpers/getNotify.js";
import { clearGameInterval, startInterval } from "./start.js";

let level = 1;
let duration = 1000;


function changeLevel() {
    if(totalPoints >= level*500) {
        level++;
        duration= Math.floor(duration/1.2);
        clearGameInterval();
        startInterval();
        getNotify(`${level} level`)
    }
}

export {changeLevel, level, duration}