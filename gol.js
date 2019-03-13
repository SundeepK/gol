let rows = 0;
let cols = 0;
let cellLength;
let rowLength;
let cells;
const cellSizePx = 5;
let inside;
let germsEnabled = false;

function setup() {
    let canvas = createCanvas(800, 600);
    canvas.parent('sketch-holder');
    cols =  width / cellSizePx;
    rows =   height / cellSizePx;
    cells = create2DArray(rows, cols);
    inside = color(255, 255, 255);

    for (let col = 0; col < cells.length; col++) {
        for (let row = 0; row < cells[col].length; row++) {
            cells[col][row] = {
                alive: getRandomInt(2),
                isGerm: false,
                aliveTurns: 0
            }
        }
    }
    cellLength = cells.length;
    rowLength = cells[0].length;
}

function draw() {
    background(1, 1, 1);
    drawCells();
    updateCells();
}

function updateCells() {
  let nextCells = create2DArray(rows, cols);
  for (let c = 0; c < cells.length; c++) {
      for (let r = 0; r < cells[c].length; r++) {
        if (germsEnabled) {
          if (cells[c][r].aliveTurns >= 4) {
              let cellToKill = getCellToKill(r, c);
              nextCells[cellToKill.col][cellToKill.row] = { alive:0, aliveTurns: 0 }
          }

          if (cells[c][r].aliveTurns >= 5) {
              nextCells[c][r] = { alive:0, aliveTurns: 0 }
              continue;
          }
        }
        nextCells[c][r] = getNewCellState(r, c);
      }
  }
  cells = nextCells;
}

function drawCells() {
  for (let i =0; i < cells.length; i++) {
      for (let j = 0; j < cells[i].length; j++) {
         if (cells[i][j].alive === 1) {
             fill(inside);
             rect(i * cellSizePx, j * cellSizePx, cellSizePx, cellSizePx);
          }
      }
  }
}

function getNewCellState(r, c) {
  let nCount = countNeighbours(r, c);
  let cell = cells[c][r];
  if (cell.alive === 0 && nCount === 3) {
      return { alive:1, aliveTurns: 0 };
  } else if (cell.alive === 1 && (nCount < 2 || nCount > 3)) {
      return { alive: 0, aliveTurns:0 };
  } else {
      return { ...cell, aliveTurns: cell.aliveTurns + 1 };
  }
}

function getMin(val) {
    return Math.max(0, val - 1);
}

function getMaxCol(col) {
    return Math.min(col + 1, cellLength - 1);
}

function getMaxRow(row) {
    return Math.min(row + 1, rowLength - 1);
}

function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min; //The maximum is inclusive and the minimum is inclusive
}

function getCellToKill(row, col) {
    return {
        col: getRandomInt(getMin(col), getMaxCol(col)),
        row: getRandomInt(getMin(row), getMaxCol(row))
    }
}

function countNeighbours(row, col) {
    let nCount = 0;
    for (let colOffset = getMin(col); colOffset <= getMaxCol(col); colOffset++) {
        for (let rowOffset = getMin(row); rowOffset <= getMaxRow(row); rowOffset++) {
            if (colOffset === col &&  rowOffset === row) {
                continue;
            }
            if (cells[colOffset][rowOffset].alive === 1) {
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

function toggleGerms() {
  germsEnabled = !germsEnabled;
  document.getElementById("germToggle").innerHTML = germsEnabled ? "Germs enabled" : "Germs disabled";
}
