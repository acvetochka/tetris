import { NEW_FIELD_COLUMNS, PLAYFIELD_COLUMNS, PLAYFIELD_ROWS } from "./js/variables.js";
import { playfield, newTetromino, tetromino,  generatePlayField, generateTetromino, generateNextField, generateNewTetromino } from "./js/generate.js"
import { onKeyDown,  onClickBrowser, toggleGameOver } from "./js/move.js";
import { levelToLocalStorage, writeToLocalStorage } from "./js/writeToLocalStorage.js";
import { clearGameInterval, onClickStart, onIconClick, start } from "./js/start.js";
import { getVolume } from "./js/volume.js";
import { clearTime, convertAndUpdate, getTime, totalTime} from "./js/time.js";

let cells;
let newCells;
const startBtn = document.querySelector(".buttonWrapper");
const score = document.querySelector(".score");
const notification = document.querySelector(".notification p");
const buttonWrap = document.querySelector(".direction");
const audio = document.querySelector("#audio");
const startGameIcon = document.querySelector(".notification .icon-play")
const time = document.querySelector(".time");
const totalTimeEl = document.querySelector(".total-time")


function generate() {
    generatePlayField();
    generateTetromino();
    generateNextField();
    generateNewTetromino();
    cells = document.querySelectorAll('.grid div');
    newCells = document.querySelectorAll(".next div");
    getVolume();
    totalTimeEl.textContent = convertAndUpdate(totalTime)
}


generate();

export function init() {
    clearAll();
    toggleGameOver();
    generate();
    document.addEventListener('keydown', onKeyDown);
    buttonWrap.addEventListener("click", onClickBrowser);
    audio.setAttribute("src", './assets/music/tetris.mp3');
    audio.loop = true;

    start();
    draw();
    drawNext();
    getTime();
}

function clearAll() {
    document.removeEventListener('keydown', onKeyDown);
    notification.innerHTML = "";
    score.innerHTML = 0;
    clearGameInterval();
    clearTime();

    time.textContent = "00:00:00";
}


function convertPositionToIndex(row, column, fieldColumns = PLAYFIELD_COLUMNS) {
    return row * fieldColumns + column;
}

function drawPlayField() {
    for (let row = 0; row < PLAYFIELD_ROWS; row++) {
        for (let column = 0; column < PLAYFIELD_COLUMNS; column++) {
            if (!playfield[row][column]) continue;
            const cellIndex = convertPositionToIndex(row, column);
            const cellData = playfield[row][column];

            if (!cells[cellIndex].classList.contains("figure")) {
                cells[cellIndex].classList.add("figure");
                cells[cellIndex].style.backgroundColor = cellData.color;
                cells[cellIndex].style.boxShadow = `inset 0.2vh 0.1vh 0.6vh 0.5vh rgba(0, 0, 0, 0.47)`;
            }
        }
    }
}

function drawTetromino() {
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
                cells[cellIndex].style.boxShadow = `inset 0.2vh 0.1vh 0.6vh 0.5vh rgba(0, 0, 0, 0.47), 0 0 20vh 0.2vh ${tetromino.color}`;
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
            const cellIndex =
                convertPositionToIndex(
                    newTetromino.row + row,
                    newTetromino.column + column,
                    NEW_FIELD_COLUMNS
                );
            if (newCells[cellIndex]) {
                newCells[cellIndex].classList.add("figure");
                newCells[cellIndex].style.backgroundColor = newTetromino.color;
                cells[cellIndex].style.boxShadow = `inset 0.2vh 0.1vh 0.6vh 0.5vh rgba(0, 0, 0, 0.47), 0 0 20vh 0.2vh ${newTetromino.color}`
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
}

startGameIcon.addEventListener('click', onIconClick);
startBtn.addEventListener('click', onClickStart);
document.addEventListener('keydown', onKeyDown);

writeToLocalStorage();
levelToLocalStorage();

export { tetromino};

