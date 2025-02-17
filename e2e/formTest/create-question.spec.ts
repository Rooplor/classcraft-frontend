import {test, expect} from '@playwright/test';
import {initRoute} from "../utils/TestDataHelper/testHelper";

test.beforeEach(async ({page}) => {
    await initRoute(page);
    await page.goto("http://localhost:3000/class/1/edit");
});

test('user can create form for sending question', async ({page}) => {
    await expect(page.getByRole('tab', { name: 'Prepare for registration' })).toBeVisible();
    await page.getByRole('tab', { name: 'Prepare for registration' }).click();

    await page.getByLabel('Add New Question').click();
    await page.getByPlaceholder('Enter question').fill('What is your department?');
    await page.getByLabel('Save').click();
    await expect(page.getByText('Your question has been saved')).toBeVisible();
})

test('user cannot create form for sending question', async ({page}) => {
    await expect(page).toHaveURL("http://localhost:3000/class/1/edit");
    await expect(page.getByRole('tab', { name: 'Prepare for registration' })).toBeVisible();
    await page.getByRole('tab', { name: 'Prepare for registration' }).click();

    await page.getByLabel('Add New Question').click();
    await page.getByPlaceholder('Enter question').fill('');
    await expect(page.getByLabel('Save')).toBeDisabled();
})

test('user can cancel create form for sending question', async ({page}) => {
    await expect(page).toHaveURL("http://localhost:3000/class/1/edit");
    await expect(page.getByRole('tab', { name: 'Prepare for registration' })).toBeVisible();
    await page.getByRole('tab', { name: 'Prepare for registration' }).click();

    await page.getByLabel('Add New Question').click();
    await page.getByPlaceholder('Enter question').fill('What is your department?');
    await page.getByRole('button', { name: 'Cancel' }).click();
    await expect(page.getByText('What is your department?')).not.toBeVisible();
})
