console.log("HOBA");

const weddingDate = new Date("2026-08-25T12:00:00");

function updateCountdown() {
  const countdown = document.querySelector(".timer__countdown");

  if (!countdown) return;

  const days = countdown.querySelector(".timer__days .timer__number");
  const hours = countdown.querySelector(".timer__hours .timer__number");
  const minutes = countdown.querySelector(".timer__minutes .timer__number");
  const seconds = countdown.querySelector(".timer__seconds .timer__number");

  if (!days || !hours || !minutes || !seconds) {
    return;
  }

  const now = new Date();
  const timeDiff = Number(weddingDate) - Number(now);

  if (timeDiff <= 0) {
    countdown.innerHTML = "Свадьба уже началась!";
    return;
  }

  const totalSeconds = Math.floor(timeDiff / 1000);
  const daysLeft = Math.floor(totalSeconds / (3600 * 24));
  const hoursLeft = Math.floor((totalSeconds % (3600 * 24)) / 3600);
  const minutesLeft = Math.floor((totalSeconds % 3600) / 60);
  const secondsLeft = totalSeconds % 60;

  days.textContent = daysLeft.toString();
  hours.textContent = hoursLeft.toString();
  minutes.textContent = minutesLeft.toString();
  seconds.textContent = secondsLeft.toString();
}

document.addEventListener("DOMContentLoaded", () => {
  updateCountdown();

  setInterval(updateCountdown, 100);
});
