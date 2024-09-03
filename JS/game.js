document.addEventListener('DOMContentLoaded', () => {
    const gridContainer = document.getElementById('grid');
    const startButton = document.getElementById('start');
    const stopButton = document.getElementById('stop');
    const clearButton = document.getElementById('clear');
    const sizeInput = document.getElementById('size');
    const cgitlickColorInput = document.getElementById('color-click');
    const backgroundColorInput = document.getElementById('background-color');

    function getGridSize() {
        return Math.min(Math.max(parseInt(sizeInput.value, 10), 10), 75);
    }

    let intervalId;
    let cells = [];

    // Create the grid with cells
    function createGrid() {
        const gridSize = getGridSize();
        gridContainer.innerHTML = ''; // Clear previous grid
        gridContainer.style.gridTemplateColumns = `repeat(${gridSize}, 20px)`;
        gridContainer.style.gridTemplateRows = `repeat(${gridSize}, 20px)`;

        const backgroundColor = backgroundColorInput.value;
        gridContainer.style.backgroundColor = backgroundColor; // Set the grid background color

        cells = [];
        for (let i = 0; i < gridSize * gridSize; i++) {
            const cell = document.createElement('div');
            cell.className = 'cell';
            cell.id = 'cell';
            cell.style.backgroundColor = backgroundColor;

            cell.addEventListener('click', () => {
                const clickColor = clickColorInput.value;
                cell.classList.toggle('active');
                if (cell.classList.contains('active')) {
                    cell.style.backgroundColor = clickColor; // Set cell color to click color when active
                } else {
                    cell.style.backgroundColor = backgroundColor; // Reset cell color to background color when inactive
                }
            });
            gridContainer.appendChild(cell);
            cells.push(cell);

    function GameGrid() {
        // Gets and or creates all the elements for the game
        const gridContainer = document.getElementById('grid');
        const startButton = document.getElementById('start');
        const stopButton = document.getElementById('stop');
        const clearButton = document.getElementById('clear');
        const sizeInput = document.getElementById('size');
        const scoreDisplay = document.getElementById('score');

        let intervalId;
        let cells = [];
        let score = 0;
        let prevStates = [];

        // Returns the grid size based on user input, clamped between 10 and 75.
        function getGridSize() {
            return Math.min(Math.max(parseInt(sizeInput.value, 10), 10), 75);
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

            // Creates the cells array to hold each cell element
            cells = [];

            // Create the grid by adding 'gridSize * gridSize' cells to the grid container
            for (let i = 0; i < gridSize * gridSize; i++) {
                const cell = document.createElement('div');
                cell.className = 'cell';
                cell.addEventListener('click', () => cell.classList.toggle('active'));
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
            updateScore(score + initialLiveCount);
        }


        function updateGrid() {
            // Get the current grid size from the input
            const gridSize = getGridSize();

            const newStates = [];

            // Flag to check if any cell state has changed
            let hasChanged = false;
        
            // Checks over each cell to decide its next state
            for (let i = 0; i < cells.length; i++) {
                // Check if the current cell is 'active'
                const isAlive = cells[i].classList.contains('active');
                // Count of the numbers of alive around it
                let aliveNeighbors = 0;
        
                // Calculate the x and y coordinates of the current cell in the grid
                const x = i % gridSize;
                const y = Math.floor(i / gridSize);
        
                // Checks over the cells around it (3x3 grid surrounding the cell)
                for (let dx = -1; dx <= 1; dx++) {
                    for (let dy = -1; dy <= 1; dy++) {
                        // Skip the cell itself
                        if (dx === 0 && dy === 0) continue;
        
                        // Calculate the coordinates of the cell around it
                        const nx = x + dx;
                        const ny = y + dy;
        
                        // Check if the neighbor coordinates are within the grids limits
                        if (nx >= 0 && nx < gridSize && ny >= 0 && ny < gridSize) {
                            // Calculate the index of the cells around it
                            const neighborIndex = nx + ny * gridSize;
                            // Check if the neighboring cell is an 'active' cell
                            if (cells[neighborIndex].classList.contains('active')) {
                                aliveNeighbors++;
                            }
                        }
                    }
                }
        
                // Checks if the state of the current cell is based on the number of alive neighbors
                if (isAlive) {
                    // Cell remains alive if it has 2 or 3 alive neighbors, otherwise it dies
                    newStates[i] = aliveNeighbors === 2 || aliveNeighbors === 3;
                } else {
                    // Cell becomes alive if it has exactly 3 alive neighbors
                    newStates[i] = aliveNeighbors === 3;
                }
        
                // If the state of the cell has changed, set the flag
                if (isAlive !== newStates[i]) {
                    hasChanged = true;
                }
            }
        
            // Apply the new state to each cell
            for (let i = 0; i < cells.length; i++) {
                if (newStates[i]) {
                    cells[i].classList.add('active');
                } else {
                    cells[i].classList.remove('active');
                }
            }
        
            // If any cell state has changed, update the score
            if (hasChanged) {
                updateScore(score + 1);
            }
        
            // Save the current state of the grid
            const currentState = cells.map(cell => cell.classList.contains('active'));
            prevStates.push(currentState);
            
            // Keep only the last two states in history
            if (prevStates.length > 2) {
                prevStates.shift();
            }
        }
        

        // Starts the game with a 1 second speed
        function startSimulation() {
            calculateInitialScore();
            intervalId = setInterval(updateGrid, 100);
        }

        function stopSimulation() {
            clearInterval(intervalId);

            if (score === 0) return;

            const scores = JSON.parse(localStorage.getItem('scores') || '[]');

            if (!scores.includes(score)) {
                scores.push(score);

                localStorage.setItem('scores', JSON.stringify(scores));
            }
        }

        // Clears all the active cells
        function clearGrid() {
            cells.forEach(cell => cell.classList.remove('active'));
            stopSimulation();
            updateScore(0);
            prevStates = [];
            console.log(localStorage.getItem('scores'));
        }

        // Maximum size of the grid and updates the grid to match with the input of the user
        function updateGridSize() {
            if (parseInt(sizeInput.value, 10) > 75) {
                sizeInput.value = 75;
            }

            createGrid();
            stopSimulation();
        }

        // When Button is pressed functions
        startButton.addEventListener('click', startSimulation);
        stopButton.addEventListener('click', stopSimulation);
        clearButton.addEventListener('click', clearGrid);
        sizeInput.addEventListener('change', updateGridSize);

        createGrid();
    }

    GameGrid();
        });