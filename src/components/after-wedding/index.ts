const WEDDING_DATE = new Date("2026-08-25T12:20:00+03:00").getTime();

export {};
const params = new URLSearchParams(window.location.search);
const fixedNow = params.get("now");
const fixedNowValue = fixedNow ? new Date(fixedNow).getTime() : undefined;

const timerElements = {
  days: document.querySelector<HTMLElement>("[data-after-timer='days']"),
  hours: document.querySelector<HTMLElement>("[data-after-timer='hours']"),
  minutes: document.querySelector<HTMLElement>("[data-after-timer='minutes']"),
  seconds: document.querySelector<HTMLElement>("[data-after-timer='seconds']"),
};

const labelElements = {
  days: document.querySelector<HTMLElement>("[data-after-label='days']"),
  hours: document.querySelector<HTMLElement>("[data-after-label='hours']"),
  minutes: document.querySelector<HTMLElement>("[data-after-label='minutes']"),
  seconds: document.querySelector<HTMLElement>("[data-after-label='seconds']"),
};

updateElapsedTime();

if (fixedNowValue === undefined || Number.isNaN(fixedNowValue)) {
  window.setInterval(updateElapsedTime, 1000);
}

function updateElapsedTime() {
  const now = fixedNowValue !== undefined && !Number.isNaN(fixedNowValue) ? fixedNowValue : Date.now();
  const totalSeconds = Math.floor(Math.max(0, now - WEDDING_DATE) / 1000);
  const days = Math.floor(totalSeconds / 86400);
  const hours = Math.floor((totalSeconds % 86400) / 3600);
  const minutes = Math.floor((totalSeconds % 3600) / 60);
  const seconds = totalSeconds % 60;

  setValue("days", days, ["день", "дня", "дней"], false);
  setValue("hours", hours, ["час", "часа", "часов"]);
  setValue("minutes", minutes, ["минута", "минуты", "минут"]);
  setValue("seconds", seconds, ["секунда", "секунды", "секунд"]);
}

function setValue(
  unit: keyof typeof timerElements,
  value: number,
  forms: [string, string, string],
  pad = true,
) {
  if (timerElements[unit]) {
    timerElements[unit].textContent = pad ? value.toString().padStart(2, "0") : value.toString();
  }

  if (labelElements[unit]) {
    labelElements[unit].textContent = getPluralForm(value, forms);
  }
}

function getPluralForm(value: number, forms: [string, string, string]) {
  const remainder100 = value % 100;
  const remainder10 = value % 10;

  if (remainder100 >= 11 && remainder100 <= 19) return forms[2];
  if (remainder10 === 1) return forms[0];
  if (remainder10 >= 2 && remainder10 <= 4) return forms[1];
  return forms[2];
}
