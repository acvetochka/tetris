import { PLAYFIELD_COLUMNS, PLAYFIELD_ROWS, TETROMINO_NAMES, TETROMINOES } from "./variables.js";
import { maxInEachRow } from "./maxInEachRow.js";
import { randomColor } from "./randomColor.js";


function convertPositionToIndex(row, column) {
    return row * PLAYFIELD_COLUMNS + column;
}

let playfield;
let tetromino;

function generatePlayField() {
    for (let i = 0; i < PLAYFIELD_ROWS * PLAYFIELD_COLUMNS; i++) {
        const div = document.createElement('div');
        document.querySelector('.grid').append(div);
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
        row: 0,
        column,
        color: randomColor()
    }
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

generatePlayField();
generateTetromino();

const cells = document.querySelectorAll('.grid div');

function drawPlayField() {
    for (let row = 0; row < PLAYFIELD_ROWS; row++) {
        for (let column = 0; column < PLAYFIELD_COLUMNS; column++) {
            if (!playfield[row][column]) continue;
            const name = playfield[row][column];
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
    const name = tetromino.name;
    const tetrominoMatrixSize = tetromino.matrix.length;

    for (let row = 0; row < tetrominoMatrixSize; row++) {
        for (let column = 0; column < tetrominoMatrixSize; column++) {
            if (!tetromino.matrix[row][column]) continue;
            const cellIndex = convertPositionToIndex(
                tetromino.row + row,
                tetromino.column + column
            );
            cells[cellIndex].classList.add("figure");
            cells[cellIndex].style.backgroundColor = tetromino.color;
        }
    }
}

function draw() {
    cells.forEach(cell => {
        cell.removeAttribute("class");
        cell.removeAttribute("style")}
        );
    drawPlayField();
    drawTetromino();
}

function rotateTetromino() {
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

draw();

function rotate() {
    rotateTetromino();
    draw();
}

document.addEventListener('keydown', onKeyDown);

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

// function moveTetromino() {
//     const tetrominoMatrixSize = tetromino.matrix.length;

//     // for (let row = 0; row < tetrominoMatrixSize; row++) {
//     // for (let column = 0; column < tetrominoMatrixSize; column++) {
//         setTimeout(()=> {
//             if (isValid()) {
//                 moveTetrominoDown();
//             }
//             draw();
//         }, 1000)

//     // }
//     // }
// }


function isValid() {
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
