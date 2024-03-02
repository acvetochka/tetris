import { PLAYFIELD_COLUMNS, PLAYFIELD_ROWS, TETROMINO_NAMES, TETROMINOES } from "./variables.js";
import { maxInEachRow } from "./helpers/maxInEachRow.js";
import { randomColor } from "./helpers/randomColor.js";
import { drawNext } from "../script.js";

let playfield;
let newField;
let tetromino;
let newTetromino;
let rowTetro = 0;
const grid = document.querySelector('.grid');
const nextField = document.querySelector(".next");

function generatePlayField() {
    grid.innerHTML = "";
    for (let i = 0; i < PLAYFIELD_ROWS * PLAYFIELD_COLUMNS; i++) {
        const div = document.createElement('div');
        grid.append(div);
    }

    playfield = new Array(PLAYFIELD_ROWS).fill()
        .map(() => new Array(PLAYFIELD_COLUMNS).fill(0))
}

function generateTetromino() {

    const randomFigure = generateRandomIndex();

    const name = TETROMINO_NAMES[randomFigure]
    const matrix = TETROMINOES[name];

    const maxRow = maxInEachRow(matrix);
    const column = Math.floor((PLAYFIELD_COLUMNS - maxRow) / 2);

    tetromino = {
        name,
        matrix,
        row: rowTetro,
        column,
        color: randomColor()
    }
 return tetromino;
}

function generateNextField() {
    nextField.innerHTML = "";
    for (let i = 0; i < 6 * 5; i++) {
        const div = document.createElement('div');
        nextField.append(div);
    }

    newField = new Array(6).fill()
        .map(() => new Array(5).fill(0))
}

function generateNewTetromino() {
    const randomFigure = generateRandomIndex();
    const name = TETROMINO_NAMES[randomFigure]
    const matrix = TETROMINOES[name];

    const maxRow = maxInEachRow(matrix);
    const column = Math.floor((6 - matrix.length) / 2);
    // const colum = Math.floor(())

    newTetromino = {
        name, 
        matrix,
        column,
        row: 1,
        color: randomColor()
    }
}

function generateRandomIndex() {
    return Math.floor(Math.random() * TETROMINO_NAMES.length);
}

function changeTetromino() {
    tetromino = newTetromino;
    generateNewTetromino();
    drawNext();
}

export {
    playfield, 
    tetromino, 
    newTetromino, 
    rowTetro, 
    generatePlayField, 
    generateTetromino, 
    generateNewTetromino, 
    generateNextField,
    changeTetromino
}