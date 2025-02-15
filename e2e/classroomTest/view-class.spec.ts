import {test, expect} from '@playwright/test';
import {initRoute} from "../utils/TestDataHelper/testHelper";

test.beforeEach(async ({page}) => {
    await initRoute(page);
});

test('should can view class', async ({page}) => {
    await page.route("http://localhost:8080/api/class", route => {
        route.fulfill({
            path: './e2e/utils/mockResponse/createdResponse/ownClassResponse.json',
        })
    })

    await page.goto('http://localhost:3000/class');
    await expect(page.getByRole('link')).toContainText('1. Cybersecurity Essentials for the Digital WorldLECTUREONSITE50Friday 5 DecTBAThis lecture covers fundamental cybersecurity principles, common threats, and practical strategies to protect digital assets.');
});

test('should can view more than 1 class', async ({page}) => {
    await page.route("http://localhost:8080/api/class", route => {
        route.fulfill({
            path: './e2e/utils/mockResponse/createdResponse/ownMultipleClassResponse.json',
        })
    })

    await page.goto('http://localhost:3000/class');
    await expect(page.locator('[id="__nuxt"]')).toContainText('1. Cybersecurity Essentials for the Digital World');
    await expect(page.locator('[id="__nuxt"]')).toContainText('2. Introduction to Cloud Computing');
});