

let rows = 0;
let cols = 0;
let cellLength;
let rowLength;
let cells;
const cellSizePx = 5;
let inside;

function setup() {
    createCanvas(800, 600);
    cols =  width / cellSizePx;
    rows =   height / cellSizePx;
    cells = create2DArray(rows, cols);
    inside = color(255, 255, 255);

    for (let col = 0; col < cells.length; col++) {
        for (let row = 0; row < cells[col].length; row++) {
            cells[col][row] = getRandomInt(2);
        }
    }
    cellLength = cells.length;
    rowLength = cells[0].length;
}

function draw() {
    background(1, 1, 1);

    for (let i =0; i < cells.length; i++) {
        for (let j = 0; j < cells[i].length; j++) {
            if (cells[i][j] === 1) {
                fill(inside);
                rect(i * cellSizePx, j * cellSizePx, cellSizePx, cellSizePx);
            }
        }
    }

    let nextCells = create2DArray(rows, cols);

    for (let c = 0; c < cells.length; c++) {
        for (let r = 0; r < cells[c].length; r++) {

            let nCount = countNeighbours(r, c);
            let state = cells[c][r];

            if (state === 0 && nCount === 3) {
                nextCells[c][r] = 1;
            } else if (state === 1 && (nCount < 2 || nCount > 3)) {
                nextCells[c][r] = 0;
            } else {
                nextCells[c][r] = state;
            }

        }
    }

    cells = nextCells;

}

function getMinBoundingBox(col) {
    return Math.max(0, col - 1);
}

function getMaxBoundingBox(col) {
    return Math.min(col + 1, cellLength - 1);
}

function countNeighbours(row, col) {
    let nCount = 0;
    for (let colOffset = getMinBoundingBox(col); colOffset <= getMaxBoundingBox(col); colOffset++) {
        for (let rowOffset = getMinBoundingBox(row); rowOffset <= getMaxBoundingBox(row); rowOffset++) {
            if (colOffset === col &&  rowOffset === row) {
                continue;
            }
            if (cells[colOffset][ rowOffset]) {
                nCount++;
            }
        }
    }
    return nCount;
}

function create2DArray(rows, cols) {
    let arr = new Array(cols);
    for (let i =0; i < cols; i++) {
        arr[i] = new Array(rows);
    }
    return arr;
}

function getRandomInt(max) {
    return Math.floor(Math.random() * Math.floor(max));
}
