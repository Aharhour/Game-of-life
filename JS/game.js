document.addEventListener('DOMContentLoaded', () => {
    const gridContainer = document.getElementById('grid');
    const startButton = document.getElementById('start');
    const stopButton = document.getElementById('stop');
    const clearButton = document.getElementById('clear');
    const sizeInput = document.getElementById('size');
    const clickColorInput = document.getElementById('color-click');
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
            newStates[i] = isAlive
                ? aliveNeighbors === 2 || aliveNeighbors === 3
                : aliveNeighbors === 3;
        }

        // Apply new state to each cell
        const clickColor = clickColorInput.value;
        const backgroundColor = backgroundColorInput.value;
        for (let i = 0; i < cells.length; i++) {
            if (newStates[i]) {
                cells[i].classList.add('active');
                cells[i].style.backgroundColor = clickColor; // Active cells get the click color
            } else {
                cells[i].classList.remove('active');
                cells[i].style.backgroundColor = backgroundColor; // Inactive cells reset to background color
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
        const backgroundColor = backgroundColorInput.value;
        cells.forEach(cell => {
            cell.classList.remove('active');
            cell.style.backgroundColor = backgroundColor; // Reset all cells to background color
        });
        stopSimulation();
    }

    // Update grid size and recreate the grid
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

    clickColorInput.addEventListener('change', createGrid);
    backgroundColorInput.addEventListener('change', createGrid);

    createGrid();
});