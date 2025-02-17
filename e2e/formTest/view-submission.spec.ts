import {test, expect} from '@playwright/test';
import {initRoute} from "../utils/TestDataHelper/testHelper";

test.beforeEach(async ({page}) => {
    await initRoute(page);

    await page.route("http://localhost:8080/api/form/submissions?userId=2&formId=1", route => {
        route.fulfill({
            path: './e2e/utils/mockResponse/formResponse/submissionResponse.json',
        })
    })

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

    await page.route("http://localhost:8080/api/form/user/1", route => {
        route.fulfill({
            path: './e2e/utils/mockResponse/formResponse/submissionResponse.json',
        })
    })
});

test('should can view submission', async ({page}) => {
    await page.route("http://localhost:8080/api/class", route => {
        route.fulfill({
            path: './e2e/utils/mockResponse/createdResponse/anotherClassResponse.json',
        })
    })

    await page.goto('http://localhost:3000/class');
    await page.getByRole('link', { name: ' 1. Cybersecurity Essentials' }).click();
    await expect(page.getByText('View my submission')).toBeVisible();
    await page.getByText('View my submission').click();
    await expect(page.getByText('What is your department?')).toBeVisible();
});

test('user can get all submission in classroom', async ({page}) => {
    await page.route('http://localhost:8080/api/user/profile', route => {
        route.fulfill({
            status: 200,
            contentType: 'application/json',
            body: JSON.stringify({
                success: true,
                result: {
                    id: "1",
                    username: "John Doe",
                    email: "JohnDoe@gmail.com",
                    profilePicture: "www.example.com",
                    myClassroom: ["1"]
                },
                error: null
            })
        });
    });

    await page.route("http://localhost:8080/api/form/1/questions", route => {
        route.fulfill({
            path: './e2e/utils/mockResponse/formResponse/questionResponse.json',
        })
    });

    await page.route("http://localhost:8080/api/form/submissions/1", route => {
        route.fulfill({
            path: './e2e/utils/mockResponse/formResponse/submissionAllResponse.json',
        })
    });

    await page.goto("http://localhost:3000/class/1/edit");
    await expect(page.getByRole('tab', { name: 'Prepare for registration' })).toBeVisible();
    await page.getByRole('tab', { name: 'Prepare for registration' }).click();

    await page.getByText('View Submissions').click();
    await expect(page.getByText('What is your department?')).toBeVisible();
    await expect(page.getByText('Natdanai Nitipan')).toBeVisible();
});