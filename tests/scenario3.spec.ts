import { test, expect, chromium } from "@playwright/test";

test("Scenario 3: Input Form Submit", async ({page}) => {

  await page.goto("https://www.testmuai.com/selenium-playground/");

  await page.getByText("Input Form Submit").click();
  await page.waitForTimeout(2000);
  await page.locator("form").getByRole("button", { name: "Submit" }).click();

  // Assert validation error message
  await expect(page.locator("input:invalid")).toBeTruthy();
  
  // 5. Fill in form fields
  const form = await page.locator('#seleniumform');

  const testData  = {
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
  await form.getByPlaceholder("Name").fill(testData.name);
  await form.getByPlaceholder("Email").fill(testData.email);
  await form.getByPlaceholder("Password").fill(testData.password);
  await form.getByPlaceholder("Company").fill(testData.company);
  await form.getByPlaceholder("Website").fill(testData.website);
  await form.locator("[name='country']").selectOption({ label: "United States" });
  await form.getByPlaceholder("City").fill(testData.city);
  await form.getByPlaceholder("Address 1").fill(testData.address1);
  await form.getByPlaceholder("Address 2").fill(testData.address2);
  await form.getByPlaceholder("State").fill(testData.state);
  await form.getByPlaceholder("Zip").fill(testData.zip);

  // 7. Submit form
  await page.locator("form").getByRole("button", { name: "Submit" }).click();


  // 8. Validate success message
  await expect(
    page.getByText("Thanks for contacting us, we will get back to you shortly.")
  ).toBeVisible();
}); 