import { getUrlParameters } from "../../modules/URL/utils";

const $who = document.querySelector(".who");
const $dynamicContent = document.querySelector(".invite .dynamic-content");

if ($who) {
  const { who, sleepons } = getUrlParameters();

  if (who) {
    $who.textContent = `${who}!`;
    $who.classList.remove("hidden");
  }

  if (sleepons && $dynamicContent) {
    $dynamicContent.innerHTML = `
      <div class="flex__full-center">
        <div class="sleepons"></div>
      </div>
    `;
  }
}
