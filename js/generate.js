import { NEW_FIELD_COLUMNS, NEW_FIELD_ROWS, PLAYFIELD_COLUMNS, PLAYFIELD_ROWS, TETROMINO_NAMES, TETROMINOES } from "./variables.js";
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
    const {name, matrix} = generateMatrix();
    const column = getColumn(matrix, PLAYFIELD_COLUMNS)

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
    for (let i = 0; i < NEW_FIELD_ROWS * NEW_FIELD_COLUMNS; i++) {
        const div = document.createElement('div');
        nextField.append(div);
    }

    newField = new Array(NEW_FIELD_ROWS).fill()
        .map(() => new Array(NEW_FIELD_COLUMNS).fill(0))
}

function generateNewTetromino() {
    const {name, matrix} = generateMatrix();
    const column = getColumn(matrix, NEW_FIELD_COLUMNS)

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

function getColumn(matrix, filedColumns) {
    const maxRow = maxInEachRow(matrix);
    const column = Math.floor((filedColumns - maxRow) / 2);
    return column;
}

function generateMatrix() {
    const randomFigure = generateRandomIndex();
    const name = TETROMINO_NAMES[randomFigure]
    const matrix = TETROMINOES[name];

    return { name, matrix }

}

function changeTetromino() {
    tetromino = newTetromino;
    tetromino.column = getColumn(tetromino.matrix, PLAYFIELD_COLUMNS );
    tetromino.row = rowTetro;
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