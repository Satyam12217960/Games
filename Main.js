document.addEventListener("DOMContentLoaded", function() {
    const N = 9; // Size of Sudoku grid
    const grid = [
        [5, 3, 0, 0, 7, 0, 0, 0, 0],
        [6, 0, 0, 1, 9, 5, 0, 0, 0],
        [0, 9, 8, 0, 0, 0, 0, 6, 0],
        [8, 0, 0, 0, 6, 0, 0, 0, 3],
        [4, 0, 0, 8, 0, 3, 0, 0, 1],
        [7, 0, 0, 0, 2, 0, 0, 0, 6],
        [0, 6, 0, 0, 0, 0, 2, 8, 0],
        [0, 0, 0, 4, 1, 9, 0, 0, 5],
        [0, 0, 0, 0, 8, 0, 0, 7, 9]
    ]; // Predefined Sudoku values

    const sudokuGrid = document.getElementById("sudoku-grid");

    // Generate 81 cells for the Sudoku grid with predefined values
    for (let i = 0; i < N * N; i++) {
        const cell = document.createElement("div");
        cell.classList.add("cell");

        const row = Math.floor(i / N);
        const col = i % N;
        if ((row + 1) % 3 === 0) cell.classList.add("bottom-line");
        if ((col + 1) % 3 === 0) cell.classList.add("right-line");
        if (row === 0) cell.classList.add("top-line");
        if (col === 0) cell.classList.add("left-line");
        if (row % 3 === 0 && col % 3 === 0) cell.classList.add("bold-line");

        if (grid[row][col] !== 0) {
            cell.textContent = grid[row][col];
        } else {
            cell.classList.add("input-cell");
            cell.contentEditable = true;
            cell.addEventListener("input", function() {
                const value = parseInt(this.textContent.trim());
                if (!isNaN(value) && value >= 1 && value <= 9) {
                    // Check if the value is valid in Sudoku rules
                    if (isValidMove(grid, row, col, value)) {
                        grid[row][col] = value;
                    } else {
                        // Invalid move, clear cell and show error
                        this.textContent = "";
                        grid[row][col] = 0;
                        alert("Invalid move! Please enter a valid number.");
                    }
                } else {
                    // Invalid input, clear cell
                    this.textContent = "";
                    grid[row][col] = 0;
                    alert("Invalid input! Please enter a number between 1 and 9.");
                }
            });
        }

        sudokuGrid.appendChild(cell);
    }

    // Function to check if the move is valid in Sudoku rules
    function isValidMove(grid, row, col, num) {
        // Check row and column
        for (let i = 0; i < N; i++) {
            if (grid[row][i] === num || grid[i][col] === num) {
                return false;
            }
        }

        // Check 3x3 box
        const boxRowStart = Math.floor(row / 3) * 3;
        const boxColStart = Math.floor(col / 3) * 3;
        for (let i = boxRowStart; i < boxRowStart + 3; i++) {
            for (let j = boxColStart; j < boxColStart + 3; j++) {
                if (grid[i][j] === num) {
                    return false;
                }
            }
        }

        return true;
    }
});
