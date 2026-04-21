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

// Food position
let food = placeFood();

// Game state
let gameOver = false;
let intervalId = null;

function placeFood(){
    let position;
    do{
        position = {
            x: Math.floor(Math.random() * GRID_SIZE),
            y: Math.floor(Math.random() * GRID_SIZE),
        };
    } while (snake.some((seg) => seg.x === position.x && seg.y === position.y));
    return position;
}

function checkCollision(position){
    // Wall collision
    if (
        position.x < 0 ||
        position.x >= GRID_SIZE ||
        position.y < 0 ||
        position.y >= GRID_SIZE
    ) {
        return true;
    }

    // Self collision (check against all segments except the tail,
    // which will be removed this tick)
    for (let i = 0; i < snake.length - 1; i++){
        if(snake[i].x === position.x && snake[i].y === position.y){
            return true;
        }
    }

    return false;
}

function update(){
    // Calcualte the new head position
    const head = snake[0];
    const newHead = {
        x: head.x + direction.x,
        y: head.y + direction.y,
    };
    
    // Check for collisions
    if(checkCollision(newHead)){
        gameOver = true;
        clearInterval(intervalId);
        return;
    }

    // Add new head to the front
    snake.unshift(newHead);

    // CHeck if snake ate food
    if(newHead.x === food.x && newHead.y === food.y){
        // Don't remove the tail - the snake grows
        food = placeFood();
    } else{
        // Remove the tail
        snake.pop();
    }
}

function draw(){
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

    // Show game over overlay
    if(gameOver){
        board.classList.add("game-over");
    }
}

document.addEventListener("keydown", (e) => {
    switch(e.key){
        case "ArrowUp":
            if(direction.y === 0) direction = {x: 0, y: -1};
            break;
        case "ArrowDown":
            if (direction.y === 0) direction = { x: 0, y: 1 };
            break;
        case "ArrowLeft":
            if (direction.x === 0) direction = { x: -1, y: 0 };
            break;
        case "ArrowRight":
            if (direction.x === 0) direction = { x: 1, y: 0 };
            break;
    }
});

function gameLoop(){
    update();
    draw();
}

draw();
intervalId = setInterval(gameLoop, TICK_RATE);