import {test, expect} from '@playwright/test';
import {
    initRoute,
    showValidationMsg,
    updateClassResponse
} from "../utils/TestDataHelper/testHelper";
import {validateMsg} from "../utils/TestDataHelper/validateMsg";

test.beforeEach(async ({page}) => {
    await initRoute(page);
});

test("should be update class title", async ({page}) => {
    await updateClassResponse('notUpdatedClassResponse.json', 'updatedClassTitleResponse.json', page)

    await page.getByText("1. Cybersecurity Essentials for the Digital World").click();

    await expect(page).toHaveURL("http://localhost:3000/class/1/edit");
    await expect(page.getByText("Fill class detail").nth(1)).toBeVisible();
    await page.getByText("Fill class detail").nth(0).click();
    await page.getByPlaceholder('Class title').fill("1. Cybersecurity Essentials for the Digital World (EDITED)");

    await page.getByRole('button', {name: 'Save'}).click();

    await expect(page.getByText("Class updated")).toBeVisible();
});

test("should be update class details", async ({page}) => {
    await updateClassResponse('updatedClassTitleResponse.json', 'updatedClassDetailResponse.json', page)

    await page.getByText("1. Cybersecurity Essentials for the Digital World").click();

    await expect(page).toHaveURL("http://localhost:3000/class/1/edit");
    await expect(page.getByText("Fill class detail").nth(1)).toBeVisible();
    await page.getByText("Fill class detail").nth(0).click();
    await page.locator('#details div').nth(2).fill("This lecture covers fundamental cybersecurity principles, common threats, and practical strategies to protect digital assets. (edited)");

    await page.getByRole('button', {name: 'Save'}).click();

    await expect(page.getByText("Class updated")).toBeVisible();
})

test("should be update class target", async ({page}) => {
    await updateClassResponse('updatedClassDetailResponse.json', 'updatedClassTargetResponse.json', page)

    await page.getByText("1. Cybersecurity Essentials for the Digital World").click();

    await expect(page).toHaveURL("http://localhost:3000/class/1/edit");
    await expect(page.getByText("Fill class detail").nth(1)).toBeVisible();
    await page.getByText("Fill class detail").nth(0).click();
    await page.getByPlaceholder('Who should attend this class?').fill('IT professionals, students, and small business owners (edited)');

    await page.getByRole('button', {name: 'Save'}).click();

    await expect(page.getByText("Class updated")).toBeVisible();
})

test("should be update class prerequisites", async ({page}) => {
    await updateClassResponse('updatedClassTargetResponse.json', 'updatedClassPrerequisitesResponse.json', page)

    await page.getByText("1. Cybersecurity Essentials for the Digital World").click();

    await expect(page).toHaveURL("http://localhost:3000/class/1/edit");
    await expect(page.getByText("Fill class detail").nth(1)).toBeVisible();
    await page.getByText("Fill class detail").nth(0).click();
    await page.getByPlaceholder('What should attendees know').click();
    await page.getByPlaceholder('What should attendees know').fill('Basic knowledge of IT systems (edited)');

    await page.getByRole('button', {name: 'Save'}).click();

    await expect(page.getByText("Class updated")).toBeVisible();
})

test("should be update class type", async ({page}) => {
    await updateClassResponse('updatedClassPrerequisitesResponse.json', 'updatedClassTypeResponse.json', page)

    await page.getByText("1. Cybersecurity Essentials for the Digital World").click();

    await expect(page).toHaveURL("http://localhost:3000/class/1/edit");
    await expect(page.getByText("Fill class detail").nth(1)).toBeVisible();
    await page.getByText("Fill class detail").nth(0).click();
    await page.getByRole('button', {name: 'Workshop'}).click();

    await page.getByRole('button', {name: 'Save'}).click();

    await expect(page.getByText("Class updated")).toBeVisible();
})

test("should be update class format", async ({page}) => {
    await updateClassResponse('updatedClassTypeResponse.json', 'updatedClassFormatResponse.json', page)

    await page.getByText("1. Cybersecurity Essentials for the Digital World").click();

    await expect(page).toHaveURL("http://localhost:3000/class/1/edit");
    await expect(page.getByText("Fill class detail").nth(1)).toBeVisible();
    await page.getByText("Fill class detail").nth(0).click();
    await page.getByRole('button', {name: 'Online'}).click();

    await page.getByRole('button', {name: 'Save'}).click();

    await expect(page.getByText("Class updated")).toBeVisible();
})

test("should be update class available seats", async ({page}) => {
    await updateClassResponse('updatedClassFormatResponse.json', 'updatedClassSeatResponse.json', page)

    await page.getByText("1. Cybersecurity Essentials for the Digital World").click();

    await expect(page).toHaveURL("http://localhost:3000/class/1/edit");
    await expect(page.getByText("Fill class detail").nth(1)).toBeVisible();
    await page.getByText("Fill class detail").nth(0).click();

    await page.getByPlaceholder('How many people can attend?').fill('40');

    await page.getByRole('button', {name: 'Save'}).click();

    await expect(page.getByText("Class updated")).toBeVisible();
})

