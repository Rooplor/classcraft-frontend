import {test, expect} from '@playwright/test';
import {
    getOneOrTwoDayClassResponse,
    initRoute,
    testCreateClassHelper
} from "../utils/TestDataHelper/testHelper";

test.beforeEach(async ({page}) => {
    await initRoute(page);

    await page.route("http://localhost:8080/api/class/1/reservation", route => {
        route.fulfill({
            body: JSON.stringify({"success": true, "result": true, "error": null}),
        })
    })
});

test('should be create class and display list of venue', async ({page}) => {

    await page.route("http://localhost:8080/api/class", route => {
        route.fulfill({
            path: './e2e/utils/mockResponse/createdResponse/getEmptyClass.json',
        })
    })

    await testCreateClassHelper(
        page,
        '1. Cybersecurity Essentials for the Digital World',
        'This lecture covers fundamental cybersecurity principles, common threats, and practical strategies to protect digital assets.',
        'IT professionals, students, and small business owners',
        'Basic knowledge of IT systems',
        "Lecture",
        "Online",
        '50',
        '08:00',
        '16:00',
        'testUser',
        'test@gmail.com',
        'SIT STUDENT',
        1,
        './e2e/utils/mockResponse/createdResponse/class1DayResponse.json'
    );

    await page.getByRole('tab', {name: 'Reserve venue'}).click();
    await expect(page.getByText('LX-10 - 1')).toBeVisible()
    await expect(page.getByText('LX-10 - 2')).toBeVisible()
    await expect(page.getByText('LX-10 - 3')).toBeVisible()
})

test('should be select venue for class on 1 day', async ({page}) => {
    await getOneOrTwoDayClassResponse(page, 1);

    await page.goto('http://localhost:3000/class');

    await page.getByText("1. Cybersecurity Essentials for the Digital World").click();

    await page.getByLabel('Manage "1. Cybersecurity').click();

    await page.getByRole('tab', {name: 'Reserve venue'}).click();
    await page.getByText('LX-10 - 1').click();

    await page.getByLabel('Request to reserve').click();
    await page.getByLabel('Send request', {exact: true}).click();
    await expect(page.getByText("Request sent")).toBeVisible();
    await expect(page.getByText("Pending")).toBeVisible();
})

test('should be select different venue for class on more than 1 day', async ({page}) => {
    await getOneOrTwoDayClassResponse(page, 2);

    await page.goto('http://localhost:3000/class');

    await page.getByText("1. Cybersecurity Essentials for the Digital World").click();

    await page.getByLabel('Manage "1. Cybersecurity').click();

    await page.getByRole('tab', {name: 'Reserve venue'}).click();

    await page.getByRole('button', {name: 'Select venue for each date'}).click();
    await page.getByRole('button', {name: 'Thu, 5 December  8:00 am - 4'}).click();
    await page.getByText('LX-10 - 1').click();
    await page.getByRole('button', {name: 'Fri, 6 December  8:00 am - 4'}).click();
    await page.getByText('LX-10 - 2').click();

    await page.getByLabel('Request to reserve').click();
    await page.getByLabel('Send request', {exact: true}).click();
    await expect(page.getByText("Request sent")).toBeVisible();
    await expect(page.getByText("Pending")).toBeVisible();
})

test('should be select same venue for class on more than 1 day', async ({page}) => {
    await getOneOrTwoDayClassResponse(page, 2);

    await page.goto('http://localhost:3000/class');

    await page.getByText("1. Cybersecurity Essentials for the Digital World").click();

    await page.getByLabel('Manage "1. Cybersecurity').click();

    await page.getByRole('tab', {name: 'Reserve venue'}).click();

    await page.getByText('LX-10 - 1').click();

    await page.getByLabel('Request to reserve').click();
    await page.getByLabel('Send request', {exact: true}).click();
    await expect(page.getByText("Request sent")).toBeVisible();
    await expect(page.getByText("Pending")).toBeVisible();
})

test('should be show status approved when got approve', async ({page}) => {
    await page.route("http://localhost:8080/api/class/1", route => {
        route.fulfill({
            path: './e2e/utils/mockResponse/createdResponse/class1DayApprovedResponse.json',
        })
    })

    await page.goto('http://localhost:3000/class');

    await page.getByText("1. Cybersecurity Essentials for the Digital World").click();

    await page.getByLabel('Manage "1. Cybersecurity').click();

    await page.getByRole('tab', {name: 'Reserve venue'}).click();

    await expect(page.getByText("Approved").nth(0)).toBeVisible();
})

test('should be show status rejected when got reject', async ({page}) => {
    await page.route("http://localhost:8080/api/class/1", route => {
        route.fulfill({
            path: './e2e/utils/mockResponse/createdResponse/class1DayRejectedResponse.json',
        })
    })

    await page.goto('http://localhost:3000/class');

    await page.getByText("1. Cybersecurity Essentials for the Digital World").click();

    await page.getByLabel('Manage "1. Cybersecurity').click();

    await page.getByRole('tab', {name: 'Reserve venue'}).click();

    await expect(page.getByText("Rejected").nth(0)).toBeVisible();
})