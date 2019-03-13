

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

function countNeighbours(row, col) {
    let nCount = 0;
    for (let colOffset = - 1; colOffset < 2; colOffset++) {
        for (let rowOffset = - 1; rowOffset < 2; rowOffset++) {
            if (col + colOffset === col &&  row + rowOffset === row) {
                continue;
            }
            if (isOutColBounds(col, colOffset) || isOutRowBounds(row, rowOffset)) {
                continue;
            }
            if (cells[col + colOffset][row + rowOffset]) {
                nCount++;
            }
        }
    }
    return nCount;
}

function isOutColBounds(col, colOffset) {
    return colOffset + col > cellLength - 1 || colOffset + col < 0;
}

function isOutRowBounds(row, rowOffset) {
    return row + rowOffset < 0 || row + rowOffset > rowLength - 1;
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


