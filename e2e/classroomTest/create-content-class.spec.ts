import {test, expect} from '@playwright/test';
import {
    fillContent,
    getOneOrTwoDayClassResponse,
    initRoute,
    testCreateClassHelper
} from "../utils/TestDataHelper/testHelper";

test.beforeEach(async ({page}) => {
    await initRoute(page);

    await page.route("http://localhost:8080/api/class/1", route => {
        if (route.request().method() === "GET") {
            route.fulfill({
                path: `./e2e/utils/mockResponse/createdResponse/classState3Response.json`,
            })
        }
    });
});

test('should be create content successfully', async ({page}) => {
    await page.goto('http://localhost:3000/class');

    await page.getByText("1. Cybersecurity Essentials for the Digital World").click();

    await fillContent(
        page,
        'Fundamentals of Cloud Computing',
        'Cloud computing delivers on-demand computing resources via the internet. It features scalability, elasticity, and resource pooling and is categorized into IaaS, PaaS, and SaaS.',
        'ice breaking',
        'Key Points: Define cloud computing, highlight its characteristics (on-demand, scalable, cost-efficient), and explain service models (IaaS, PaaS, SaaS).\nVisuals: Diagram comparing traditional IT vs. cloud computing, icons representing IaaS, PaaS, SaaS with examples (e.g., AWS EC2, Google App Engine, Microsoft Office 365).'
    );

    await page.route("http://localhost:8080/api/class/1/content", route => {
        route.fulfill({
            path: './e2e/utils/mockResponse/updatedResponse/updateClassContentResponse.json',
        })
    })

    await page.getByRole('button', {name: 'Save'}).click();

    await expect(page.getByText('Content has been saved')).toBeVisible()
})

test('should be create content successfully without fill activity guide and presentation guide', async ({page}) => {
    await page.goto('http://localhost:3000/class');

    await page.getByText("1. Cybersecurity Essentials for the Digital World").click();

    await fillContent(
        page,
        'Fundamentals of Cloud Computing',
        'Cloud computing delivers on-demand computing resources via the internet. It features scalability, elasticity, and resource pooling and is categorized into IaaS, PaaS, and SaaS.',
        null,
        null
    );

    await page.route("http://localhost:8080/api/class/1/content", route => {
        route.fulfill({
            path: './e2e/utils/mockResponse/updatedResponse/updateClassWithoutActivityAndPresentationGuideContentResponse.json',
        })
    })

    await page.getByRole('button', {name: 'Save'}).click();

    await expect(page.getByText('Content has been saved')).toBeVisible()
})

//need to validation content input fill