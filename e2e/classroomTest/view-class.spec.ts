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
    await page.getByRole('button', {name: 'Explore'}).click();
    await expect(page.locator('[id="__nuxt"]')).toContainText('1. Cybersecurity Essentials for the Digital WorldLECTUREONSITE50 Thursday 5 Dec TBAThis lecture covers fundamental cybersecurity principles, common threats, and practical strategies to protect digital assets.+1014 people registered88');
});

test('should can view more than 1 class', async ({page}) => {
    await page.route("http://localhost:8080/api/class", route => {
        route.fulfill({
            path: './e2e/utils/mockResponse/createdResponse/ownMultipleClassResponse.json',
        })
    })

    await page.goto('http://localhost:3000/class');
    await page.getByRole('button', {name: 'Explore'}).click();
    await expect(page.locator('[id="__nuxt"]')).toContainText('1. Cybersecurity Essentials for the Digital WorldLECTUREONSITE50 Thursday 5 Dec TBAThis lecture covers fundamental cybersecurity principles, common threats, and practical strategies to protect digital assets.+1014 people registered88');
    await expect(page.locator('[id="__nuxt"]')).toContainText('2. Introduction to Cloud ComputingLECTUREONSITE50 Thu, 5 Dec - Fri, 6 Dec TBAAn overview of cloud computing concepts, service models (IaaS, PaaS, SaaS), and its applications in modern IT environments.+1014 people registered88');
});