import { test, expect, chromium } from "@playwright/test";

test("Scenario 2: Drag & Drop Slider to 95", async ({}) => {
   const browser = await chromium.launch({
      headless: false, // 👈 Add this
    });
  const page = await browser.newPage();
  // 1. Open page
  await page.goto("https://www.testmuai.com/selenium-playground/");

  // 2. Click Drag & Drop Sliders — locator 1: text
  await page.getByText("Drag & Drop Sliders").click();

  await page.waitForTimeout(2000);
  // 3. Select "Default value 15" slider — locator 2: XPath
  const slider = page.locator("//input[@value='15']");

  // Get slider bounding box to calculate drag distance
  const sliderBox = await slider.boundingBox();

  if (sliderBox) {
    // Drag slider from current position to reach value 95
    // Slider range typically 0-100, so 95% of width
    const startX = sliderBox.x + sliderBox.width * 0.15; // current at 15%
    const targetX = sliderBox.x + sliderBox.width * 0.93; // move to 95%
    const centerY = sliderBox.y + sliderBox.height / 2;

    await page.mouse.move(startX, centerY);
    await page.mouse.down();
    await page.mouse.move(targetX, centerY, { steps: 30 });
    await page.mouse.up();
  }

  // 4. Validate range shows 95 — locator 3: CSS
  const rangeValue = page.locator("#rangeSuccess");
  await expect(rangeValue).toHaveText("95");
});