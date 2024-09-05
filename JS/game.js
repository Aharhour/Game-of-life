document.addEventListener('DOMContentLoaded', () => {
    function GameGrid() {
        const gridContainer = document.getElementById('grid');
        const startButton = document.getElementById('start');
        const stopButton = document.getElementById('stop');
        const clearButton = document.getElementById('clear');
        const sizeInput = document.getElementById('size'); // The grid size input element
        const scoreDisplay = document.getElementById('score');
        const clickColorInput = document.getElementById('color-click');
        const backgroundColorInput = document.getElementById('background-color');
        const gameTimer = document.getElementById('gamespeed');
        const timerDisplay = document.getElementById('timer');
        const toggleModeButton = document.getElementById('toggle-mode'); // Button for mode toggle
        const gameElements = document.getElementById('game-elements'); // Timer and score container

        let intervalId = null;
        let countdownInterval = null;
        let cells = [];
        let score = 0;
        let isRunning = false;
        let countdown = 15;
        let prevStates = [];
        let maxActiveCells = 20;
        let placedCells = 0;
        let isGameMode = false; // Default is Free Play mode

        // Update game speed based on slider input
        gameTimer.addEventListener('input', () => {
            if (isRunning) {
                clearInterval(intervalId);
                intervalId = setInterval(updateGrid, getGameSpeed());
            }
        });

        // Toggle between Game Mode and Free Play Mode
        toggleModeButton.addEventListener('click', () => {
            isGameMode = !isGameMode;
            if (isGameMode) {
                toggleModeButton.textContent = "Switch to Free Play";
                gameElements.style.display = 'block'; // Show timer and score
                placedCells = 0; // Reset placed cells in game mode
            } else {
                toggleModeButton.textContent = "Switch to Game Mode";
                gameElements.style.display = 'none'; // Hide timer and score
            }
        });

        // Grid size logic
        function getGridSize() {
            return Math.min(Math.max(parseInt(sizeInput.value, 10), 10), 75);
        }

        // Event listener to recreate the grid whenever the size input is changed
        sizeInput.addEventListener('input', createGrid);

        // Return game speed based on input
        function getGameSpeed() {
            return 1000 / gameTimer.value;
        }

        // Update score display
        function updateScore(newScore) {
            score = newScore;
            scoreDisplay.textContent = score;
        }

        // Save score to localStorage
        function saveScoreToLocalStorage() {
            if (score > 0 && isGameMode) { // Only save score in game mode
                const scores = JSON.parse(localStorage.getItem('scores') || '[]');
                scores.push(score);
                localStorage.setItem('scores', JSON.stringify(scores));
            }
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
                cell.addEventListener('click', () => handleCellClick(cell));
                gridContainer.appendChild(cell);
                cells.push(cell);
            }

            updateScore(0);
            prevStates = [];
            placedCells = 0; // Reset placed cells count
        }

        // Handle cell clicks to toggle 'active' state
        function handleCellClick(cell) {
            // Only block interaction after the game starts in Game Mode
            if (isGameMode && isRunning) return; // Disable cell clicks once the game has started in Game Mode
        
            if (isGameMode && !cell.classList.contains('active') && placedCells >= maxActiveCells) {
                alert(`You can only activate a maximum of ${maxActiveCells} cells in Game Mode.`);
                return; // Prevent placing more than maxActiveCells in Game Mode
            }
        
            const clickColor = clickColorInput.value;
            const backgroundColor = backgroundColorInput.value;
            cell.classList.toggle('active');
            if (cell.classList.contains('active')) {
                cell.style.backgroundColor = clickColor;
                if (isGameMode) placedCells++; // Increment placed cells in Game Mode
            } else {
                cell.style.backgroundColor = backgroundColor;
                if (isGameMode) placedCells--; // Decrement placed cells in Game Mode
            }
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

            if (isGameMode) {
                calculateInitialScore();
                startCountdown();
            }

            intervalId = setInterval(updateGrid, getGameSpeed());
        }

        // Stop the simulation
        function stopSimulation() {
            if (!isRunning) return;
            clearInterval(intervalId);
            isRunning = false;

            if (isGameMode) {
                clearInterval(countdownInterval);
                saveScoreToLocalStorage(); // Save score when game stops
            }
        }

        // Clear the grid
        function clearGrid() {
            stopSimulation();  // Stop the game if it's running
            const backgroundColor = backgroundColorInput.value;  // Get the current background color
            cells.forEach(cell => {
                cell.classList.remove('active');  // Deactivate all cells
                cell.style.backgroundColor = backgroundColor;  // Reset background color to default
            });
            updateScore(0);  // Reset the score
            placedCells = 0;  // Reset placed cells count
        }

        // Calculate initial score based on placed cells
        function calculateInitialScore() {
            const initialActiveCells = cells.filter(cell => cell.classList.contains('active')).length;
            updateScore(initialActiveCells * 100); // Example score calculation
        }

        // Start the countdown timer in game mode
        function startCountdown() {
            countdown = 15;
            timerDisplay.textContent = countdown;

            countdownInterval = setInterval(() => {
                countdown--;
                timerDisplay.textContent = countdown;

                if (countdown <= 0) {
                    clearInterval(countdownInterval);
                    stopSimulation();
                    alert('Game over! Your final score is ' + score);
                }
            }, 1000);
        }

        // Event listeners
        startButton.addEventListener('click', startSimulation);
        stopButton.addEventListener('click', stopSimulation);
        clearButton.addEventListener('click', clearGrid);

        // Initialize the grid
        createGrid();
    }

    GameGrid();
});


