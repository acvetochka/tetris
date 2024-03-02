import { draw } from "../script.js";
import { playfield, tetromino,  generateTetromino, changeTetromino, newTetromino } from "./generate.js";
import { clearFullRows, totalPoints } from "./clearRows.js";
import { randomColor } from "./helpers/randomColor.js";
import { isValid } from "./validation.js";
import { writeToLocalStorage } from "./writeToLocalStorage.js";
import { clearGameInterval, pause, start, toggleStartStop, isPaused } from "./start.js";

let paused = false;
const record = document.querySelector('.record');
const notification = document.querySelector('.notification');
const gameOver = document.querySelector(".notification p");
const icon = document.querySelector(".notification use");

function rotate() {
    rotateTetromino();
    draw();
}
export function rotateTetromino() {
    const oldMatrix = tetromino.matrix;
    const rotatedMatrix = rotateMatrix(tetromino.matrix);
    tetromino.matrix = rotatedMatrix;
    if (!isValid) {
        tetromino.matrix = oldMatrix;
    }
}

function rotateMatrix(matrixTetromino) {
    const N = matrixTetromino.length;
    const rotateMatrix = [];
    for (let i = 0; i < N; i++) {
        rotateMatrix[i] = [];
        for (let j = 0; j < N; j++) {
            rotateMatrix[i][j] = matrixTetromino[N - j - 1][i]
        }
    }
    return rotateMatrix;
}


function placeTetromino() {
    const matrixSize = tetromino.matrix.length;
    for (let row = 0; row < matrixSize; row++) {
        for (let column = 0; column < matrixSize; column++) {
            if (tetromino.matrix[row][column]) {
                playfield[tetromino.row + row][tetromino.column + column] = {
                    name: tetromino.name,
                    color: tetromino.color,
                };
            }
        }
    }
    // generateTetromino();
    changeTetromino();
    console.log(tetromino);
    console.log(newTetromino);

    // tetromino.color = randomColor();
}

function onKeyDown(e) {
    if (e.code === "Space") {
        // console.log(paused)
        !paused ? pause() : start();
        paused = toggleStartStop(paused);

        // console.log(toggleStartStop(isPaused)); 
        // console.log(paused);

        // isPaused = !isPaused;
    }

    // console.log(e);

    if (!isPaused) {
        switch (e.key) {
            case "ArrowUp":
                rotate();
                break;
            case "ArrowDown":
                moveTetrominoDown();
                break;
            case "ArrowLeft":
                moveTetrominoLeft()
                break;
            case "ArrowRight":
                moveTetrominoRight();
                break;
        }
    }

    draw();
}


function moveTetrominoDown() {
    tetromino.row += 1;
    if (!isValid()) {
        tetromino.row -= 1;
        placeTetromino();
        clearFullRows();
        draw();
        // generateTetromino();
        if (!isValid()) {
            clearGameInterval();
            gameOver.innerHTML = "GAME OVER";
            notification.style.height = "auto";
            notification.style.padding = "2vh"
            icon.setAttribute("href", "./assets/sprite.svg#icon-loop");
            // icon.setAttribute("src", "./assets/up.svg")
            isPaused = true;
            writeToLocalStorage();
            return;
        }
    }
}

function moveTetrominoLeft() {
    tetromino.column -= 1;
    if (!isValid()) {
        tetromino.column += 1;
    }
}

function moveTetrominoRight() {
    tetromino.column += 1;
    if (!isValid()) {
        tetromino.column -= 1;
    }
}

function onClickBrowser(e) {
    const btn = e.target;

    if (!isPaused) {
        switch (btn.dataset.click) {
            case "rotate":
                console.log(btn);
                rotate();
                break;
            case "left":
                moveTetrominoLeft();
                break;
            case "right":
                moveTetrominoRight();
                break;
            case "down":
                moveTetrominoDown();
                break;
        }
    }
    draw();
}




// export {};
export { moveTetrominoDown, moveTetrominoLeft, moveTetrominoRight, onKeyDown, placeTetromino, rotate, onClickBrowser }