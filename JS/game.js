document.addEventListener('DOMContentLoaded', () => {

function GameGrid() {
    // Gets and or creates all the elements for the game
    const gridContainer = document.getElementById('grid');
    const startButton = document.getElementById('start');
    const stopButton = document.getElementById('stop');
    const clearButton = document.getElementById('clear');
    const sizeInput = document.getElementById('size');
    const scoreDisplay = document.getElementById('score');
    const clickColorInput = document.getElementById('color-click');
    const backgroundColorInput = document.getElementById('background-color');
    const GameTimer = document.getElementById('gamespeed');

    let intervalId;
    let cells = [];
    let score = 0;
    let prevStates = [];

    GameTimer.addEventListener('input', () => {
        clearInterval(intervalId);
        intervalId = setInterval(updateGrid, timespeeds());
    });

    // Returns the grid size based on user input, clamped between 10 and 75.
    function getGridSize() {
        return Math.min(Math.max(parseInt(sizeInput.value, 10), 10), 75);
    }

    // Function to calculate speed based on the sliders value
    function timespeeds() {
        return 1000 / GameTimer.value;
    }

    // Updates the score and displays it in the HTML
    function updateScore(newScore) {
        score = newScore;
        scoreDisplay.textContent = score;
    }

    function createGrid() {
        // Gets the size of the grid from the input element in the HTML
        const gridSize = getGridSize();

        // Clear the grid
        gridContainer.innerHTML = '';

        // Makes the grid by using the gridSize amount ( X, Y based ) and they are gonna be 20px by 20px
        gridContainer.style.gridTemplateColumns = `repeat(${gridSize}, 20px)`;
        gridContainer.style.gridTemplateRows = `repeat(${gridSize}, 20px)`;
        
        const backgroundColor = backgroundColorInput.value;
        gridContainer.style.backgroundColor = backgroundColor

        // Creates the cells array to hold each cell element
        cells = [];

        // Create the grid by adding 'gridSize * gridSize' cells to the grid container
        for (let i = 0; i < gridSize * gridSize; i++) {
            const cell = document.createElement('div');
            cell.className = 'cell';
            cell.style.backgroundColor = backgroundColor;
            cell.addEventListener('click', () => {
                const clickColor = clickColorInput.value;
                cell.classList.toggle('active');
                if (cell.classList.contains('active')) {
                    cell.style.backgroundColor = clickColor; 
                } else {
                    cell.style.backgroundColor = backgroundColor; 
                }
            });
            gridContainer.appendChild(cell);
            cells.push(cell);
        }

        // Resets the score to 0 when grid is created
        updateScore(0);
        // Clears previous states as the grid has been reset
        prevStates = [];
    }

// Updates the score by adding the count of active cells to the current score
function calculateInitialScore() {
    let initialLiveCount = cells.filter(cell => cell.classList.contains('active')).length;
    updateScore(score + (initialLiveCount * 1000));
}

    function updateGrid() {
        const gridSize = getGridSize();
        const newStates = [];
        let hasChanged = false;
    
        for (let i = 0; i < cells.length; i++) {
            const isAlive = cells[i].classList.contains('active');
            let aliveNeighbors = 0;
            const x = i % gridSize;
            const y = Math.floor(i / gridSize);
    
            for (let dx = -1; dx <= 1; dx++) {
                for (let dy = -1; dy <= 1; dy++) {
                    if (dx === 0 && dy === 0) continue;
                    const nx = x + dx;
                    const ny = y + dy;
                    if (nx >= 0 && nx < gridSize && ny >= 0 && ny < gridSize) {
                        const neighborIndex = nx + ny * gridSize;
                        if (cells[neighborIndex].classList.contains('active')) {
                            aliveNeighbors++;
                        }
                    }
                }
            }

            newStates[i] = (isAlive && (aliveNeighbors === 2 || aliveNeighbors === 3)) ||
                        (!isAlive && aliveNeighbors === 3);

            if (isAlive !== newStates[i]) {
                hasChanged = true;
            }
        }

        const clickColor = clickColorInput.value;
        const backgroundColor = backgroundColorInput.value;

        let newScore = 0;

        for (let i = 0; i < cells.length; i++) {
            if (newStates[i]) {
                cells[i].classList.add('active');
                cells[i].style.backgroundColor = clickColor;
                newScore += 1000;
            } else {
                cells[i].classList.remove('active');
                cells[i].style.backgroundColor = backgroundColor;
            }
        }
    
        // Update the score only if there are changes
        if (hasChanged) {
            updateScore(score + newScore);  // Add newScore to the current score
        }
    
        const currentState = cells.map(cell => cell.classList.contains('active'));
        prevStates.push(currentState);
    
        if (prevStates.length > 2) {
            prevStates.shift();
        }
    }
    

    function startSimulation() {
        calculateInitialScore();
        intervalId = setInterval(updateGrid, timespeeds());
    }

    function stopSimulation() {
        clearInterval(intervalId);

        if (score === 0) return;
        localStorage.setItem('first', JSON.stringify(score));
        const scores = JSON.parse(localStorage.getItem('scores') || '[]');

        if (!scores.includes(score)) {
            scores.push(score);
            localStorage.setItem('scores', JSON.stringify(scores));
        }
    }

    function clearGrid() {
        const backgroundColor = backgroundColorInput.value;
        cells.forEach(cell => {
            cell.classList.remove('active');
            cell.style.backgroundColor = backgroundColor; 
        });
        stopSimulation();
        updateScore(0);
        prevStates = [];
        // console.log(localStorage.getItem('scores'));
    }

    function updateGridSize() {
        if (parseInt(sizeInput.value, 10) > 75) {
            sizeInput.value = 75;
        }

        createGrid();
        stopSimulation();
    }

    startButton.addEventListener('click', startSimulation);
    stopButton.addEventListener('click', stopSimulation);
    clearButton.addEventListener('click', clearGrid);
    sizeInput.addEventListener('change', updateGridSize);
    clickColorInput.addEventListener('change', createGrid);
    backgroundColorInput.addEventListener('change', createGrid);

    createGrid();
}

GameGrid();

// Voor aram
// console.log(localStorage.getItem('first', score));
});