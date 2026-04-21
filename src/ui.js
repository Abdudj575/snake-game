import {GRID_SIZE} from "./engine.js";

const board = document.getElementById("board");
const scoreDisplay = document.getElementById("score");
const startBtn = document.getElementById("start-btn");

// Create the grid cells
const cells = [];
for(let i =0; i < GRID_SIZE * GRID_SIZE; i++){
    const cell = document.createElement("div");
    cell.classList.add("cell");
    board.appendChild(cell);
    cells.push(cell);
}

function render(snake, food){
    // Clear all cells
    cells.forEach((cell) => cell.classList.remove("snake", "snake-head", "food"));

    // Draw the food
    const foodIndex = food.y * GRID_SIZE + food.x;
    cells[foodIndex].classList.add("food");

    // Draw the snake
    snake.forEach((segment, index) => {
        const cellIndex = segment.y * GRID_SIZE + segment.x;
        if(cellIndex >= 0 && cellIndex < cells.length){
            cells[cellIndex].classList.add("snake");
            if(index === 0){
                cells[cellIndex].classList.add("snake-head");
            }
        }
    });
}

// --- Event Listeners

document.addEventListener("snake:tick", (e) =>{
    const { snake, food } = e.detail;
    render(snake, food);
});

document.addEventListener("snake:eat", (e) =>{
    scoreDisplay.textContent = `Score: ${e.detail.score}`;
});

document.addEventListener("snake:die", (e) => {
  board.classList.add("game-over");
  startBtn.textContent = "Play Again";
});

document.addEventListener("snake:pause", () => {
  board.classList.add("paused");
});

document.addEventListener("snake:resume", () => {
  board.classList.remove("paused");
});

document.addEventListener("snake:start", () => {
  scoreDisplay.textContent = "Score: 0";
  board.classList.remove("game-over");
  startBtn.textContent = "Restart";
});

export { startBtn };
