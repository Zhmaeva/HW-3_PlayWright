const { test, expect } = require("@playwright/test");
const { chromium } = require("playwright");
const {email, password, unvalidEmail, unvalidPass} = require("../user");
const { beforeEach, afterEach, describe } = require("node:test");

beforeEach(async () => {
  page = await browser.newPage();
  await page.goto("https://netology.ru");
});
afterEach(async () => {
  await page.close();
});

describe("Authorization on the site Netology.ru", () => {
  test ("Successful authorization", async () => {
    // Click [data-testid="header-top"] div:has-text("Войти")
  await page.click('[data-testid="header-top"] div:has-text("Войти")');
  await page.click('text=Войти');
    // Click [placeholder="Email"]
  await page.click('[placeholder="Email"]');
    // Fill [placeholder="Email"]
  await page.fill('[placeholder="Email"]', email);
    // Click [placeholder="Пароль"]
  await page.click('[placeholder="Пароль"]');
    // Fill [placeholder="Пароль"]
  await page.fill('[placeholder="Пароль"]', password);
    // Click [data-testid="login-submit-btn"]
  await page.click('[data-testid="login-submit-btn"]');
    // Expected
  await expect(page).toHaveURL("https://netology.ru/profile/8500991");
  });

});