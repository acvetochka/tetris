import { PLAYFIELD_COLUMNS, PLAYFIELD_ROWS } from "./js/variables.js";
import { playfield, newTetromino, tetromino, rowTetro, generatePlayField, generateTetromino, generateNextField, generateNewTetromino } from "./js/generate.js"
import { onKeyDown, moveTetrominoDown, onClickBrowser } from "./js/move.js";
import { writeToLocalStorage } from "./js/writeToLocalStorage.js";
import { totalPoints } from "./js/clearRows.js";
import { clearGameInterval, onClickStart, onIconClick, start } from "./js/start.js";

// console.log(totalPoints)

// let tetromino;
let cells;
let newCells;
const startBtn = document.querySelector(".buttonWrapper");
// const pauseBtn = document.querySelector(".pauseButton");
const iconWrap = document.querySelector(".notification");
const score = document.querySelector(".score");
const notification = document.querySelector(".notification p");
const buttonWrap = document.querySelector(".direction");

init();



export function init() {
    document.removeEventListener('keydown', onKeyDown)
    notification.innerHTML = ""
    score.innerHTML = 0;
    generatePlayField();
    generateTetromino();
    generateNextField();
    generateNewTetromino();
    // console.log(tetromino);
    console.table(newTetromino.matrix);
    cells = document.querySelectorAll('.grid div');
    newCells = document.querySelectorAll(".next div");
    clearGameInterval();
    start();
    draw();
    drawNext();
    startBtn.addEventListener('click', onClickStart);
    iconWrap.addEventListener('click', onIconClick);
    document.addEventListener('keydown', onKeyDown);
    buttonWrap.addEventListener("click", onClickBrowser);
}


function convertPositionToIndex(row, column) {
    return row * PLAYFIELD_COLUMNS + column;
}

function drawPlayField() {
    for (let row = 0; row < PLAYFIELD_ROWS; row++) {
        for (let column = 0; column < PLAYFIELD_COLUMNS; column++) {
            if (!playfield[row][column]) continue;
            // const name = playfield[row][column];
            const cellIndex = convertPositionToIndex(row, column);
            const cellData = playfield[row][column];

            if (!cells[cellIndex].classList.contains("figure")) {
                cells[cellIndex].classList.add("figure");
                cells[cellIndex].style.backgroundColor = cellData.color;
            }
        }
    }
}

function drawTetromino() {
    // const name = tetromino.name;
    const tetrominoMatrixSize = tetromino.matrix.length;

    for (let row = 0; row < tetrominoMatrixSize; row++) {
        for (let column = 0; column < tetrominoMatrixSize; column++) {
            if (!tetromino.matrix[row][column]) continue;
            const cellIndex = convertPositionToIndex(
                tetromino.row + row,
                tetromino.column + column
            );
            if (cells[cellIndex]) {
                cells[cellIndex].classList.add("figure");
                cells[cellIndex].style.backgroundColor = tetromino.color;
            }

        }
    }
}

export function drawNext() {
    const tetrominoMatrixSize = newTetromino.matrix.length;
    newCells.forEach(cell => {
        if (cell) {
            cell.removeAttribute("class");
            cell.removeAttribute("style")
        }
    })

    for (let row = 0; row < tetrominoMatrixSize; row++) {
        for (let column = 0; column < tetrominoMatrixSize; column++) {
            if (!newTetromino.matrix[row][column]) continue;
            const cellIndex = (newTetromino.row + row) * 6 + newTetromino.column + column
            
            // convertPositionToIndex(
            //     newTetromino.row + row,
            //     newTetromino.column + column
            // );
            if (newCells[cellIndex]) {
                newCells[cellIndex].classList.add("figure");
                newCells[cellIndex].style.backgroundColor = newTetromino.color;
            }

        }
    }
}

export function draw() {
    cells.forEach(cell => {
        if (cell) {
            cell.removeAttribute("class");
            cell.removeAttribute("style")
        }
    }
    );
    drawPlayField();
    drawTetromino();
    // drawNext();
    // generateTetromino();
    // console.log(newTetromino);
}


writeToLocalStorage();

export { tetromino };

