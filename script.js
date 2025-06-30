let score = 0;
let dropInterval;
let difficultySettings = {
  easy: 1500,
  normal: 1000,
  hard: 600
};

function startGame() {
  clearInterval(dropInterval);
  score = 0;
  document.getElementById('milestone').innerText = '';
  document.getElementById('gameArea').innerHTML = '';
  
  const difficulty = document.getElementById('difficulty').value;
  const interval = difficultySettings[difficulty];

  dropInterval = setInterval(() => {
    createDrop();
  }, interval);
}

function createDrop() {
  const gameArea = document.getElementById('gameArea');
  const drop = document.createElement('div');
  drop.className = 'water-drop';
  drop.style.top = Math.random() * (gameArea.clientHeight - 30) + 'px';
  drop.style.left = Math.random() * (gameArea.clientWidth - 30) + 'px';
  
  drop.onclick = () => {
    gameArea.removeChild(drop);
    score++;
    playSound();
    checkMilestone();
  };

  gameArea.appendChild(drop);

  // Remove drop after a while if not clicked
  setTimeout(() => {
    if (gameArea.contains(drop)) {
      gameArea.removeChild(drop);
    }
  }, 3000);
}

function playSound() {
  const audio = new Audio('https://freesound.org/data/previews/66/66717_931655-lq.mp3'); // Example sound
  audio.play();
}

function checkMilestone() {
  const milestoneBox = document.getElementById('milestone');
  if (score === 5) {
    milestoneBox.innerText = "Great start! 5 drops collected!";
  } else if (score === 10) {
    milestoneBox.innerText = "Halfway there!";
  } else if (score === 20) {
    milestoneBox.innerText = "Awesome! 20 drops collected!";
  }
}
