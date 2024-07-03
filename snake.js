/*
    snakeArr[0] is head of snake 
    grid size is from 0 to 18
    snake is from 2 to 16
*/

//Constants and Variables of Game

let inputDir = {
    x : 0,
    y : 0,
}
const foodSound = new Audio('Eating sound effect LUCAS ARPON TV (mp3cut.net).mp3');
const gameOverSound = new Audio('Game Over sound effect (mp3cut.net).mp3');
let speed = 9;
let lastPaintTime = 0;
let snakeArr = [
    {x:13, y:15}
];
let score = 0;
let food = {x:7 , y:10};


//Game Functions

function main(ctime){
    window.requestAnimationFrame(main);
    if((ctime - lastPaintTime)/1000 < 1/speed){
        return;
    }
    lastPaintTime = ctime;
    gameEngine();
}

function isCollide(snake){
    //If you collide into yourself
    for (let i = 1; i < snakeArr.length; i++) {
        if (snake[i].x === snake[0].x && snake[i].y === snake[0].y) {
            gameOverSound.play();
            return true;
        }
    }

    //If you collide into the wall
    if (snake[0].x >=18 || snake[0].x <=0 || snake[0].y >=18 || snake[0].y <=0 ) {
        gameOverSound.play();
        return true;
    }
}

function gameEngine(){
    //Updating snake array and food
    if(isCollide(snakeArr)){
        inputDir = {x : 0,y : 0,};
        alert("Game Over, Press enter/ok to restart");
        score = 0;
        snakeArr = [
            {x:13, y:15}
        ];
    }

    //If you have eaten the food, increment the score and regenerate the food
    if(snakeArr[0].y === food.y && snakeArr[0].x === food.x){
        foodSound.play();
        score+=1;
        if(score>hiscoreval){
            hiscoreval = score;
            localStorage.setItem("highscore", JSON.stringify(hiscoreval));
            highScoreBox.innerHTML = "HighScore : " + hiscoreval;
        }
        scoreBox.innerHTML = "Score : " + score;
        snakeArr.unshift({x: snakeArr[0].x + inputDir.x , y: snakeArr[0].y + inputDir.y});
        let a = 2;
        let b = 16;
        food = {x:Math.round(a + (b-a)*Math.random()) , y:Math.round(a + (b-a)*Math.random())}
    }

    //Moving the snake
    for(let i = snakeArr.length -2 ; i>=0 ; i--){
        snakeArr[i+1] = {...snakeArr[i]};
    }

    snakeArr[0].x += inputDir.x;
    snakeArr[0].y += inputDir.y;

    //Display the snake and food
    document.querySelector(`#board`).innerHTML = "";
    snakeArr.forEach((e, index)=>{
        snakeElement = document.createElement('div');
        snakeElement.style.gridRowStart = e.y;
        snakeElement.style.gridColumnStart = e.x;
        if(index===0){
            snakeElement.classList.add('head');
        }
        else{
            snakeElement.classList.add('snake');  
        }
        board.appendChild(snakeElement);
    })

    //Display the snake and food
    foodElement = document.createElement('div');
    foodElement.style.gridRowStart = food.y;
    foodElement.style.gridColumnStart = food.x;
    foodElement.classList.add('food');
    board.appendChild(foodElement);
}


//Main Game Logic
let hiScore = localStorage.getItem("highscore");
if (hiScore === null) {
    hiscoreval = 0;
    localStorage.setItem("highscore", JSON.stringify(hiscoreval));
}
else{
    hiscoreval = JSON.parse(hiScore);
    highScoreBox.innerHTML = "HighScore : " + hiscoreval;
}

window.requestAnimationFrame(main);
window.addEventListener('keydown' , e =>{
    //start the game
    inputDir = {x:0 , y:1};
    switch (e.key) {
        case "ArrowUp":
            inputDir.x = 0;
            inputDir.y = -1;
            break;

        case "ArrowDown":
            inputDir.x = 0;
            inputDir.y = 1;
            break;

        case "ArrowLeft":
            inputDir.x = -1;
            inputDir.y = 0;
            break;

        case "ArrowRight":
            inputDir.x = 1;
            inputDir.y = 0;
            break;
    
        default:
            break;
    }
});