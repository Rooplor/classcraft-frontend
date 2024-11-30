import {test, expect} from '@playwright/test';
import {initRoute} from "../utils/TestDataHelper/testHelper";

test.beforeEach(async ({page}) => {
    await initRoute(page);
});

test('Test delete class', async ({page}) => {
    await page.goto("http://localhost:3000/class");

    await page.getByLabel('More').click();
    await page.getByLabel('Delete').click();
    await page.getByLabel('Delete Confirmation').getByLabel('Delete').click();
    await expect(page.getByText('Your classroom has been')).toBeVisible()
});