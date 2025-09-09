import { q } from "../../modules/DOM/utils";
import { getUrlParameters } from "../../modules/URL/utils";

const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

const $buttons = q("div.form-buttons") as HTMLDivElement;
const $good = q("button.form-button.good") as HTMLButtonElement;
const $meh = q("button.form-button.meh") as HTMLButtonElement;
const $bad = q("button.form-button.bad") as HTMLButtonElement;

const $loading = q("div.form-loading") as HTMLDivElement;

const $success = q("div.form-success") as HTMLDivElement;
const $successMessage = q("div.form-success-message") as HTMLDivElement;
const $successImage = q("div.form-success .form-image") as HTMLDivElement;

const $error = q("div.form-error") as HTMLDivElement;
const $errorMessage = q("div.form-error-message") as HTMLDivElement;

modifyTitles();
addListeners();

function modifyTitles() {
  const { plural, fool } = getUrlParameters();

  $good!.textContent = `Конечно ${plural ? "приедем" : "приеду"}${fool ? " 😎" : "!"}`;
  $meh!.textContent = `Пока не ${plural ? "знаем" : "знаю"}${fool ? " 🤔" : "..."}`;
  $bad!.textContent = `У ${plural ? "нас" : "меня"} не получится ${fool ? "🤡" : ":("}`;
}

function addListeners() {
  $good.addEventListener("click", () => sendHandler("😎"));
  $meh.addEventListener("click", () => sendHandler("🤔"));
  $bad.addEventListener("click", () => sendHandler("🤡"));
}

async function sendHandler(answer: string) {
  const { who, plural, scriptURL } = getUrlParameters();

  hideButtons();

  if (!scriptURL) {
    return showError("Неправильная ссылка — обратитесь к организаторам");
  }

  show($loading);

  try {
    if (scriptURL === "fake") {
      await delay(3000);
    } else {
      await fetch(scriptURL, {
        method: "POST",
        body: JSON.stringify({ name: who ?? "Тайный незнакомец", answer }),
        headers: { "Content-Type": "application/json" },
      });
    }

    $successMessage.textContent = getReaction();
    $successImage.classList.add(getImageClassName());

    show($success);
  } catch (error) {
    showError(`Ошибка при отправке — ${plural ? "попробуйте" : "попробуй"} связаться с нами напрямую`);
  } finally {
    hide($loading);
  }

  function getReaction() {
    if (answer === "😎") return "Будем ждать!";
    if (answer === "🤔") return "Надеемся, что получится приехать!";
    return "Жаль, что не получится...";
  }

  function getImageClassName() {
    if (answer === "😎") return "sad";
    if (answer === "🤔") return "sad";
    return "sad";
  }
}

function hideButtons() {
  $good.setAttribute("disabled", "true");
  $meh.setAttribute("disabled", "true");
  $bad.setAttribute("disabled", "true");

  hide($buttons);
}

async function show(element: HTMLElement) {
  element.classList.remove("missing");

  await delay(10);

  element.classList.remove("hidden");
}
async function hide(element: HTMLElement) {
  element.classList.add("hidden");

  await delay(1000);

  element.classList.add("missing");
}

function showError(message: string) {
  $errorMessage.textContent = message;

  show($error);
}
