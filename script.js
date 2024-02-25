import { PLAYFIELD_COLUMNS, PLAYFIELD_ROWS, TETROMINO_NAMES, TETROMINOES } from "./js/variables.js";
// import { maxInEachRow } from "./js/maxInEachRow.js";
// import { randomColor } from "./js/randomColor.js";
import { playfield, tetromino, rowTetro, generatePlayField, generateTetromino } from "./js/generate.js"
import { onKeyDown, placeTetromino, moveTetrominoDown } from "./js/move.js";
// import { clearFullRows } from "./js/clearRows.js";

let gameInterval;

generatePlayField();
generateTetromino();
const cells = document.querySelectorAll('.grid div');

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
            // if(rowTetro >= row) {
                cells[cellIndex].classList.add("figure");
                cells[cellIndex].style.backgroundColor = tetromino.color;
            // }

        }
    }
}

export function draw() {
    cells.forEach(cell => {
        cell.removeAttribute("class");
        cell.removeAttribute("style")
    }
    );
    drawPlayField();
    drawTetromino();
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


export function isValid() {
    const matrixSize = tetromino.matrix.length;
    for (let row = 0; row < matrixSize; row++) {
        for (let column = 0; column < matrixSize; column++) {
            // if (tetromino.matrix[row][column]) continue;
            if (isOutsideOfGameboard(row, column)) {
                return false;
            }
            if (hasCollisions(row, column)) {
                return false;
            }
        }
    }
    return true;
}

function isOutsideOfGameboard(row, column) {
    return tetromino.matrix[row][column] &&
        (tetromino.column + column < 0 ||
            tetromino.column + column >= PLAYFIELD_COLUMNS ||
            tetromino.row + row >= PLAYFIELD_ROWS)
}

function hasCollisions(row, column) {
    return tetromino.matrix[row][column]
        && playfield[tetromino.row + row][tetromino.column + column];
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


draw();

startInterval();
document.addEventListener('keydown', onKeyDown);

// export { gameInterval }
