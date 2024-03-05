import { draw, init} from "../script.js";
import { playfield, tetromino, changeTetromino } from "./generate.js";
import { clearFullRows} from "./clearRows.js";
import { isValid } from "./validation.js";
import { writeToLocalStorage } from "./writeToLocalStorage.js";
import { clearGameInterval, pause, start, toggleStartStop, isPaused, startNewGame } from "./start.js";
import { changeLevel, level } from "./level.js";
import { clearTime } from "./time.js";
import { volumeOff } from "./volume.js";

let paused = false;
let isGameOver = false;
const record = document.querySelector('.record');
const notification = document.querySelector('.notification');
const gameOver = document.querySelector(".notification p");
const icon = document.querySelector(".notification img");
const levelCount = document.querySelector('.level');
const audio = document.querySelector('#audio');
const startGameBtn = document.querySelector(".notification #new-game");
const startButton = document.querySelectorAll(".startButton");
const startIcon = document.querySelector(".startButton img");

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
    clearFullRows();
    changeTetromino();
}

function onKeyDown(e) {
    e.preventDefault();
    if (e.code === "Space") {
        if (startGameBtn.hasAttribute('id')) {
            startNewGame();
        } else if (isGameOver) {
            init();
        } else {
            !paused ? pause() : start();
            paused = toggleStartStop(paused);
        }
    }

    if (e.key === "Escape") {
        init();
    }

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
        draw();
        changeLevel();
        levelCount.innerHTML = level;
        if (!isValid()) {
            gameOverFunc();
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

const style = {
    display: "flex",
    height: "auto",
}
function gameOverFunc() {
    clearGameInterval();
    gameOver.innerHTML = "GAME OVER";
    isGameOver = true;
    clearTime();
    notification.style = style;
    icon.setAttribute("src", "./assets/restart.svg")
    startButton.forEach(elem => elem.setAttribute("data-play", "start"))
    startIcon.setAttribute('src', "./assets/play.svg");
    audio.setAttribute("src", "./assets/music/konec.mp3");
    if (!volumeOff) {
        audio.play();
    }
    audio.loop = false;
    toggleStartStop(paused);
    writeToLocalStorage();
}

function toggleGameOver() {
    isGameOver = false;
}

export {
    moveTetrominoDown,
    moveTetrominoLeft,
    moveTetrominoRight,
    onKeyDown,
    placeTetromino,
    rotate,
    onClickBrowser,
    isGameOver,
    toggleGameOver
}