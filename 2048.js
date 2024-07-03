const gameBoard = document.getElementById('game-board');
const scoreDisplay = document.getElementById('score');
const highScoreDisplay = document.getElementById('high-score');
const lostScreen = document.getElementById('lost-screen');
let score = 0;
let highScore = localStorage.getItem('highScore') ? parseInt(localStorage.getItem('highScore')) : 0;
let buttonPress = new Audio('Button Press   Sound Effect [Free No Copyright] (mp3cut.net).mp3');
let winnerSound = new Audio('Yayyy! Sound Effect (mp3cut.net).mp3'); 
let lostSound = new Audio('Roblox Death Sound - OOF  Sound Effect HD - HomeMadeSoundEffects (mp3cut.net).mp3');

const createCell = (value) => {
    const cell = document.createElement('div');
    cell.classList.add('cell');
    cell.textContent = value === 0 ? '' : value;
    cell.setAttribute('data-value', value);
    return cell;
};

const initializeGame = () => {
    gameBoard.innerHTML = '';
    let cells = Array(16).fill(0).map(() => createCell(0));
    gameBoard.append(...cells);
    addNewCell();
    addNewCell();
    updateScore(0);
    lostScreen.style.display = 'none';
    updateHighScoreDisplay();
};

const getEmptyCells = () => {
    return Array.from(gameBoard.children).filter(cell => cell.textContent === '');
};

const addNewCell = () => {
    const emptyCells = getEmptyCells();
    if (emptyCells.length === 0) return;
    const randomCell = emptyCells[Math.floor(Math.random() * emptyCells.length)];
    randomCell.textContent = Math.random() < 0.9 ? '2' : '4';
    randomCell.setAttribute('data-value', randomCell.textContent);
};

const updateScore = (newScore) => {
    score = newScore;
    scoreDisplay.textContent = `Score: ${score}`;
    if (score > highScore) {
        highScore = score;
        localStorage.setItem('highScore', highScore);
        updateHighScoreDisplay();
    }
};

const updateHighScoreDisplay = () => {
    highScoreDisplay.textContent = `High Score: ${highScore}`;
};

const moveCells = (direction) => {
    let moved = false;
    const cells = Array.from(gameBoard.children).map(cell => parseInt(cell.textContent) || 0);

    const merge = (arr) => {
        let merged = [];
        for (let i = 0; i < arr.length; i++) {
            if (arr[i] !== 0) {
                if (arr[i] === arr[i + 1]) {
                    merged.push(arr[i] * 2);
                    updateScore(score + arr[i] * 2);
                    i++;
                } else {
                    merged.push(arr[i]);
                }
            }
        }
        return [...merged, ...Array(4 - merged.length).fill(0)];
    };

    const rotate = (matrix) => {
        return matrix[0].map((val, index) => matrix.map(row => row[index]).reverse());
    };

    let newCells = [];
    if (direction === 'up' || direction === 'down') {
        let columns = [[], [], [], []];
        for (let i = 0; i < cells.length; i++) {
            columns[i % 4].push(cells[i]);
        }
        columns = direction === 'up' ? columns.map(merge) : columns.map(col => merge(col.reverse()).reverse());
        columns = rotate(columns);
        newCells = columns.flat();
    } else {
        let rows = [[], [], [], []];
        for (let i = 0; i < cells.length; i++) {
            rows[Math.floor(i / 4)].push(cells[i]);
        }
        rows = direction === 'left' ? rows.map(merge) : rows.map(row => merge(row.reverse()).reverse());
        newCells = rows.flat();
    }

    for (let i = 0; i < cells.length; i++) {
        if (cells[i] !== newCells[i]) moved = true;
        gameBoard.children[i].textContent = newCells[i] === 0 ? '' : newCells[i];
        gameBoard.children[i].setAttribute('data-value', newCells[i]);
    }

    if (moved) {
        addNewCell();
        if (getEmptyCells().length === 0 && !canMove()) {
            lostScreen.style.display = 'block';
            lostSound.play();
        }
    }
};

const canMove = () => {
    const cells = Array.from(gameBoard.children).map(cell => parseInt(cell.textContent) || 0);
    for (let i = 0; i < 16; i++) {
        if (i % 4 !== 3 && cells[i] === cells[i + 1]) return true;
        if (i < 12 && cells[i] === cells[i + 4]) return true;
    }
    return false;
};

const handleKeyPress = (e) => {
    buttonPress.play();
    switch (e.key) {
        case 'ArrowUp': moveCells('up'); break;
        case 'ArrowDown': moveCells('down'); break;
        case 'ArrowLeft': moveCells('left'); break;
        case 'ArrowRight': moveCells('right'); break;
    }
};

const restartGame = () => {
    initializeGame();
};

document.addEventListener('keydown', handleKeyPress);
initializeGame();