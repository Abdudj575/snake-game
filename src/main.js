import "./style.css";

const GRID_SIZE = 20;

const board = document.getElementById("board");

const cells = [];
for(let i =0; i < GRID_SIZE * GRID_SIZE; i++){
    const cell = document.createElement("div");
    cell.classList.add("cell");
    board.appendChild(cell);
    cells.push(cell);
}

// Snake state: an array of {x, y} positions
// The first element is the head
const snake = [
    { x: 10, y: 10},
    {x: 9, y: 10},
    {x: 8, y: 10},
];  

function draw(){
    // Clear all cells
    cells.forEach((cell) => cell.classList.remove("snake", "snake-head"));

    // Draw the snake
    snake.forEach((segment, index) => {
        const cellIndex = segment.y * GRID_SIZE + segment.x;
        cells[cellIndex].classList.add("snake");
        if(index === 0){
            cells[cellIndex].classList.add("snake-head");
        }
    });
}

draw();