/* DOM references */
const droplet          = document.getElementById("droplet");
const village          = document.getElementById("village");
const cloud            = document.getElementById("cloud");
const dropButton       = document.getElementById("dropButton");
const scoreDisplay     = document.getElementById("score");
const livesDisplay     = document.getElementById("lives");
const gameOverDisplay  = document.getElementById("gameOver");
const finalScoreDisplay = document.getElementById("finalScore");

/* Educational water facts */
const facts = [
  "1 in 10 people lack access to clean water.",
  "Every $40 brings clean water to one person.",
  "Access to clean water improves education and health.",
  "Clean water saves lives. Join the cause at charitywater.org"
];

/* Game state */
let score = 0;
let lives = 3;
let speed = 2;
let direction = 1;
let villageX = 0;
let cloudX   = 200;

/* Move village and cloud */
function updateVillage() {
  villageX += direction * speed;
  if (villageX > window.innerWidth - 60 || villageX < 0) direction *= -1;
  village.style.left = villageX + "px";

  cloudX += direction * (speed - 1);
  if (cloudX > window.innerWidth - 60 || cloudX < 0) direction *= -1;
  cloud.style.left = cloudX + "px";
}

/* Main drop action */
function dropWater() {
  if (droplet.style.display === "block") return; // already dropping

  droplet.style.left = "50%";
  droplet.style.top  = "20px";
  droplet.style.display = "block";

  const dropInterval = setInterval(() => {
    const currentTop = parseInt(droplet.style.top, 10);

    if (currentTop >= window.innerHeight - 190) {
      clearInterval(dropInterval);
      droplet.style.display = "none";

      const dropX      = droplet.getBoundingClientRect().left;
      const villageRect = village.getBoundingClientRect();
      const cloudRect   = cloud.getBoundingClientRect();

      const hitCloud = dropX >= cloudRect.left && dropX <= cloudRect.right &&
                       currentTop >= cloudRect.top && currentTop <= cloudRect.bottom;

      const hitVillage = dropX >= villageRect.left && dropX <= villageRect.right;

      if (hitCloud) {
        handleMiss(); // obstacle penalty
      } else if (hitVillage) {
        score += 10;
        speed += 0.5;                   // increase difficulty
        scoreDisplay.textContent = score;
        alert(facts[Math.floor(Math.random() * facts.length)]);
      } else {
        handleMiss();
      }
    } else {
      droplet.style.top = currentTop + 10 + "px";
    }
  }, 30);
}

/* Miss logic */
function handleMiss() {
  lives -= 1;
  livesDisplay.textContent = lives;
  if (lives === 0) endGame();
}

/* End the game */
function endGame() {
  gameOverDisplay.style.display = "block";
  finalScoreDisplay.textContent = score;
  dropButton.disabled = true;
  clearInterval(villageInterval);
}

/* Event listeners */
dropButton.addEventListener("click", dropWater);
document.addEventListener("keydown", (e) => {
  if (e.code === "Space") dropWater();
});

/* Start moving village and cloud */
const villageInterval = setInterval(updateVillage, 20);
