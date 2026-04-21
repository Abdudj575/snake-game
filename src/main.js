import "./style.css";
import {startBtn} from "./ui.js";
import {start, setDirection, togglePause, isRunning} from "./engine.js";

startBtn.addEventListener("click", () =>{
    start();
});

document.addEventListener("keydown", (e) => {
    if(e.key === " " && isRunning()){
        e.preventDefault();
        if (e.repeat) return;
        togglePause();
        return;
    }

    const directions = {
        ArrowUp: { x: 0, y: -1 },
        ArrowDown: { x: 0, y: 1 },
        ArrowLeft: { x: -1, y: 0 },
        ArrowRight: { x: 1, y: 0 },
    };

    if(directions[e.key]){
        setDirection(directions[e.key]);
    }
});
