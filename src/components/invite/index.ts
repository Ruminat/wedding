import { getUrlParameters } from "../../modules/URL/utils";

const $who = document.querySelector(".who");

if ($who) {
  const { who } = getUrlParameters();

  if (who) {
    $who.textContent = `${who}!`;
    $who.classList.remove("hidden");
  }
}
