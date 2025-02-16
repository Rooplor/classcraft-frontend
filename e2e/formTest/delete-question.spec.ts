import {test, expect} from '@playwright/test';
import {initRoute} from "../utils/TestDataHelper/testHelper";

test.beforeEach(async ({page}) => {
    await initRoute(page);
    await page.goto("http://localhost:3000/class/1/edit");

    await page.route("http://localhost:8080/api/class/1", route => {
        if (route.request().method() === "GET") {
            route.fulfill({
                path: `./e2e/utils/mockResponse/createdResponse/classState3Response.json`,
            })
        }
    });

    await page.route("http://localhost:8080/api/form/1", route => {
        if (route.request().method() === "GET") {
            route.fulfill({
                path: `./e2e/utils/mockResponse/formResponse/classFormResponse.json`,
            })
        }
        if (route.request().method() === "PUT") {
            route.fulfill({
                path: `./e2e/utils/mockResponse/formResponse/classFormResponse.json`,
            })
        }
    })
});

test('user can delete form for sending question', async ({page}) => {
    await expect(page.getByRole('tab', { name: 'Prepare for registration' })).toBeVisible();
    await page.getByRole('tab', { name: 'Prepare for registration' }).click();

    await page.getByLabel('Delete').click();
    await page.getByLabel('Delete Confirmation').getByLabel('Delete').click();
    await expect(page.getByText('Your question has been deleted')).toBeVisible();
})

test('user can cancel delete form for sending question', async ({page}) => {
    await expect(page.getByRole('tab', { name: 'Prepare for registration' })).toBeVisible();
    await page.getByRole('tab', { name: 'Prepare for registration' }).click();

    await page.getByLabel('Delete').click();
    await page.getByRole('button', { name: 'Cancel' }).click();
    await expect(page.getByText('What is your department?')).toHaveCount(2);
})