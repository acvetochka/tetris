import { rotateTetromino, draw, isValid, clearGameInterval} from "../script.js";
import { tetromino, playfield, generateTetromino } from "./generate.js";
import { clearFullRows } from "./clearRows.js";
import { randomColor } from "./randomColor.js";

function rotate() {
    rotateTetromino();
    draw();
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
    generateTetromino();

    tetromino.color = randomColor();
}

function onKeyDown(e) {
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

    draw();
}


function moveTetrominoDown() {
    tetromino.row += 1;
    if (!isValid()) {
        tetromino.row -= 1;
        placeTetromino();
        clearFullRows();
        draw();
        generateTetromino();
        if (!isValid()) {
            clearGameInterval();
            alert("GAME OVER");
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

export {moveTetrominoDown, onKeyDown, placeTetromino}