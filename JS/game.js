document.addEventListener('DOMContentLoaded', () => {
    function GameGrid() {
        const gridContainer = document.getElementById('grid');
        const startButton = document.getElementById('start');
        const stopButton = document.getElementById('stop');
        const clearButton = document.getElementById('clear');
        const sizeInput = document.getElementById('size');
        const scoreDisplay = document.getElementById('score');
        const clickColorInput = document.getElementById('color-click');
        const backgroundColorInput = document.getElementById('background-color');
        const gameTimer = document.getElementById('gamespeed');
        const timerDisplay = document.getElementById('timer');

        let intervalId = null;
        let countdownInterval = null;
        let cells = [];
        let score = 0;
        let isRunning = false;
        let countdown = 30;
        let prevStates = [];

        // Update game speed based on slider input
        gameTimer.addEventListener('input', () => {
            if (isRunning) {
                clearInterval(intervalId);
                intervalId = setInterval(updateGrid, getGameSpeed());
            }
        });

        // Grid size logic
        function getGridSize() {
            return Math.min(Math.max(parseInt(sizeInput.value, 10), 10), 75);
        }

        // Return game speed based on input
        function getGameSpeed() {
            return 1000 / gameTimer.value;
        }

        // Update score display
        function updateScore(newScore) {
            score = newScore;
            scoreDisplay.textContent = score;
        }

        // Create the game grid
        function createGrid() {
            const gridSize = getGridSize();
            gridContainer.innerHTML = '';
            gridContainer.style.gridTemplateColumns = `repeat(${gridSize}, 20px)`;
            gridContainer.style.gridTemplateRows = `repeat(${gridSize}, 20px)`;

            const backgroundColor = backgroundColorInput.value;
            gridContainer.style.backgroundColor = backgroundColor;

            cells = [];
            for (let i = 0; i < gridSize * gridSize; i++) {
                const cell = document.createElement('div');
                cell.className = 'cell';
                cell.style.backgroundColor = backgroundColor;
                cell.addEventListener('click', () => {
                    const clickColor = clickColorInput.value;
                    cell.classList.toggle('active');
                    cell.style.backgroundColor = cell.classList.contains('active') ? clickColor : backgroundColor;
                });
                gridContainer.appendChild(cell);
                cells.push(cell);
            }

            updateScore(0);
            prevStates = [];
        }

        // Calculate score based on active cells
        function calculateInitialScore() {
            let initialLiveCount = cells.filter(cell => cell.classList.contains('active')).length;
            updateScore(score + (initialLiveCount * 1000));
        }

        // Update grid state for the next step
        function updateGrid() {
            const gridSize = getGridSize();
            const newStates = [];
            let hasChanged = false;

            for (let i = 0; i < cells.length; i++) {
                const isAlive = cells[i].classList.contains('active');
                let aliveNeighbors = 0;
                const x = i % gridSize;
                const y = Math.floor(i / gridSize);

                // Check the 8 neighbors
                for (let dx = -1; dx <= 1; dx++) {
                    for (let dy = -1; dy <= 1; dy++) {
                        if (dx === 0 && dy === 0) continue; // Skip the cell itself
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

                // Apply the rules of the game
                newStates[i] = isAlive ? (aliveNeighbors === 2 || aliveNeighbors === 3) : (aliveNeighbors === 3);
                if (isAlive !== newStates[i]) hasChanged = true;
            }

            // Update cells with new state
            const clickColor = clickColorInput.value;
            const backgroundColor = backgroundColorInput.value;
            for (let i = 0; i < cells.length; i++) {
                if (newStates[i]) {
                    cells[i].classList.add('active');
                    cells[i].style.backgroundColor = clickColor;
                } else {
                    cells[i].classList.remove('active');
                    cells[i].style.backgroundColor = backgroundColor;
                }
            }

            if (!hasChanged) return; // Stop if no changes occurred
            updateScore(score + 1000);

            // Stop if there are no active cells
            const activeCellCount = cells.filter(cell => cell.classList.contains('active')).length;
            if (activeCellCount === 0) stopSimulation();

            prevStates.push(cells.map(cell => cell.classList.contains('active')));
            if (prevStates.length > 2) prevStates.shift();
        }

        // Start the simulation
        function startSimulation() {
            if (isRunning) return; // Prevent multiple starts
            isRunning = true;

            calculateInitialScore();
            intervalId = setInterval(updateGrid, getGameSpeed());
            startCountdown();
        }

        // Stop the simulation
        function stopSimulation() {
            if (!isRunning) return;

            clearInterval(intervalId);
            clearInterval(countdownInterval);
            isRunning = false;
            intervalId = null;
        }

        // Clear the grid and stop the simulation
        function clearGrid() {
            stopSimulation();
            const backgroundColor = backgroundColorInput.value;
            cells.forEach(cell => {
                cell.classList.remove('active');
                cell.style.backgroundColor = backgroundColor;
            });
            updateScore(0);
        }

        // Start countdown timer for the game
        function startCountdown() {
            countdown = 30;
            timerDisplay.textContent = countdown;

            countdownInterval = setInterval(() => {
                countdown--;
                timerDisplay.textContent = countdown;
                if (countdown <= 0) {
                    stopSimulation();
                    clearGrid();
                }
            }, 1000);
        }

        // Event listeners
        startButton.addEventListener('click', startSimulation);
        stopButton.addEventListener('click', stopSimulation);
        clearButton.addEventListener('click', clearGrid);
        sizeInput.addEventListener('change', createGrid);
        clickColorInput.addEventListener('change', createGrid);
        backgroundColorInput.addEventListener('change', createGrid);

        createGrid(); // Initialize the grid when the page loads
    }

    GameGrid();
});