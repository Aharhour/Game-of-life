const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');
const startBtn = document.getElementById('startBtn');
const stopBtn = document.getElementById('stopBtn');
const clearBtn = document.getElementById('clearBtn');
const speedInput = document.getElementById('speed');

const rows = 50;
const cols = 50;
const cellSize = canvas.width / cols;

let grid = createGrid(rows, cols);
let running = false;
let interval;

function createGrid(rows, cols) {
    return Array.from({ length: rows }, () => Array(cols).fill(0));
}

function drawGrid(grid) {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    for (let row = 0; row < rows; row++) {
        for (let col = 0; col < cols; col++) {
            ctx.beginPath();
            ctx.rect(col * cellSize, row * cellSize, cellSize, cellSize);
            ctx.fillStyle = grid[row][col] ? 'black' : 'white';
            ctx.fill();
            ctx.stroke();
        }
    }
}

function updateGrid(grid) {
    const newGrid = createGrid(rows, cols);
    for (let row = 0; row < rows; row++) {
        for (let col = 0; col < cols; col++) {
            const aliveNeighbors = countAliveNeighbors(grid, row, col);
            if (grid[row][col]) {
                newGrid[row][col] = aliveNeighbors === 2 || aliveNeighbors === 3 ? 1 : 0;
            } else {
                newGrid[row][col] = aliveNeighbors === 3 ? 1 : 0;
            }
        }
    }
    return newGrid;
}

function countAliveNeighbors(grid, x, y) {
    const neighbors = [
        [-1, -1], [-1, 0], [-1, 1],
        [0, -1],           [0, 1],
        [1, -1], [1, 0], [1, 1],
    ];
    return neighbors.reduce((acc, [dx, dy]) => {
        const newX = x + dx;
        const newY = y + dy;
        if (newX >= 0 && newX < rows && newY >= 0 && newY < cols) {
            acc += grid[newX][newY];
        }
        return acc;
    }, 0);
}

canvas.addEventListener('click', (event) => {
    const rect = canvas.getBoundingClientRect();
    const x = Math.floor((event.clientX - rect.left) / cellSize);
    const y = Math.floor((event.clientY - rect.top) / cellSize);
    grid[y][x] = grid[y][x] ? 0 : 1;
    drawGrid(grid);
});

startBtn.addEventListener('click', () => {
    if (!running) {
        running = true;
        interval = setInterval(() => {
            grid = updateGrid(grid);
            drawGrid(grid);
        }, speedInput.value);
    }
});

stopBtn.addEventListener('click', () => {
    running = false;
    clearInterval(interval);
});

clearBtn.addEventListener('click', () => {
    grid = createGrid(rows, cols);
    drawGrid(grid);
});

speedInput.addEventListener('input', () => {
if (running) {
        clearInterval(interval);
        const minInterval = 10;
        const maxInterval = 200;
        const speed = speedInput.value;
        const intervalTime = maxInterval - ((speed - 10) * (maxInterval - minInterval) / (100 - 10));

        interval = setInterval(() => {
            grid = updateGrid(grid);
            drawGrid(grid);
        }, intervalTime);
    }
});

drawGrid(grid);