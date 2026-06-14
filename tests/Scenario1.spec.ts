import { test, expect, chromium } from '@playwright/test';

test("scenario 1: Simple Form Demo", async ({page}) => {
  await page.goto("https://www.testmuai.com/selenium-playground/");

  await page.getByText("Simple Form Demo").click();

  //  Validate URL contains 
  await expect(page).toHaveURL(/simple-form-demo/);
  await page.waitForTimeout(2000);
  const message = "Welcome to TestMu AI";

  // Enter message 
  await page.getByPlaceholder("Please enter your Message").fill(message);
  await page.keyboard.press("Enter"); 
  await page.locator("#showInput").click();

  // Validate displayed message  
  const displayedMessage = await page.locator('#message').innerText();
  console.log("Displayed Message:", displayedMessage); 
  await expect(displayedMessage).toBe(message);

  await page.close();

});
