import {test, expect} from '@playwright/test';
import {initRoute} from "../utils/TestDataHelper/testHelper";

test.beforeEach(async ({page}) => {
    await initRoute(page);
});

test('Test delete class', async ({page}) => {
    await page.goto("http://localhost:3000/class");

    await page.locator('[id="__nuxt"]').getByText('1. Cybersecurity Essentials for the Digital World').click();
    await page.getByLabel('Manage "1. Cybersecurity').click();
    await page.getByRole('button', { name: '' }).click();
    await page.getByLabel('Delete Classroom').click();
    await page.locator('#classroom-title').click();
    await page.locator('#classroom-title').fill('1. Cybersecurity Essentials for the Digital World');
    await page.getByLabel('Delete', { exact: true }).nth(1).click();
});

test('Test delete class with wrong title input', async ({page}) => {
    await page.goto("http://localhost:3000/class");

    await page.locator('[id="__nuxt"]').getByText('1. Cybersecurity Essentials for the Digital World').click();
    await page.getByLabel('Manage "1. Cybersecurity').click();
    await page.getByRole('button', { name: '' }).click();
    await page.getByLabel('Delete Classroom').click();
    await page.locator('#classroom-title').click();
    await page.locator('#classroom-title').fill('123');
    await page.getByLabel('Delete', { exact: true }).nth(1).click();
    await expect(page.getByText('Please type text to match')).toBeVisible();
});