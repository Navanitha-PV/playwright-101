import { test, expect } from "@playwright/test";

test("Scenario 3: Input Form Submit", async ({ page }) => {

  await page.goto("https://www.testmuai.com/selenium-playground/");

  await page.getByText("Input Form Submit").click();
  await page.waitForLoadState("networkidle");

  await page.locator("form").getByRole("button", { name: "Submit" }).click();

  // Step 3: Assert validation - check Name field is invalid using CSS locator
  const nameField = page.locator("input[name='name']");
  const isInvalid = await nameField.evaluate(
    (el: HTMLInputElement) => !el.validity.valid
  );
  expect(isInvalid).toBe(true); 

  // Fill in all form fields
  const form = page.locator('#seleniumform');

  const testData = {
    name: "Navan",
    email: "navanitha@testmuai.com",
    password: "Test@1234",
    company: "TestMu Inc",
    website: "https://testmuai.com",
    country: "United States",
    city: "New York",
    address1: "123 Test address",
    address2: "345 Test address",
    state: "NY",
    zip: "10001"
  };

  // Using placeholder locators
  await form.getByPlaceholder("Name").fill(testData.name);
  await form.getByPlaceholder("Email").fill(testData.email);
  await form.getByPlaceholder("Password").fill(testData.password);
  await form.getByPlaceholder("Company").fill(testData.company);
  await form.getByPlaceholder("Website").fill(testData.website);

  // Select country using CSS locator
  await form.locator("[name='country']").selectOption({ label: "United States" });

  await form.getByPlaceholder("City").fill(testData.city);
  await form.getByPlaceholder("Address 1").fill(testData.address1);
  await form.getByPlaceholder("Address 2").fill(testData.address2);
  await form.getByPlaceholder("State").fill(testData.state);
  await form.getByPlaceholder("Zip").fill(testData.zip);

  //Submit form - using role locator
  await page.locator("form").getByRole("button", { name: "Submit" }).click();

 //Validate success message - using text locator
  await expect(
    page.getByText("Thanks for contacting us, we will get back to you shortly.")
  ).toBeVisible({ timeout: 15000 });

  await page.close();
});