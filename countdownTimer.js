const startButton = document.getElementById("start-button");
const pauseButton = document.getElementById("pause-button");
const resetButton = document.getElementById("reset-button");
const inputBar = document.getElementById("input-bar");
const timerDisplay = document.getElementById("timer-display");
const alarmSound = new Audio("oggyRingtoneAlarm.mp3");

let totalSeconds = 0;
let interval = null;

function formatTime(seconds) {
  const m = Math.floor(seconds / 60).toString().padStart(2, "0");
  const s = (seconds % 60).toString().padStart(2, "0");
  return `${m} : ${s}`;
}

function updateDisplay() {
  timerDisplay.textContent = formatTime(totalSeconds);
  if (totalSeconds <= 10) {
    timerDisplay.classList.add("urgent");
  } else {
    timerDisplay.classList.remove("urgent");
  }
}

function startTimer() {
  if (interval) return;

  if (totalSeconds === 0) {
    totalSeconds = Number(inputBar.value) * 60 || 0;
    if (totalSeconds === 0) return;
    updateDisplay();
  }

  interval = setInterval(() => {
    if (totalSeconds > 0) {
      totalSeconds--;
      updateDisplay();
    } else {
      clearInterval(interval);
      interval = null;
      alarmSound.play();
    }
  }, 1000);
}

function pauseTimer() {
  clearInterval(interval);
  interval = null;
  alarmSound.pause();
  alarmSound.currentTime = 0;
}

function resetTimer() {
  clearInterval(interval);
  interval = null;
  alarmSound.pause();
  alarmSound.currentTime = 0;
  totalSeconds = Number(inputBar.value) * 60 || 0;
  updateDisplay();
}

startButton.addEventListener('click', startTimer);
pauseButton.addEventListener('click', pauseTimer);
resetButton.addEventListener('click', resetTimer);

updateDisplay();