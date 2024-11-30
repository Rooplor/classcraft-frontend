import {test, expect} from '@playwright/test';

test("should redirect to the login page when not login yet", async ({page}) => {
    await page.goto("http://localhost:3000/");

    await expect(page).toHaveURL("http://localhost:3000/login");
})

test("should redirect to the login page when not login yet and access /class", async ({page}) => {
    await page.goto("http://localhost:3000/class");

    await expect(page).toHaveURL("http://localhost:3000/login");
})

test("should redirect to class page when already login", async ({page}) => {
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
                    myClassroom: []
                },
                error: null
            })
        });
    });

    await page.goto("http://localhost:3000/");
    await expect(page).toHaveURL("http://localhost:3000/class");
})

