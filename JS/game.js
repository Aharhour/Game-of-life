document.addEventListener('DOMContentLoaded', () => {
    const gridContainer = document.getElementById('grid');
    const startButton = document.getElementById('start');
    const stopButton = document.getElementById('stop');
    const clearButton = document.getElementById('clear');
    const sizeInput = document.getElementById('size');

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

        cells = [];
        for (let i = 0; i < gridSize * gridSize; i++) {
            const cell = document.createElement('div');
            cell.className = 'cell';
            cell.addEventListener('click', () => cell.classList.toggle('active'));
            gridContainer.appendChild(cell);
            cells.push(cell);
        }
    }

    // Update the grid according to Conway's rules
    function updateGrid() {
        const gridSize = getGridSize();
        const newStates = [];

        // Calculate the new state for each cell
        for (let i = 0; i < cells.length; i++) {
            const isAlive = cells[i].classList.contains('active');
            let aliveNeighbors = 0;

            const x = i % gridSize;
            const y = Math.floor(i / gridSize);

            // Check neighbors
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

            // Determine new state based on neighbor count
            if (isAlive) {
                newStates[i] = aliveNeighbors === 2 || aliveNeighbors === 3;
            } else {
                newStates[i] = aliveNeighbors === 3;
            }
        }

        // Apply new state to each cell
        for (let i = 0; i < cells.length; i++) {
            if (newStates[i]) {
                cells[i].classList.add('active');
            } else {
                cells[i].classList.remove('active');
            }
        }
    }

    // Start the simulation
    function startSimulation() {
        intervalId = setInterval(updateGrid, 100);
    }

    // Stop the simulation
    function stopSimulation() {
        clearInterval(intervalId);
    }

    // Clear the grid
    function clearGrid() {
        cells.forEach(cell => cell.classList.remove('active'));
        stopSimulation();
    }

    // Update grid size and recreate the grid
    function updateGridSize() {
        let newSize = getGridSize();
        
        // If the input value exceeds 75, set it back to 75
        if (parseInt(sizeInput.value, 10) > 75) {
            sizeInput.value = 75;
            newSize = 75;
        }
        
        createGrid(); // Recreate the grid with the new size
        stopSimulation();
    }

    // Attach event listeners to buttons and input
    startButton.addEventListener('click', startSimulation);
    stopButton.addEventListener('click', stopSimulation);
    clearButton.addEventListener('click', clearGrid);
    sizeInput.addEventListener('change', updateGridSize);

    // Initialize the grid
    createGrid();
});