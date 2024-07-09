const { test, expect } = require("@playwright/test");
const { chromium } = require("playwright");
const {email, password, unvalidEmail, unvalidPass} = require("../user");
const { beforeEach, afterEach, describe } = require("node:test");

describe("Authorization on the site Netology.ru", () => {
  test ("Successful authorization", async ({ page }) => {
  await page.goto("https://netology.ru/?modal=sign_in");
    // Click [placeholder="Email"]
  await page.getByPlaceholder('Email').click();
    // Fill [placeholder="Email"]
  await page.getByPlaceholder('Email').fill(email);
  await page.pause();
    // Click [placeholder="Пароль"]
  await page.getByPlaceholder('Пароль').click();
    // Fill [placeholder="Пароль"]
  await page.getByPlaceholder('Пароль').fill(password);
    // Click [data-testid="login-submit-btn"]
  await page.getByTestId('login-submit-btn').click();
  await page.pause();
    // Expected
  await expect(page).toHaveURL("https://netology.ru/profile/8500991");
  await expect(page.locator("h2")).toContainText("Моё обучение");
  });

  test ("Authorization failed", async ({ page }) => {
    await page.goto("https://netology.ru/?modal=sign_in");
    await page.click('[placeholder="Email"]');
    await page.fill('[placeholder="Email"]', unvalidEmail);
    await page.click('[placeholder="Пароль"]');
    await page.fill('[placeholder="Пароль"]', unvalidPass);
    await page.click('[data-testid="login-submit-btn"]');

    const error = await page.locator('[data-testid="login-error-hint"]');
    await expect(error).toHaveText("Вы ввели неправильно логин или пароль.");
    });
});