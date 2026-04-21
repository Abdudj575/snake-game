import "./style.css";

const GRID_SIZE = 20;
const TICK_RATE = 150;

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
let direction = {x: 1, y: 0};

function update(){
    // Calcualte the new head position
    const head = snake[0];
    const newHead = {
        x: head.x + direction.x,
        y: head.y + direction.y,
    };
    
    // Add new head to the front
    snake.unshift(newHead);

    // Remove the tail
    snake.pop();
}

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

function gameLoop(){
    update();
    draw();
}

draw();
setInterval(gameLoop, TICK_RATE);