import { playfield } from "./generate.js";
import { PLAYFIELD_COLUMNS, PLAYFIELD_ROWS } from "./variables.js";


function clearFullRows() {
    for (let row = PLAYFIELD_ROWS - 1; row >= 0; row--) {
        if (isRowFull(row)) {
            removeRow(row);
            moveRowsDown(row);
        }
    }
}

function isRowFull(row) {
    for (let column = 0; column < PLAYFIELD_COLUMNS; column++) {
        if (!playfield[row][column]) {
            return false;
        }
    }
    return true;
}

function removeRow(row) {
    playfield.splice(row, 1);
    playfield.unshift(new Array(PLAYFIELD_COLUMNS).fill(0));
}

function moveRowsDown(startRow) {
    for (let row = startRow - 1; row >= 0; row--) {
        for (let column = 0; column < PLAYFIELD_COLUMNS; column++) {
            playfield[row + 1][column] = playfield[row][column];
        }
    }
}

export {clearFullRows}