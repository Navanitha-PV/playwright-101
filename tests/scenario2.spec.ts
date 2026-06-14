import { test, expect, chromium } from "@playwright/test";

test("scenario 2: Drag & Drop Slider to 95", async ({page}) => {

  await page.goto("https://www.testmuai.com/selenium-playground/");

  await page.getByText("Drag & Drop Sliders").click();
  await page.waitForTimeout(2000);
  
  // Drag slider to set value to 95 — locator 1: XPath
  const slider = page.locator("//input[@value='15']");

  // Get slider bounding box to calculate drag distance
  const sliderBox = await slider.boundingBox();

  if (sliderBox) {
    // Drag slider from current position to reach value 95
    const startX = sliderBox.x + sliderBox.width * 0.15; 
    const targetX = sliderBox.x + sliderBox.width * 0.93; 
    const centerY = sliderBox.y + sliderBox.height / 2;

    await page.mouse.move(startX, centerY);
    await page.mouse.down();
    await page.mouse.move(targetX, centerY, { steps: 30 });
    await page.mouse.up();
  }

  //  Validate range shows 95 — locator 3: CSS
  const rangeValue = page.locator("#rangeSuccess");
  await expect(rangeValue).toHaveText("95");

  await page.close();
});