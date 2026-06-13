import { test, expect, chromium } from "@playwright/test";

test("Scenario 3: Input Form Submit", async ({}) => {

  const browser = await chromium.launch({
      headless: false, // 👈 Add this
    });
  const page = await browser.newPage();
  // 1. Open page
  await page.goto("https://www.testmuai.com/selenium-playground/");

  // 2. Click Input Form Submit — locator 1: text
  await page.getByText("Input Form Submit").click();

  await page.waitForTimeout(2000);
  // 3. Click Submit without filling form — locator 2: CSS
  await page.locator("form button[type='submit']").click();

  // 4. Assert validation error message
  await expect(page.locator("input:invalid")).toBeTruthy();
  // OR if there's a visible error message:
  // await expect(page.getByText("Please fill in the fields")).toBeVisible();

  // 5. Fill in form fields — locator 3: name attribute
  await page.locator("[name='name']").fill("John Doe");
  await page.locator("[name='email']").fill("johndoe@example.com");
  await page.locator("[name='password']").fill("Test@1234");
  await page.locator("[name='company']").fill("TestMu Inc");
  await page.locator("[name='website']").fill("https://testmuai.com");

  // 6. Select "United States" from Country dropdown — by text
  await page.locator("[name='country']").selectOption({ label: "United States" });

  await page.locator("[name='city']").fill("New York");
  await page.locator("[name='address']").fill("123 Test Street");
  await page.locator("[name='state']").fill("NY");
  await page.locator("[name='zip']").fill("10001");

  // 7. Submit form
  await page.locator("button[type='submit']").click();

  // 8. Validate success message
  await expect(
    page.getByText("Thanks for contacting us, we will get back to you shortly.")
  ).toBeVisible();
}); 