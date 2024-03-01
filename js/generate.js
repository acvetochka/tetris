import { PLAYFIELD_COLUMNS, PLAYFIELD_ROWS, TETROMINO_NAMES, TETROMINOES } from "./variables.js";
import { maxInEachRow } from "./helpers/maxInEachRow.js";
import { randomColor } from "./helpers/randomColor.js";

let playfield;
let tetromino;
let newTetromino;
let rowTetro = 0;
const grid = document.querySelector('.grid')

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

    const randomFigure = Math.floor(Math.random() * TETROMINO_NAMES.length);

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

    // const tetromino2 = {...tetromino1};
    // console.log(tetromino2)
    // newTetromino = {
    //     name,
    //     matrix,
    //     row: rowTetro,
    //     column,
    //     color: randomColor()
    // }

 return tetromino;
}

export {playfield, tetromino, newTetromino, rowTetro, generatePlayField, generateTetromino}