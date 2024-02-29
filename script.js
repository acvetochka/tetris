import { PLAYFIELD_COLUMNS, PLAYFIELD_ROWS } from "./js/variables.js";
import { playfield, newTetromino, tetromino, rowTetro, generatePlayField, generateTetromino } from "./js/generate.js"
import { onKeyDown, moveTetrominoDown } from "./js/move.js";
import { writeToLocalStorage } from "./js/writeToLocalStorage.js";
import { totalPoints } from "./js/clearRows.js";

// console.log(totalPoints)
let gameInterval;
// let tetromino;

export const notification = document.querySelector(".notification");
export const icon = document.querySelector(".notification use");

generatePlayField();
generateTetromino();
// console.log(newTetromino);
// tetromino = newTetromino;
// const newTetromino = () => generateTetromino();
// console.log(tetromino)
// console.log(newTetromino());

const cells = document.querySelectorAll('.grid div');
const startBtn = document.querySelector(".buttonWrapper");
// const pauseBtn = document.querySelector(".pauseButton");

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


function startInterval() {
    gameInterval = setInterval(() => {
        moveTetrominoDown();
    }, 1000);

    setInterval(() => {
        draw();
    }, 50);
}

export function clearGameInterval() {
    clearInterval(gameInterval);
}


// draw();


function onClickStart(e) {
    e.preventDefault();

    const btn = e.target;

    if (btn.nodeName !== "BUTTON") return;
    switch (btn.textContent) {
        case "Start":
            startInterval();
            btn.textContent = "Pause"
            // notification.innerHTML = "";
            icon.removeAttribute('href');
            notification.style.height=0;
            break;
        case "Pause":
            clearGameInterval();
            btn.textContent = "Start";
            icon.setAttribute('href', "./assets/sprite.svg#icon-play2")
            notification.style.height="auto";
            // notification.innerHTML = "Pause";
            break;
            default:
                break;
    }
    // if (btn.textContent === "Start") {

    // }
    // if (btn.textContent === "Pause") {

    // }
}

writeToLocalStorage();
startBtn.addEventListener('click', onClickStart);

document.addEventListener('keydown', onKeyDown);

// export {tetromino};

