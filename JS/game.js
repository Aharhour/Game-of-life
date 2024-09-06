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
        const toggleModeButton = document.getElementById('toggle-mode');
        const gameElements = document.getElementById('game-elements');  
        const gridCounterDisplay = document.getElementById('grid-counter');

        let intervalId = null;
        let countdownInterval = null;
        let cells = [];
        let score = 0;
        let isRunning = false;
        let countdown = 15;
        let maxActiveCells = 20;
        let placedCells = 0;
        let isGameMode = false;
        let gridCounterValue = 20;

        gameTimer.addEventListener('input', () => {
            if (isRunning) {
                clearInterval(intervalId);
                intervalId = setInterval(updateGrid, getGameSpeed());
            }
        });

        toggleModeButton.addEventListener('click', () => {
            if (isGameMode) {
                clearGrid(); // Dit zorgt ervoor dat het rooster opnieuw wordt ingesteld
            }
            isGameMode = !isGameMode;
            toggleModeButton.textContent = isGameMode ? "Free Mode" : "Game Mode";
            gameElements.style.display = isGameMode ? 'block' : 'none';
            placedCells = 0; // Reset geplaatste cellen bij modus wijziging
        });

        sizeInput.addEventListener('input', createGrid);

        function getGridSize() {
            return Math.min(Math.max(parseInt(sizeInput.value, 10), 10), 75);
        }

        function getGameSpeed() {
            return 1000 / gameTimer.value;
        }

        function updateScore(newScore) {
            score = newScore;
            scoreDisplay.textContent = score;
        }

        function saveScoreToLocalStorage() {
            if (score > 0 && isGameMode) {
                const selectedCharacter = localStorage.getItem('selectedCharacter');
                if (selectedCharacter) {
                    const scores = JSON.parse(localStorage.getItem('scores') || '[]');
                    scores.push({ name: selectedCharacter, score });
                    localStorage.setItem('scores', JSON.stringify(scores));
                }
            }
        }

        function createGrid() {
            const gridSize = getGridSize();
            gridContainer.innerHTML = '';
            gridContainer.style.gridTemplateColumns = `repeat(${gridSize}, 20px)`;
            gridContainer.style.gridTemplateRows = `repeat(${gridSize}, 20px)`;

            const backgroundColor = backgroundColorInput.value;
            gridContainer.style.backgroundColor = backgroundColor;
            cells = Array.from({ length: gridSize * gridSize }, () => {
                const cell = document.createElement('div');
                cell.className = 'cell';
                cell.style.backgroundColor = backgroundColor;
                cell.addEventListener('click', () => handleCellClick(cell));
                gridContainer.appendChild(cell);
                return cell;
            });

            updateScore(0);
            placedCells = 0;
            resetGridCounter();
        }

        function handleCellClick(cell) {
            if (isGameMode && isRunning) return;

            if (isGameMode && !cell.classList.contains('active') && placedCells >= maxActiveCells) {
                alert(`Je mag maximaal ${maxActiveCells} cellen activeren in de spelmodus.`);
                return;
            }

            const clickColor = clickColorInput.value;
            const backgroundColor = backgroundColorInput.value;
            cell.classList.toggle('active');
            cell.style.backgroundColor = cell.classList.contains('active') ? clickColor : backgroundColor;

            if (isGameMode) placedCells += cell.classList.contains('active') ? 1 : -1;
            updateGridCounter();
        }

        function updateGrid() {
            const gridSize = getGridSize();
            let hasChanged = false;

            const newStates = cells.map((cell, i) => {
                const isAlive = cell.classList.contains('active');
                const neighbors = getAliveNeighbors(i, gridSize);
                const nextState = isAlive ? (neighbors === 2 || neighbors === 3) : (neighbors === 3);
                hasChanged = hasChanged || isAlive !== nextState;
                return nextState;
            });

            const clickColor = clickColorInput.value;
            const backgroundColor = backgroundColorInput.value;
            newStates.forEach((state, i) => {
                cells[i].classList.toggle('active', state);
                cells[i].style.backgroundColor = state ? clickColor : backgroundColor;
            });

            if (!hasChanged) return;
            updateScore(score + 1000);
            if (!cells.some(cell => cell.classList.contains('active'))) stopSimulation();
        }

        function getAliveNeighbors(i, gridSize) {
            const x = i % gridSize;
            const y = Math.floor(i / gridSize);
            let aliveNeighbors = 0;

            for (let dx = -1; dx <= 1; dx++) {
                for (let dy = -1; dy <= 1; dy++) {
                    if (dx === 0 && dy === 0) continue;
                    const nx = x + dx;
                    const ny = y + dy;
                    if (nx >= 0 && nx < gridSize && ny >= 0 && ny < gridSize) {
                        const neighborIndex = nx + ny * gridSize;
                        if (cells[neighborIndex].classList.contains('active')) aliveNeighbors++;
                    }
                }
            }
            return aliveNeighbors;
        }

        function startSimulation() {
            if (isRunning) return;
            isRunning = true;
            if (isGameMode) {
                calculateInitialScore();
                startCountdown();
            }
            intervalId = setInterval(updateGrid, getGameSpeed());
        }

        function stopSimulation() {
            if (!isRunning) return;
            clearInterval(intervalId);
            isRunning = false;
            if (isGameMode) {
                clearInterval(countdownInterval);
                saveScoreToLocalStorage();
                if (typeof updateLeaderboard === 'function') {
                    updateLeaderboard(); // Voeg de score toe aan het leaderboard
                }
            }
        }

        function clearGrid() {
            stopSimulation();
            const backgroundColor = backgroundColorInput.value;
            cells.forEach(cell => {
                cell.classList.remove('active');
                cell.style.backgroundColor = backgroundColor;
            });
            updateScore(0);
            placedCells = 0;
            resetGridCounter();
            if (typeof updateLeaderboard === 'function') {
                updateLeaderboard();
            }
        }

        function calculateInitialScore() {
            const initialActiveCells = cells.filter(cell => cell.classList.contains('active')).length;
            updateScore(initialActiveCells * 100);
        }

        function startCountdown() {
            countdown = 15;
            timerDisplay.textContent = countdown;

            countdownInterval = setInterval(() => {
                countdown--;
                timerDisplay.textContent = countdown;
                if (countdown <= 0) {
                    clearInterval(countdownInterval);
                    stopSimulation();
                    alert('Game over! Je eindscore is ' + score);
                    if (typeof updateLeaderboard === 'function') {
                        updateLeaderboard(); // Voeg de score toe aan het leaderboard bij het einde van de countdown
                    }
                }
            }, 1000);
        }

        function updateGridCounter() {
            if (gridCounterValue > 0) {
                gridCounterValue--;
                gridCounterDisplay.textContent =`${gridCounterValue}`;
            }
        }

        function resetGridCounter() {
            gridCounterValue = 20;
            gridCounterDisplay.textContent =`${gridCounterValue}`;
        }

        startButton.addEventListener('click', startSimulation);
        stopButton.addEventListener('click', stopSimulation);
        clearButton.addEventListener('click', clearGrid);

        createGrid();
    }

    GameGrid();
});