test("should be update class date and time", async ({page}) => {
    await updateClassResponse('updatedClassSeatResponse.json', 'updatedClassDateResponse.json', page)

    await page.getByText("1. Cybersecurity Essentials for the Digital World").click();

    await expect(page).toHaveURL("http://localhost:3000/class/1/edit");
    await expect(page.getByText("Fill class detail").nth(1)).toBeVisible();
    await page.getByText("Fill class detail").nth(0).click();

    await page.getByPlaceholder('Select date').click();
    await page.getByPlaceholder('Select date').fill('Sun 6 Dec 2024');
    await page.getByPlaceholder('Select start time').click();
    await page.getByPlaceholder('Select start time').fill('09:00');
    await page.getByPlaceholder('Select end time').click();
    await page.getByPlaceholder('Select end time').fill('17:00');

    await page.getByRole('button', {name: 'Save'}).click();

    await expect(page.getByText("Class updated")).toBeVisible();
})

test("should be update class instructor about", async ({page}) => {
    await updateClassResponse('updatedClassDateResponse.json', 'updatedClassInstructorAboutResponse.json', page)

    await page.getByText("1. Cybersecurity Essentials for the Digital World").click();

    await expect(page).toHaveURL("http://localhost:3000/class/1/edit");
    await expect(page.getByText("Fill class detail").nth(1)).toBeVisible();
    await page.getByText("Fill class detail").nth(0).click();

    await page.getByPlaceholder('Tell us about the instructor').click();
    await page.getByPlaceholder('Tell us about the instructor').fill("edited@example.com");

    await page.getByRole('button', {name: 'Save'}).click();

    await expect(page.getByText("Class updated")).toBeVisible();
})

test("should be update class instructor familiarity", async ({page}) => {
    await updateClassResponse('updatedClassInstructorAboutResponse.json', 'updatedClassInstructorFamResponse.json', page)

    await page.getByText("1. Cybersecurity Essentials for the Digital World").click();

    await expect(page).toHaveURL("http://localhost:3000/class/1/edit");
    await expect(page.getByText("Fill class detail").nth(1)).toBeVisible();
    await page.getByText("Fill class detail").nth(0).click();

    await page.getByPlaceholder('How familiar is the').click();
    await page.getByPlaceholder('How familiar is the').fill("SIT STUDENT (edited)");

    await page.getByRole('button', {name: 'Save'}).click();

    await expect(page.getByText("Class updated")).toBeVisible();
})

test("should be update publish class", async ({page}) => {
    await updateClassResponse('updatedClassInstructorFamResponse.json', 'updatedClassPublishedResponse.json', page)

    await page.route("http://localhost:8080/api/class/1/toggle-publish-status", route => {
        route.fulfill({
            path: './e2e/utils/mockResponse/updatedResponse/updatedClassPublishedResponse.json',
        })
    })

    await page.getByText("1. Cybersecurity Essentials for the Digital World").click();

    await expect(page).toHaveURL("http://localhost:3000/class/1/edit");
    await expect(page.getByText("Fill class detail").nth(1)).toBeVisible();
    await page.getByText("Fill class detail").nth(0).click();

    await page.getByLabel('Share').click();
    await page.getByLabel('Publish').click();

    await expect(page.getByText("Classroom is published")).toBeVisible();
})

test("should be update unpublish class", async ({page}) => {
    await updateClassResponse('updatedClassPublishedResponse.json', 'updatedClassUnPublishedResponse.json', page)

    await page.route("http://localhost:8080/api/class/1/toggle-publish-status", route => {
        route.fulfill({
            path: './e2e/utils/mockResponse/updatedResponse/updatedClassUnPublishedResponse.json',
        })
    })

    await page.getByText("1. Cybersecurity Essentials for the Digital World").click();

    await expect(page).toHaveURL("http://localhost:3000/class/1/edit");
    await expect(page.getByText("Fill class detail").nth(1)).toBeVisible();
    await page.getByText("Fill class detail").nth(0).click();

    await page.getByLabel('Share').click();
    await page.getByLabel('Unpublish').click();

    await expect(page.getByText("Classroom is unpublished")).toBeVisible();
})

test("should not be update title", async ({page}) => {
    await updateClassResponse('updatedClassPublishedResponse.json', 'updatedClassUnPublishedResponse.json', page)

    await page.getByText("1. Cybersecurity Essentials for the Digital World").click();

    await expect(page).toHaveURL("http://localhost:3000/class/1/edit");
    await expect(page.getByText("Fill class detail").nth(1)).toBeVisible();
    await page.getByText("Fill class detail").nth(0).click();

    await page.getByText("Fill class detail").nth(0).click();
    await page.getByPlaceholder('Class title').fill("");

    await page.getByRole('button', {name: 'Save'}).click();

    await showValidationMsg(page, validateMsg, ['titleRequired'], true);
})

