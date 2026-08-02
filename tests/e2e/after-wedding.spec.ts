import { expect, test, type Page } from "@playwright/test";

const frozenUrl = "/?afterWedding&now=2026-10-14T08%3A52%3A03%2B03%3A00";
const sections = [
  ["hero", ".after-hero"],
  ["timer", ".after-timer"],
  ["story", ".after-story"],
  ["day", ".after-day"],
  ["gallery", ".after-gallery"],
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

test("invitation remains the default experience", async ({ page }) => {
  await page.goto("/");

  await expect(page.locator(".invitation-page")).toBeVisible();
  await expect(page.locator(".after-wedding-page")).toBeHidden();
  await expect(page).toHaveTitle("Приглашение на свадьбу");
});
