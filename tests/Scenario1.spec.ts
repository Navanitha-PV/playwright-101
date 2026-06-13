import { test, expect, chromium } from '@playwright/test';

test("Scenario 1: Simple Form Demo", async ({ }) => {

   const browser = await chromium.launch({
    headless: false, // 👈 Add this
  });
  const page = await browser.newPage();
  // 1. Open Selenium Playground
  await page.goto("https://www.testmuai.com/selenium-playground/");

  // 2. Click Simple Form Demo — locator 1: text
  await page.getByText("Simple Form Demo").click();

  // 3. Validate URL contains "simple-form-demo"
  await expect(page).toHaveURL(/simple-form-demo/);
  await page.waitForTimeout(2000);
  // 4. Define message variable
  const message = "Welcome to TestMu AI";

  // 5. Enter message — locator 2: placeholder
  await page.getByPlaceholder("Please enter your Message").fill(message);
  await page.keyboard.press("Enter"); 
  
  // Press Enter to submit the form

  // 6. Click "Get Checked Value" — locator 3: CSS selector
  await page.locator("#showInput").click();

  // 7. Validate displayed message  
  //const displayedMessage = await page.locator("#message").textContent();
  //console.log("Displayed Message:", displayedMessage);
  const displayedMessage = await page.locator('#message').innerText();
  console.log("Displayed Message:", displayedMessage); 
  // Output: Playwright Test
  await expect(displayedMessage).toBe(message);

});

test('get started link', async ({ page }) => {
  await page.goto('https://playwright.dev/');

  // Click the get started link.
  await page.getByRole('link', { name: 'Get started' }).click();

  // Expects page to have a heading with the name of Installation.
  await expect(page.getByRole('heading', { name: 'Installation' })).toBeVisible();
});