test("should not be update detail", async ({page}) => {
    await updateClassResponse('updatedClassPublishedResponse.json', 'updatedClassUnPublishedResponse.json', page)

    await page.getByText("1. Cybersecurity Essentials for the Digital World").click();

    await expect(page).toHaveURL("http://localhost:3000/class/1/edit");
    await expect(page.getByText("Fill class detail").nth(1)).toBeVisible();
    await page.getByText("Fill class detail").nth(0).click();

    await page.getByText("Fill class detail").nth(0).click();
    await page.locator('#details div').nth(2).fill("");

    await page.getByRole('button', {name: 'Save'}).click();

    await showValidationMsg(page, validateMsg, ['detailRequired'], true);
})

test("should not be update target", async ({page}) => {
    await updateClassResponse('updatedClassPublishedResponse.json', 'updatedClassUnPublishedResponse.json', page)

    await page.getByText("1. Cybersecurity Essentials for the Digital World").click();

    await expect(page).toHaveURL("http://localhost:3000/class/1/edit");
    await expect(page.getByText("Fill class detail").nth(1)).toBeVisible();
    await page.getByText("Fill class detail").nth(0).click();

    await page.getByPlaceholder('Who should attend this class?').fill('');

    await page.getByRole('button', {name: 'Save'}).click();

    await showValidationMsg(page, validateMsg, ['targetRequired'], true);
})

test("should not be update available seats", async ({page}) => {
    await updateClassResponse('updatedClassPublishedResponse.json', 'updatedClassUnPublishedResponse.json', page)

    await page.getByText("1. Cybersecurity Essentials for the Digital World").click();

    await expect(page).toHaveURL("http://localhost:3000/class/1/edit");
    await expect(page.getByText("Fill class detail").nth(1)).toBeVisible();
    await page.getByText("Fill class detail").nth(0).click();

    await page.getByPlaceholder('How many people can attend?').fill("");

    await page.getByRole('button', {name: 'Save'}).click();

    await showValidationMsg(page, validateMsg, ['capacityRequired'], true);
})

test("should not be update date time", async ({page}) => {
    await updateClassResponse('updatedClassPublishedResponse.json', 'updatedClassUnPublishedResponse.json', page)

    await page.getByText("1. Cybersecurity Essentials for the Digital World").click();

    await expect(page).toHaveURL("http://localhost:3000/class/1/edit");
    await expect(page.getByText("Fill class detail").nth(1)).toBeVisible();
    await page.getByText("Fill class detail").nth(0).click();

    await page.getByPlaceholder('Select date').click();
    await page.getByPlaceholder('Select date').fill('');
    await page.getByPlaceholder('Select start time').click();
    await page.getByPlaceholder('Select start time').fill('');
    await page.getByPlaceholder('Select end time').click();
    await page.getByPlaceholder('Select end time').fill('');

    await page.getByRole('button', {name: 'Save'}).click();

    await showValidationMsg(page, validateMsg, ['dateTimeRequired'], true);
})

test("should not be update Instructor about", async ({page}) => {
    await updateClassResponse('updatedClassPublishedResponse.json', 'updatedClassUnPublishedResponse.json', page)

    await page.getByText("1. Cybersecurity Essentials for the Digital World").click();

    await expect(page).toHaveURL("http://localhost:3000/class/1/edit");
    await expect(page.getByText("Fill class detail").nth(1)).toBeVisible();
    await page.getByText("Fill class detail").nth(0).click();

    await page.getByPlaceholder('Tell us about the instructor').click();
    await page.getByPlaceholder('Tell us about the instructor').fill("");

    await page.getByRole('button', {name: 'Save'}).click();

    await showValidationMsg(page, validateMsg, ['instructorBioRequired'], true);
})

test("should not be update Instructor familiarity", async ({page}) => {
    await updateClassResponse('updatedClassPublishedResponse.json', 'updatedClassUnPublishedResponse.json', page)

    await page.getByText("1. Cybersecurity Essentials for the Digital World").click();

    await expect(page).toHaveURL("http://localhost:3000/class/1/edit");
    await expect(page.getByText("Fill class detail").nth(1)).toBeVisible();
    await page.getByText("Fill class detail").nth(0).click();

    await page.getByPlaceholder('How familiar is the').click();
    await page.getByPlaceholder('How familiar is the').fill("");

    await page.getByRole('button', {name: 'Save'}).click();

    await showValidationMsg(page, validateMsg, ['instructorFamiliarityRequired'], true);
})