let elements = document.querySelectorAll(".element");
let resetBtn = document.querySelector(".reset-btn")
let newGameBtn = document.querySelector(".new")
let msg = document.querySelector(".msg")
let Winner = document.querySelector(".Winner")
let winnerSound = new Audio('Yayyy! Sound Effect (mp3cut.net).mp3');
let buttonPress = new Audio('Button Press   Sound Effect [Free No Copyright] (mp3cut.net).mp3');

let turn = true;

const winPatterns = [
    [0,1,2],
    [0,3,6],
    [0,4,8],
    [1,4,7],
    [2,5,8],
    [2,4,6],
    [3,4,5],
    [6,7,8]
];

elements.forEach((element) =>{
    element.addEventListener("click", ()=>{
        buttonPress.play();
        if (turn){
            element.innerText="0";
            turn=false;
        }
        else{
            element.innerText="X";
            turn=true;
        }
        element.disabled = true;

        checkWinner();
    })
});

const disableBtn = () =>{
    for(let element of elements){
        element.disabled = true;
    }
}

const enableBtn = () =>{
    for(let element of elements){
        element.disabled = false;
        element.innerText = "";
    }
}


const checkWinner = () =>{
    for (let pattern of winPatterns){
        let pos1Val = elements[pattern[0]].innerText;
        let pos2Val = elements[pattern[1]].innerText;
        let pos3Val = elements[pattern[2]].innerText;

        if(pos1Val != "" && pos2Val != "" && pos3Val != ""){
            if(pos1Val === pos2Val && pos2Val === pos3Val){
                showWinner(pos1Val);
            }
        }
    }
};

const resetGame = () =>{
    turn = true;
    enableBtn();
    msg.classList.add("hide");
};
const showWinner = (Winner) =>{
    winnerSound.play();
    Winner.innerHTML = "Winner";
    msg.classList.remove("hide");
    disableBtn();
};

newGameBtn.addEventListener("click", resetGame);
resetBtn.addEventListener("click", resetGame);
