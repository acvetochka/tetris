import { playfield } from "./generate.js";
import { PLAYFIELD_COLUMNS, PLAYFIELD_ROWS } from "./variables.js";
import { writeToLocalStorage } from "./writeToLocalStorage.js";

let totalPoints = 0;
const score = document.querySelector(".score");
const bestResult = document.querySelector('.record');
const storage = localStorage.getItem("record");
const clearAudio = document.querySelector("#clear-audio");

function calculatePoints(clearedRows) {
    switch (clearedRows) {
        case 1:
            return 20;
        case 2:
            return 50;
        case 3:
            return 100;
        case 4:
            return 300;
        default:
            return 0;
    }
}

function clearFullRows() {
    let clearedRowsCount = 0; // Лічильник видалених рядів
    let rowsFull = [];
    for (let row = PLAYFIELD_ROWS - 1; row > 0; row--) {
        if (isRowFull(row)) {
            rowsFull.push(row);
        }
    }
    removeRows(rowsFull);
    moveRowsDown(rowsFull.length);
    clearAudio.play();
    clearedRowsCount += rowsFull.length;
    totalPoints += calculatePoints(clearedRowsCount);
    totalPoints > storage ? bestResult.innerHTML = totalPoints : bestResult.innerHTML = storage;
    score.innerHTML = totalPoints;
    writeToLocalStorage();
}


function isRowFull(row) {
    const rowFull = [];

    for (let column = 0; column < PLAYFIELD_COLUMNS; column++) {
        if (!playfield[row][column]) {
            return false;
        }
    }
    return true;
}


function removeRows(rowsFull) {
        if(rowsFull.length) {
        playfield.splice(rowsFull[0], rowsFull.length);
    }
    rowsFull.forEach(()=> {
        playfield.unshift(new Array(PLAYFIELD_COLUMNS).fill(0))
    })
}

function moveRowsDown(startRow) {
    for (let row = startRow - 1; row >= 0; row--) {
        for (let column = 0; column < PLAYFIELD_COLUMNS; column++) {
            playfield[row + 1][column] = playfield[row][column];
        }
    }
}

export { clearFullRows, totalPoints }