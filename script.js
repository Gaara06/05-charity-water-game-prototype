const droplet = document.getElementById('droplet');
const village = document.getElementById('village');
const dropButton = document.getElementById('dropButton');
const scoreDisplay = document.getElementById('score');
const livesDisplay = document.getElementById('lives');
const gameOverDisplay = document.getElementById('gameOver');
const finalScoreDisplay = document.getElementById('finalScore');

let score = 0;
let lives = 3;
let villageX = 0;
let speed = 2;
let direction = 1;

function updateVillage() {
  villageX += direction * speed;
  if (villageX > window.innerWidth - 60 || villageX < 0) {
    direction *= -1;
  }
  village.style.left = villageX + 'px';
}

function dropWater() {
  if (droplet.style.display === 'block') return;

  droplet.style.left = '50%';
  droplet.style.top = '20px';
  droplet.style.display = 'block';

  const dropInterval = setInterval(() => {
    const currentTop = parseInt(droplet.style.top);
    if (currentTop >= (window.innerHeight - 190)) {
      clearInterval(dropInterval);
      droplet.style.display = 'none';

      const dropX = droplet.getBoundingClientRect().left;
      const villageRect = village.getBoundingClientRect();

      if (dropX >= villageRect.left && dropX <= villageRect.right) {
        score += 10;
        speed += 0.5;
        scoreDisplay.textContent = score;
      } else {
        lives -= 1;
        livesDisplay.textContent = lives;
        if (lives === 0) endGame();
      }
    } else {
      droplet.style.top = (currentTop + 10) + 'px';
    }
  }, 30);
}

function endGame() {
  gameOverDisplay.style.display = 'block';
  finalScoreDisplay.textContent = score;
  dropButton.disabled = true;
  clearInterval(villageInterval);
}

dropButton.addEventListener('click', dropWater);
document.addEventListener('keydown', (e) => {
  if (e.code === 'Space') dropWater();
});

const villageInterval = setInterval(updateVillage, 20);
