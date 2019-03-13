

let rows = 0;
let cols = 0;
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

            let nCount = 0;

            // nw
            if (c - 1 >= 0 && r - 1 >= 0 && cells[c -1][r-1] === 1) {
                nCount++
            }

            // n
            if (r - 1 >=0 && cells[c][r-1] === 1) {
                nCount++
            }

            // ne
            if (c + 1 < cells.length && r - 1 >= 0 && cells[c + 1][r - 1] === 1) {
                nCount++
            }

            // e
            if (c + 1 < cells.length && cells[c + 1][r] === 1) {
                nCount++
            }

            // se
            if (c + 1 < cells.length && r + 1 < cells[c].length && cells[c + 1][r + 1] === 1) {
                nCount++
            }

            // s
            if (r + 1 < cells[c].length && cells[c][r + 1] === 1) {
                nCount++
            }

            // sw
            if (c - 1 >= 0 && r + 1  < cells[c].length && cells[c - 1][r + 1] === 1) {
                nCount++
            }

            // w
            if (c - 1 >=0 && cells[c - 1][r] === 1) {
                nCount++
            }

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

