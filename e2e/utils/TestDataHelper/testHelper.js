import {expect} from "@playwright/test";
import {validateMsg} from "./validateMsg.js";

export async function testCreateClassHelper(page, classTitle, classDetails, attendees, prerequisites, classType, classFormat, maxAttendees, startTime, endTime, instructorName, instructorDetails, familiarity, numOfDays, pathResponse) {
    await page.goto('http://localhost:3000/class');
    await page.getByRole('button', {name: 'Add class'}).click();
    await page.getByPlaceholder('Class title').click();
    await page.getByPlaceholder('Class title').fill(classTitle);
    await page.locator('#details div').nth(2).fill(classDetails);
    await page.getByPlaceholder('Who should attend this class?').click();
    await page.getByPlaceholder('Who should attend this class?').fill(attendees);
    await page.getByPlaceholder('What should attendees know').click();
    await page.getByPlaceholder('What should attendees know').fill(prerequisites);
    if (classType != "") {
        await page.getByRole('button', {name: classType}).click();
    }
    if (classFormat != "") {
        await page.getByRole('button', {name: classFormat}).click();
    }
    await page.getByPlaceholder('How many people can attend?').fill(maxAttendees);

    if (numOfDays != 0) {
        await page.getByPlaceholder('Select date').click();
        await page.getByPlaceholder('Select date').fill('Sun 5 Dec 2024');
        await page.getByPlaceholder('Select start time').click();
        await page.getByPlaceholder('Select start time').fill(startTime);
        await page.getByPlaceholder('Select end time').click();
        await page.getByPlaceholder('Select end time').fill(endTime);
    }

    if (numOfDays === 2) {
        await page.getByLabel('Add date').click();
        await page.getByPlaceholder('Select date').nth(1).click();
        await page.getByPlaceholder('Select date').nth(1).fill('Sun 6 Dec 2024');
        await page.getByPlaceholder('Select start time').nth(1).click();
        await page.getByPlaceholder('Select start time').nth(1).fill(startTime);
        await page.locator('input[name="dates\\[1\\]\\.date\\.endDateTime"]').click();
        await page.locator('input[name="dates\\[1\\]\\.date\\.endDateTime"]').fill(endTime);
    }

    await page.getByLabel('I\'m the instructor').check();
    await page.getByPlaceholder('Instructor name').click();
    await page.getByPlaceholder('Instructor name').fill(instructorName);
    await page.getByPlaceholder('Tell us about the instructor').click();
    await page.getByPlaceholder('Tell us about the instructor').fill(instructorDetails);
    await page.getByPlaceholder('How familiar is the').click();
    await page.getByPlaceholder('How familiar is the').fill(familiarity);


    await page.route("http://localhost:8080/api/class", route => {
        route.fulfill({
            path: pathResponse
        })
    })


    await page.route("http://localhost:8080/api/class/1", route => {
        route.fulfill({
            path: pathResponse
        })
    })

    await page.getByRole('button', {name: 'Save'}).click();
}

export async function showValidationMsg(page, validateMsg, notVisibleMsg, invert = false) {
    const validationMessages = [
        'titleRequired',
        'detailRequired',
        'targetRequired',
        'typeRequired',
        'formatRequired',
        'capacityRequired',
        'dateTimeRequired',
        'instructorNameRequired',
        'instructorBioRequired',
        'instructorFamiliarityRequired'
    ];

    for (const msg of validationMessages) {
        const isVisible = !notVisibleMsg.includes(msg);
        if (invert ? isVisible : !isVisible) {
            await expect(page.getByText(validateMsg[msg])).toBeVisible({visible: false});
        } else {
            await expect(page.getByText(validateMsg[msg])).toBeVisible();
        }
    }
}

export async function updateClassResponse(oldClassPath, newClassPath, page) {
    await page.route("http://localhost:8080/api/class/1", route => {
        if (route.request().method() === "GET") {
            route.fulfill({
                path: './e2e/utils/mockResponse/updatedResponse/' + oldClassPath
            })
        } else if (route.request().method() === "PUT") {
            route.fulfill({
                path: './e2e/utils/mockResponse/updatedResponse/' + newClassPath
            })
        }
    })

    await page.goto("http://localhost:3000/class");
}