import {test, expect} from '@playwright/test';
import {initRoute} from "../utils/TestDataHelper/testHelper";
import {a} from "unplugin-vue-router/types-DBiN4-4c";

test.beforeEach(async ({page}) => {
    await initRoute(page);

    await page.route('http://localhost:8080/api/user/profile', route => {
        route.fulfill({
            status: 200,
            contentType: 'application/json',
            body: JSON.stringify({
                success: true,
                result: {
                    id: "2",
                    username: "Natdanai Nitipan",
                    email: "natdanai@gmail.com",
                    profilePicture: "www.example.com",
                    myClassroom: [],
                },
                error: null
            })
        });
    });
});

test('should can register class', async ({page}) => {
    await page.route("http://localhost:8080/api/class", route => {
        route.fulfill({
            path: './e2e/utils/mockResponse/createdResponse/anotherClassResponse.json',
        })
    })

    await page.route("http://localhost:8080/api/form/submit", route => {
        route.fulfill({
            path: './e2e/utils/mockResponse/registerResponse/registerResponse.json',
        })
    })

    await page.goto('http://localhost:3000/class');
    await page.getByRole('link', { name: ' 1. Cybersecurity Essentials' }).click();
    await expect(page.getByLabel('Join "1. Cybersecurity')).toBeVisible();
    await page.getByLabel('Join "1. Cybersecurity').click();
    await expect(page.getByText('Registration for "1.')).toBeVisible();
    await page.getByPlaceholder('Enter your full name e.g.').fill('Natdanai Nitipan');
    await page.getByPlaceholder('Enter your email e.g. example').fill('natdanai@gmail.com');
    await page.getByPlaceholder('Enter your phone number e.g.').fill('0888888888');
    await page.getByRole('button', { name: 'Join', exact: true }).click();
    await expect(page.getByText('Thank you for joining')).toBeVisible();
});

test('user cannot register class with phone number is empty string', async ({page}) => {
    await page.route("http://localhost:8080/api/class", route => {
        route.fulfill({
            path: './e2e/utils/mockResponse/createdResponse/anotherClassResponse.json',
        })
    })

    await page.route("http://localhost:8080/api/form/submit", route => {
        route.fulfill({
            path: './e2e/utils/mockResponse/registerResponse/registerResponse.json',
        })
    })

    await page.goto('http://localhost:3000/class');
    await page.getByRole('link', { name: ' 1. Cybersecurity Essentials' }).click();
    await expect(page.getByLabel('Join "1. Cybersecurity')).toBeVisible();
    await page.getByLabel('Join "1. Cybersecurity').click();
    await expect(page.getByText('Registration for "1.')).toBeVisible();
    await page.getByPlaceholder('Enter your full name e.g.').fill('Natdanai Nitipan');
    await page.getByPlaceholder('Enter your email e.g. example').fill('natdanai@gmail.com');
    await page.getByPlaceholder('Enter your phone number e.g.').fill('');
    await page.getByRole('button', { name: 'Join', exact: true }).click();
    await expect(page.getByLabel('Registration for "1.').locator('div').filter({ hasText: 'Registration for "1.' })).toBeVisible();
});

test('user cannot register class with custom question is empty string', async ({page}) => {
    await page.route("http://localhost:8080/api/class", route => {
        route.fulfill({
            path: './e2e/utils/mockResponse/createdResponse/anotherClassResponse.json',
        })
    })

    await page.route("http://localhost:8080/api/form/1", route => {
        route.fulfill({
            path: './e2e/utils/mockResponse/registerResponse/registerQuestionResponse.json',
        })
    });

    await page.goto('http://localhost:3000/class');
    await page.getByRole('link', { name: ' 1. Cybersecurity Essentials' }).click();
    await expect(page.getByLabel('Join "1. Cybersecurity')).toBeVisible();
    await page.getByLabel('Join "1. Cybersecurity').click();
    await expect(page.getByText('Registration for "1.')).toBeVisible();
    await page.getByPlaceholder('Enter your full name e.g.').fill('Natdanai Nitipan');
    await page.getByPlaceholder('Enter your email e.g. example').fill('natdanai@gmail.com');
    await page.getByPlaceholder('Enter your phone number e.g.').fill('0888888888');
    await page.getByLabel('What is your department?').fill('');
    await page.getByRole('button', { name: 'Join', exact: true }).click();
    await expect(page.getByLabel('Registration for "1.').locator('div').filter({ hasText: 'Registration for "1.' })).toBeVisible();
});