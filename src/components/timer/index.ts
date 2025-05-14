const weddingDate = new Date("2026-08-25T12:00:00");

document.addEventListener("DOMContentLoaded", () => {
  updateCountdown();
  setInterval(updateCountdown, 100);
});

function updateCountdown() {
  const countdown = document.querySelector(".timer__countdown");
  const title = document.querySelector(".timer__title");

  if (!countdown) return;

  const daysEl = countdown.querySelector(".timer__days");
  const hoursEl = countdown.querySelector(".timer__hours");
  const minutesEl = countdown.querySelector(".timer__minutes");
  const secondsEl = countdown.querySelector(".timer__seconds");

  if (!daysEl || !hoursEl || !minutesEl || !secondsEl) {
    return;
  }

  const now = new Date();
  const timeDiff = Number(weddingDate) - Number(now);

  const positiveDiff = Math.abs(timeDiff);
  const totalSeconds = Math.floor(positiveDiff / 1000);
  const daysLeft = Math.floor(totalSeconds / (3600 * 24));
  const hoursLeft = Math.floor((totalSeconds % (3600 * 24)) / 3600);
  const minutesLeft = Math.floor((totalSeconds % 3600) / 60);
  const secondsLeft = totalSeconds % 60;

  if (title) {
    title.textContent = timeDiff <= 0 ? "Женаты уже" : "Начало через";
  }

  const daysNumber = daysEl.querySelector(".timer__number");
  const hoursNumber = hoursEl.querySelector(".timer__number");
  const minutesNumber = minutesEl.querySelector(".timer__number");
  const secondsNumber = secondsEl.querySelector(".timer__number");

  const daysText = daysEl.querySelector(".timer__text");
  const hoursText = hoursEl.querySelector(".timer__text");
  const minutesText = minutesEl.querySelector(".timer__text");
  const secondsText = secondsEl.querySelector(".timer__text");

  if (daysNumber && daysText) {
    daysNumber.textContent = daysLeft.toString();
    daysText.textContent = getPluralForm(daysLeft, ["день", "дня", "дней"]);
  }

  if (hoursNumber && hoursText) {
    hoursNumber.textContent = padZero(hoursLeft);
    hoursText.textContent = getPluralForm(hoursLeft, ["час", "часа", "часов"]);
  }

  if (minutesNumber && minutesText) {
    minutesNumber.textContent = padZero(minutesLeft);
    minutesText.textContent = getPluralForm(minutesLeft, ["минуту", "минуты", "минут"]);
  }

  if (secondsNumber && secondsText) {
    secondsNumber.textContent = padZero(secondsLeft);
    secondsText.textContent = getPluralForm(secondsLeft, ["секунду", "секунды", "секунд"]);
  }
}

function getPluralForm(number: number, forms: [string, string, string]): string {
  const cases = [2, 0, 1, 1, 1, 2];
  const index = number % 100 > 4 && number % 100 < 20 ? 2 : cases[Math.min(number % 10, 5)];
  return forms[index];
}

function padZero(num: number): string {
  return num.toString().padStart(2, "0");
}
