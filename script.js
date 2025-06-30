let score = 0;
let dropInterval;
let gameTimer;
let timeLeft = 30; // 30 seconds for the game

function startGame() {
  clearInterval(dropInterval);
  clearInterval(gameTimer);
  score = 0;
  timeLeft = 30;
  document.getElementById('milestone').innerText = '';
  document.getElementById('gameArea').innerHTML = '';

  const difficulty = document.getElementById('difficulty').value;
  const interval = difficultySettings[difficulty];

  dropInterval = setInterval(() => {
    createElement(); // Could create a drop or bomb
  }, interval);

  gameTimer = setInterval(() => {
    timeLeft--;
    if (timeLeft <= 0) {
      endGame(`Time's up! Your score: ${score}`);
    }
  }, 1000);
}

function createElement() {
  const gameArea = document.getElementById('gameArea');
  const isBomb = Math.random() < 0.2; // 20% chance it’s a bomb

  const el = document.createElement('div');
  el.className = isBomb ? 'bomb' : 'water-drop';
  el.style.top = Math.random() * (gameArea.clientHeight - 30) + 'px';
  el.style.left = Math.random() * (gameArea.clientWidth - 30) + 'px';

  el.onclick = () => {
    if (isBomb) {
      endGame("💥 You hit a bomb! Game over!");
    } else {
      gameArea.removeChild(el);
      score++;
      playSound();
      checkMilestone();
    }
  };

  gameArea.appendChild(el);

  // Remove element after a while if not clicked
  setTimeout(() => {
    if (gameArea.contains(el)) {
      gameArea.removeChild(el);
    }
  }, 3000);
}

function endGame(message) {
  clearInterval(dropInterval);
  clearInterval(gameTimer);
  document.getElementById('milestone').innerText = message;
  document.getElementById('gameArea').innerHTML = '';
}

function playSound() {
  const audio = new Audio('https://freesound.org/data/previews/66/66717_931655-lq.mp3'); // Replace with your own sound
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
