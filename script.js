import { PLAYFIELD_COLUMNS, PLAYFIELD_ROWS } from "./js/variables.js";
import { playfield, newTetromino, tetromino, rowTetro, generatePlayField, generateTetromino } from "./js/generate.js"
import { onKeyDown, moveTetrominoDown, onClickBrowser } from "./js/move.js";
import { writeToLocalStorage } from "./js/writeToLocalStorage.js";
import { totalPoints } from "./js/clearRows.js";
import { clearGameInterval, onClickStart, onIconClick, start } from "./js/start.js";

// console.log(totalPoints)

// let tetromino;
let cells;
const startBtn = document.querySelector(".buttonWrapper");
// const pauseBtn = document.querySelector(".pauseButton");
const iconWrap = document.querySelector(".notification");
const score = document.querySelector(".score");
const notification = document.querySelector(".notification p");
const buttonWrap = document.querySelector(".direction");

init();

export function init() {
    notification.innerHTML = ""
    score.innerHTML = 0;
    generatePlayField();
    generateTetromino();
    console.log(tetromino);
    cells = document.querySelectorAll('.grid div');
    clearGameInterval();
    start();
    draw();
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
    // generateTetromino();
    // console.log(newTetromino);
}


writeToLocalStorage();
startBtn.addEventListener('click', onClickStart);
iconWrap.addEventListener('click', onIconClick);
document.addEventListener('keydown', onKeyDown);
buttonWrap.addEventListener("click", onClickBrowser);

export {tetromino};

