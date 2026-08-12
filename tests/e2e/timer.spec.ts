import { expect, test, type Page } from "@playwright/test";

// 5 days, 2 hours, 4 minutes and 30 seconds before 2026-08-25T12:20:00+03:00.
const beforeWedding = new Date("2026-08-20T10:15:30+03:00");

async function freezeClock(page: Page, time: Date) {
  await page.clock.install({ time });
  await page.clock.pauseAt(time);
}

test("invitation countdown runs after the dynamic import", async ({ page }) => {
  await freezeClock(page, beforeWedding);
  await page.goto("/");

  await expect(page.locator(".timer__title")).toHaveText("Начало через");
  await expect(page.locator(".timer__days .timer__number")).toHaveText("5");
  await expect(page.locator(".timer__hours .timer__number")).toHaveText("02");
  await expect(page.locator(".timer__minutes .timer__number")).toHaveText("04");
  await expect(page.locator(".timer__seconds .timer__number")).toHaveText("30");

  await page.clock.fastForward(65_000);

  await expect(page.locator(".timer__minutes .timer__number")).toHaveText("03");
  await expect(page.locator(".timer__seconds .timer__number")).toHaveText("25");
});

test("post-wedding timer counts from the visit while the wedding is ahead", async ({ page }) => {
  await freezeClock(page, beforeWedding);
  await page.goto("/?afterWedding");

  await expect(page.locator("[data-after-timer='days']")).toHaveText("0");
  await expect(page.locator("[data-after-timer='hours']")).toHaveText("00");
  await expect(page.locator("[data-after-timer='minutes']")).toHaveText("00");
  await expect(page.locator("[data-after-timer='seconds']")).toHaveText("00");

  await page.clock.fastForward(65_000);

  await expect(page.locator("[data-after-timer='minutes']")).toHaveText("01");
  await expect(page.locator("[data-after-timer='seconds']")).toHaveText("05");
});

test("post-wedding timer counts from the wedding once it has passed", async ({ page }) => {
  await freezeClock(page, new Date("2026-08-27T14:24:35+03:00"));
  await page.goto("/?afterWedding");

  await expect(page.locator("[data-after-timer='days']")).toHaveText("2");
  await expect(page.locator("[data-after-timer='hours']")).toHaveText("02");
  await expect(page.locator("[data-after-timer='minutes']")).toHaveText("04");
  await expect(page.locator("[data-after-timer='seconds']")).toHaveText("35");
});
