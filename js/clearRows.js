import { generateTetromino, playfield } from "./generate.js";
import { PLAYFIELD_COLUMNS, PLAYFIELD_ROWS } from "./variables.js";
import { volumeOff } from "./volume.js";
import { writeToLocalStorage } from "./writeToLocalStorage.js";

let totalPoints = 0;
const score = document.querySelector(".score");
const bestResult = document.querySelector('.record');
const storage = localStorage.getItem("record");
const clearAudio = document.querySelector("#clear-audio");

function calculatePoints(clearedRows) {
    switch (clearedRows) {
        case 1:
            totalPoints+= 20;
            break;
        case 2:
            totalPoints+= 50;
            break;
        case 3:
            totalPoints+= 100;
            break;
        case 4:
            totalPoints+= 300;
            break;
        default:
            break;
    }
    totalPoints > storage ? bestResult.innerHTML = totalPoints : bestResult.innerHTML = storage;
    score.innerHTML = totalPoints;
}

function clearFullRows() {
    const rowsFull = isRowFull();
    if (rowsFull.length>0) {
        removeRows(rowsFull);
        if(!volumeOff){
            clearAudio.play();
        }
    }
    calculatePoints(rowsFull.length);
    writeToLocalStorage();
}


function isRowFull() {
    let rowsFull = [];
    for (let row = 0; row < PLAYFIELD_ROWS; row++) {
        let clearedRowsCount = 0; // Лічильник видалених рядів
        for (let column = 0; column < PLAYFIELD_COLUMNS; column++) {
            if (playfield[row][column] !== 0) {
                clearedRowsCount += 1;
            }
        }
        if (PLAYFIELD_COLUMNS === clearedRowsCount) {
            rowsFull.push(row);
        }
    }

    return rowsFull;
}


function removeRows(rowsFull) {
    rowsFull.forEach(deleteRow => {
        for(let row = deleteRow; row > 0; row--){
            playfield[row] = playfield[row - 1];
        }
        playfield[0] = new Array(PLAYFIELD_COLUMNS).fill(0);
    })
}


export { clearFullRows, totalPoints }