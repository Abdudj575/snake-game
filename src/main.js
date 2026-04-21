import "./style.css";

const GRID_SIZE = 20;

const board = document.getElementById("board");

for(let i =0; i < GRID_SIZE * GRID_SIZE; i++){
    const cell = document.createElement("div");
    cell.classList.add("cell");
    board.appendChild(cell);
}