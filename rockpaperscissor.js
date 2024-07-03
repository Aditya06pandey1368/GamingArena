//All sound effects

const winnerSound = new Audio('Yayyy! Sound Effect (mp3cut.net).mp3');
const loserSound = new Audio('Roblox Death Sound - OOF  Sound Effect HD - HomeMadeSoundEffects (mp3cut.net).mp3');
function playGame(playerChoice) {
    const choices = ['rock', 'paper', 'scissors'];
    const computerChoice = choices[Math.floor(Math.random() * choices.length)];
  
    let outcome;
  
    if (playerChoice === computerChoice) {
        outcome = "It's a tie!";
        loserSound.play();
    } else if (
        (playerChoice === 'rock' && computerChoice === 'scissors') ||
        (playerChoice === 'paper' && computerChoice === 'rock') ||
        (playerChoice === 'scissors' && computerChoice === 'paper')
    ) {
        outcome = "You win!";
        winnerSound.play();
    } else {
        outcome = "Computer wins!";
        loserSound.play();
    }
  
    document.getElementById('outcome').innerHTML = `
        <p>You chose: ${playerChoice}</p>
        <p>Computer chose: ${computerChoice}</p>
        <h2>${outcome}</h2>
        <button id="btn-colour" onclick="resetGame()">Play Again</button>
    `;
  }
  
  function resetGame() {
    document.getElementById('outcome').innerHTML = '';
  }
  