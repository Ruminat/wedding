import { expect, test, type Page } from "@playwright/test";

const frozenUrl = "/?now=2026-10-14T08%3A52%3A03%2B03%3A00";
const sections = [
  ["hero", ".after-hero"],
  ["timer", ".after-timer"],
  ["story", ".after-story"],
  ["day", ".after-day"],
  ["gallery", ".after-gallery"],
  ["honeymoon", ".after-honeymoon"],
  ["thanks", ".after-thanks"],
] as const;

async function waitForPageAssets(page: Page) {
  await page.evaluate(() => {
    document.querySelectorAll("img").forEach((image) => {
      image.loading = "eager";
    });
  });
  await page.waitForFunction(() => Array.from(document.images).every((image) => image.complete));
  await page.evaluate(() => document.fonts.ready);
}

async function captureSectionSnapshots(page: Page, viewport: "desktop" | "mobile") {
  for (const [name, selector] of sections) {
    await expect(page.locator(selector)).toHaveScreenshot(`after-wedding-${viewport}-${name}.png`, {
      animations: "disabled",
      maxDiffPixelRatio: 0.01,
    });
  }
}

test("post-wedding page desktop", async ({ page }) => {
  await page.setViewportSize({ width: 1440, height: 1800 });
  await page.goto(frozenUrl);
  await waitForPageAssets(page);

  await expect(page.locator(".after-wedding-page")).toBeVisible();
  await expect(page.locator("[data-after-timer='days']")).toHaveText("49");
  await captureSectionSnapshots(page, "desktop");
});

test("post-wedding page mobile", async ({ page }) => {
  await page.setViewportSize({ width: 390, height: 1200 });
  await page.goto(frozenUrl);
  await waitForPageAssets(page);

  await expect(page.locator(".after-wedding-page")).toBeVisible();
  await captureSectionSnapshots(page, "mobile");
});

for (const url of [
  "/",
  "/?who=Guest&plural",
  "/?afterWedding",
  "/?afterWedding=true",
  "/?afterWedding=1",
  "/?afterWedding=false",
  "/?invitation&afterWedding",
]) {
  test(`post-wedding page is active at ${url}`, async ({ page }) => {
    await page.goto(url);

    await expect(page.locator(".after-wedding-page")).toBeVisible();
    await expect(page.locator(".invitation-page")).toBeHidden();
    await expect(page).toHaveTitle("Мы поженились!");
  });
}

test("invitation remains available explicitly", async ({ page }) => {
  await page.goto("/?invitation&who=Guest&plural");

  await expect(page.locator(".invitation-page")).toBeVisible();
  await expect(page.locator(".after-wedding-page")).toBeHidden();
  await expect(page).toHaveTitle("Приглашение на свадьбу");
  await expect(page.locator(".who")).toHaveText("Guest!");
  await expect(page.locator(".form-button.good")).toHaveText("Конечно приедем!");
});

for (const [url, visible, hidden, title] of [
  ["/", ".after-wedding-page", ".invitation-page", "Мы поженились!"],
  ["/?invitation", ".invitation-page", ".after-wedding-page", "Приглашение на свадьбу"],
]) {
  test(`mode is selected before application scripts load at ${url}`, async ({ page }) => {
    await page.route("**/src/index.ts", (route) => route.abort());
    await page.goto(url);

    await expect(page.locator(visible)).toBeVisible();
    await expect(page.locator(hidden)).toBeHidden();
    await expect(page).toHaveTitle(title);
  });
}
