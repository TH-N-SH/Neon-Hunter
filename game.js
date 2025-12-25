const orb = document.getElementById("orb");
const overlay = document.getElementById("overlay");
const scoreEl = document.getElementById("score");
const bestEl = document.getElementById("best");
const volumeControl = document.getElementById("volume");

let score = 0;
let speed = 1;
let pos = { x: 200, y: 200 };

const sounds = {
  hit: new Audio("assets/sounds/hit_zap.wav"),
  miss: new Audio("assets/sounds/miss.wav"),
  bg: new Audio("assets/sounds/bg.wav")
};

sounds.bg.loop = true;

function setVolume(v) {
  Object.values(sounds).forEach(s => s.volume = v);
}

bestEl.textContent = localStorage.getItem("bestScore") || 0;

function startGame() {
  overlay.style.display = "none";
  score = 0;
  speed = Number(document.getElementById("difficulty").value);
  scoreEl.textContent = score;
  intelligentMove();

 volumeControl.addEventListener("input", e => {
  setVolume(e.target.value);
});

  moveOrb();
}

let velocity = { x: 2, y: 2 };

function intelligentMove() {
  const avoidX = (Math.random() - 0.5) * 2 * speed;
  const avoidY = (Math.random() - 0.5) * 2 * speed;

  velocity.x += avoidX;
  velocity.y += avoidY;

  pos.x += velocity.x;
  pos.y += velocity.y;

  if (pos.x < 0 || pos.x > window.innerWidth - 72) velocity.x *= -1;
  if (pos.y < 0 || pos.y > window.innerHeight - 72) velocity.y *= -1;

  orb.style.left = pos.x + "px";
  orb.style.top = pos.y + "px";

  requestAnimationFrame(intelligentMove);
}

orb.onclick = () => {
  score++;
  scoreEl.textContent = score;
  sounds.hit.currentTime = 0;
  sounds.hit.play();
};

  if (score > bestEl.textContent) {
    localStorage.setItem("bestScore", score);
    bestEl.textContent = score;
  }

function shake() {
  document.body.style.transform = "translateX(2px)";
  setTimeout(() => document.body.style.transform = "", 50);
}
shake();
