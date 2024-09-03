document.addEventListener('DOMContentLoaded', () => {

    function GameGrid() {
        const gridContainer = document.getElementById('grid');
        const startButton = document.getElementById('start');
        const stopButton = document.getElementById('stop');
        const clearButton = document.getElementById('clear');
        const sizeInput = document.getElementById('size');
        const scoreDisplay = document.getElementById('score'); // Assuming you have an element to display the score

        function getGridSize() {
            return Math.min(Math.max(parseInt(sizeInput.value, 10), 10), 75);
        }

        let intervalId;
        let cells = [];
        let score = 0;
        let prevStates = []; // To store the previous states of the grid

        function createGrid() {
            const gridSize = getGridSize();
            gridContainer.innerHTML = '';
            gridContainer.style.gridTemplateColumns = `repeat(${gridSize}, 20px)`;
            gridContainer.style.gridTemplateRows = `repeat(${gridSize}, 20px)`;

            cells = [];
            for (let i = 0; i < gridSize * gridSize; i++) {
                const cell = document.createElement('div');
                cell.className = 'cell';
                cell.addEventListener('click', () => cell.classList.toggle('active'));
                gridContainer.appendChild(cell);
                cells.push(cell);
            }

            // Reset score and update the display
            score = 0;
            scoreDisplay.textContent = `Score: ${score}`;
            prevStates = [];
        }

        function calculateInitialScore() {
            // Count all cells that are initially active and add to the score
            let initialLiveCount = cells.filter(cell => cell.classList.contains('active')).length;
            score += initialLiveCount;
            scoreDisplay.textContent = `Score: ${score}`;
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

                if (isAlive) {
                    newStates[i] = aliveNeighbors === 2 || aliveNeighbors === 3;
                } else {
                    newStates[i] = aliveNeighbors === 3;
                }

                // Check if the cell's state will change
                if (isAlive !== newStates[i]) {
                    hasChanged = true;
                }
            }

            // Update the grid
            for (let i = 0; i < cells.length; i++) {
                if (newStates[i]) {
                    cells[i].classList.add('active');
                } else {
                    cells[i].classList.remove('active');
                }
            }

            // Add 1 point if there was a change in the grid state
            if (hasChanged) {
                score += 1;
                scoreDisplay.textContent = `Score: ${score}`;
            }

            // Store the current state as the previous state for the next iteration
            const currentState = cells.map(cell => cell.classList.contains('active'));
            prevStates.push(currentState);
            if (prevStates.length > 2) {
                prevStates.shift(); // Keep only the last two states to check for loops
            }
        }

        function startSimulation() {
            calculateInitialScore(); // Calculate the initial score before starting the simulation
            intervalId = setInterval(updateGrid, 100);
        }

        function stopSimulation() {
            clearInterval(intervalId);
        }

        function clearGrid() {
            cells.forEach(cell => cell.classList.remove('active'));
            stopSimulation();
            score = 0;
            scoreDisplay.textContent = `Score: ${score}`;
            prevStates = [];
        }

        function updateGridSize() {
            let newSize = getGridSize();

            if (parseInt(sizeInput.value, 10) > 75) {
                sizeInput.value = 75;
                newSize = 75;
            }

            createGrid();
            stopSimulation();
        }

        startButton.addEventListener('click', startSimulation);
        stopButton.addEventListener('click', stopSimulation);
        clearButton.addEventListener('click', clearGrid);
        sizeInput.addEventListener('change', updateGridSize);

        createGrid();
    }

    GameGrid();
});
