import {test, expect} from '@playwright/test';
import {
    initRoute,
    showValidationMsg,
    testCreateClassHelper
} from "../utils/TestDataHelper/testHelper";
import {validateMsg} from "../utils/TestDataHelper/validateMsg";

test.beforeEach(async ({page}) => {
    await initRoute(page);

    await page.route("http://localhost:8080/api/class", route => {
        route.fulfill({
            path: './e2e/utils/mockResponse/createdResponse/getEmptyClass.json',
        })
    })
});

test('should create class successfully with 1 day', async ({page}) => {
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

    await expect(page.getByText(validateMsg.success)).toBeVisible()
});

test('should create class successfully with 2 day', async ({page}) => {
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
        2,
        './e2e/utils/mockResponse/createdResponse/class2DayResponse.json'
    );

    await expect(page.getByText(validateMsg.success)).toBeVisible()
});

test('should create class successfully with class type = `LECTURE` and class format = `ONLINE`', async ({page}) => {
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

    await expect(page.getByText(validateMsg.success)).toBeVisible()
});

test('should create class successfully with class type = `WORKSHOP` and class format = `ONLINE`', async ({page}) => {
    await testCreateClassHelper(
        page,
        '1. Cybersecurity Essentials for the Digital World',
        'This lecture covers fundamental cybersecurity principles, common threats, and practical strategies to protect digital assets.',
        'IT professionals, students, and small business owners',
        'Basic knowledge of IT systems',
        "Workshop",
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

    await expect(page.getByText(validateMsg.success)).toBeVisible()
});

test('should create class successfully with class type = `DISCUSSION` and class format = `ONLINE`', async ({page}) => {
    await testCreateClassHelper(
        page,
        '1. Cybersecurity Essentials for the Digital World',
        'This lecture covers fundamental cybersecurity principles, common threats, and practical strategies to protect digital assets.',
        'IT professionals, students, and small business owners',
        'Basic knowledge of IT systems',
        "Discussion",
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

    await expect(page.getByText(validateMsg.success)).toBeVisible()
});

test('should create class successfully with class type = `LECTURE` and class format = `ON-SITE`', async ({page}) => {
    await testCreateClassHelper(
        page,
        '1. Cybersecurity Essentials for the Digital World',
        'This lecture covers fundamental cybersecurity principles, common threats, and practical strategies to protect digital assets.',
        'IT professionals, students, and small business owners',
        'Basic knowledge of IT systems',
        "Lecture",
        "On-site",
        '50',
        '08:00',
        '16:00',
        'testUser',
        'test@gmail.com',
        'SIT STUDENT',
        1,
        './e2e/utils/mockResponse/createdResponse/class1DayResponse.json'
    );

    await expect(page.getByText(validateMsg.success)).toBeVisible()
});

test('should create class successfully with class type = `WORKSHOP` and class format = `ON-SITE`', async ({page}) => {
    await testCreateClassHelper(
        page,
        '1. Cybersecurity Essentials for the Digital World',
        'This lecture covers fundamental cybersecurity principles, common threats, and practical strategies to protect digital assets.',
        'IT professionals, students, and small business owners',
        'Basic knowledge of IT systems',
        "Workshop",
        "On-site",
        '50',
        '08:00',
        '16:00',
        'testUser',
        'test@gmail.com',
        'SIT STUDENT',
        1,
        './e2e/utils/mockResponse/createdResponse/class1DayResponse.json'
    );

    await expect(page.getByText(validateMsg.success)).toBeVisible()
});

test('should create class successfully with class type = `DISCUSSION` and class format = `ON-SITE`', async ({page}) => {
    await testCreateClassHelper(
        page,
        '1. Cybersecurity Essentials for the Digital World',
        'This lecture covers fundamental cybersecurity principles, common threats, and practical strategies to protect digital assets.',
        'IT professionals, students, and small business owners',
        'Basic knowledge of IT systems',
        "Discussion",
        "On-site",
        '50',
        '08:00',
        '16:00',
        'testUser',
        'test@gmail.com',
        'SIT STUDENT',
        1,
        './e2e/utils/mockResponse/createdResponse/class1DayResponse.json'
    );

    await expect(page.getByText(validateMsg.success)).toBeVisible()
});

test('should create class successfully with class type = `LECTURE` and class format = `MIXED`', async ({page}) => {
    await testCreateClassHelper(
        page,
        '1. Cybersecurity Essentials for the Digital World',
        'This lecture covers fundamental cybersecurity principles, common threats, and practical strategies to protect digital assets.',
        'IT professionals, students, and small business owners',
        'Basic knowledge of IT systems',
        "Lecture",
        "Mixed",
        '50',
        '08:00',
        '16:00',
        'testUser',
        'test@gmail.com',
        'SIT STUDENT',
        1,
        './e2e/utils/mockResponse/createdResponse/class1DayResponse.json'
    );

    await expect(page.getByText(validateMsg.success)).toBeVisible()
});

test('should create class successfully with class type = `WORKSHOP` and class format = `MIXED`', async ({page}) => {
    await testCreateClassHelper(
        page,
        '1. Cybersecurity Essentials for the Digital World',
        'This lecture covers fundamental cybersecurity principles, common threats, and practical strategies to protect digital assets.',
        'IT professionals, students, and small business owners',
        'Basic knowledge of IT systems',
        "Workshop",
        "Mixed",
        '50',
        '08:00',
        '16:00',
        'testUser',
        'test@gmail.com',
        'SIT STUDENT',
        1,
        './e2e/utils/mockResponse/createdResponse/class1DayResponse.json'
    );

    await expect(page.getByText(validateMsg.success)).toBeVisible()
});

test('should create class successfully with class type = `DISCUSSION` and class format = `MIXED`', async ({page}) => {
    await testCreateClassHelper(
        page,
        '1. Cybersecurity Essentials for the Digital World',
        'This lecture covers fundamental cybersecurity principles, common threats, and practical strategies to protect digital assets.',
        'IT professionals, students, and small business owners',
        'Basic knowledge of IT systems',
        "Discussion",
        "Mixed",
        '50',
        '08:00',
        '16:00',
        'testUser',
        'test@gmail.com',
        'SIT STUDENT',
        1,
        './e2e/utils/mockResponse/createdResponse/class1DayResponse.json'
    );

    await expect(page.getByText(validateMsg.success)).toBeVisible()
});

// test(`should create a class with manual fill instructor information`, async ({page}) => {
//   // implement later when can mock user session
// })

test('should not create class with all fields empty.', async ({page}) => {
    await testCreateClassHelper(
        page,
        '',
        '',
        '',
        '',
        "",
        "",
        '',
        '',
        '',
        '',
        '',
        '',
        0,
        ''
    );

    await showValidationMsg(page, validateMsg, ['']);
});

test('should not create class with fill only title.', async ({page}) => {
    await testCreateClassHelper(
        page,
        '1. Cybersecurity Essentials for the Digital World',
        '',
        '',
        '',
        "",
        "",
        '',
        '',
        '',
        '',
        '',
        '',
        0,
        ''
    );

    await showValidationMsg(page, validateMsg, ['titleRequired']);
});

test('should not create class with fill only title and detail.', async ({page}) => {
    await testCreateClassHelper(
        page,
        '1. Cybersecurity Essentials for the Digital World',
        'This lecture covers fundamental cybersecurity principles, common threats, and practical strategies to protect digital assets.',
        '',
        '',
        "",
        "",
        '',
        '',
        '',
        '',
        '',
        '',
        0,
        ''
    );

    await showValidationMsg(page, validateMsg, ['titleRequired', 'detailRequired']);
});

test('should not create class with fill only title detail and target.', async ({page}) => {
    await testCreateClassHelper(
        page,
        '1. Cybersecurity Essentials for the Digital World',
        'This lecture covers fundamental cybersecurity principles, common threats, and practical strategies to protect digital assets.',
        'IT professionals, students, and small business owners',
        '',
        "",
        "",
        '',
        '',
        '',
        '',
        '',
        '',
        0,
        ''
    );

    await showValidationMsg(page, validateMsg, ['titleRequired', 'detailRequired', 'targetRequired']);
});

test('should not create class with fill only title detail target and prerequisites.', async ({page}) => {
    await testCreateClassHelper(
        page,
        '1. Cybersecurity Essentials for the Digital World',
        'This lecture covers fundamental cybersecurity principles, common threats, and practical strategies to protect digital assets.',
        'IT professionals, students, and small business owners',
        'Basic knowledge of IT systems',
        "",
        "",
        '',
        '',
        '',
        '',
        '',
        '',
        0,
        ''
    );

    await showValidationMsg(page, validateMsg, ['titleRequired', 'detailRequired', 'targetRequired']);
});

//user cannot create a class with fill only Class Title and Class Detail and Target audience and Prerequisites And Type
test('should not create class with fill only title detail target prerequisites and type.', async ({page}) => {
    await testCreateClassHelper(
        page,
        '1. Cybersecurity Essentials for the Digital World',
        'This lecture covers fundamental cybersecurity principles, common threats, and practical strategies to protect digital assets.',
        'IT professionals, students, and small business owners',
        'Basic knowledge of IT systems',
        "Lecture",
        '',
        '',
        '',
        '',
        '',
        '',
        '',
        0,
        ''
    );

    await showValidationMsg(page, validateMsg, ['titleRequired', 'detailRequired', 'targetRequired', "typeRequired"]);
});

//user cannot create a class with fill only Class Title and Class Detail and Target audience and Prerequisites And Type And Format
test('should not create class with fill only title detail target prerequisites type and format.', async ({page}) => {
    await testCreateClassHelper(
        page,
        '1. Cybersecurity Essentials for the Digital World',
        'This lecture covers fundamental cybersecurity principles, common threats, and practical strategies to protect digital assets.',
        'IT professionals, students, and small business owners',
        'Basic knowledge of IT systems',
        "Lecture",
        "Online",
        '',
        '',
        '',
        '',
        '',
        '',
        0,
        ''
    );

    await showValidationMsg(page, validateMsg, ['titleRequired', 'detailRequired', 'targetRequired', "typeRequired", "formatRequired"]);
})

//user cannot create a class with fill only Class Title and Class Detail and Target audience and Prerequisites And Type And Format and Available seats
test('should not create class with fill only title detail target prerequisites type format and available seats.', async ({page}) => {
    await testCreateClassHelper(
        page,
        '1. Cybersecurity Essentials for the Digital World',
        'This lecture covers fundamental cybersecurity principles, common threats, and practical strategies to protect digital assets.',
        'IT professionals, students, and small business owners',
        'Basic knowledge of IT systems',
        "Lecture",
        "Online",
        '50',
        '',
        '',
        '',
        '',
        '',
        0,
        ''
    );

    await showValidationMsg(page, validateMsg, ['titleRequired', 'detailRequired', 'targetRequired', "typeRequired", "formatRequired", "capacityRequired"]);
})

//user cannot create a class with fill only Class Title and Class Detail and Target audience and Prerequisites And Type And Format and Available seats and DateTime
test('should not create class with fill only title detail target prerequisites type format available seats and date time.', async ({page}) => {
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
        '16.00',
        '',
        '',
        '',
        1,
        ''
    );

    await showValidationMsg(page, validateMsg, ['titleRequired', 'detailRequired', 'targetRequired', "typeRequired", "formatRequired", "capacityRequired", "dateTimeRequired"]);
})

//user cannot create a class with fill only Class Title and Class Detail and Target audience and Prerequisites And Type And Format and Available seats and DateTime and Instructor Name
test('should not create class with fill only title detail target prerequisites type format available seats date time and instructor name.', async ({page}) => {
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
        '16.00',
        'testUser',
        '',
        '',
        1,
        ''
    );

    await showValidationMsg(page, validateMsg, ['titleRequired', 'detailRequired', 'targetRequired', "typeRequired", "formatRequired", "capacityRequired", "dateTimeRequired", "instructorNameRequired"]);
});

//user cannot create a class with fill only Class Title and Class Detail and Target audience and Prerequisites And Type And Format and Available seats and DateTime and Instructor Name and about Instructor
test('should not create class with fill only title detail target prerequisites type format available seats date time instructor name and about instructor.', async ({page}) => {
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
        '16.00',
        'testUser',
        'test@gmail.com',
        '',
        1,
        ''
    );

    await showValidationMsg(page, validateMsg, ['titleRequired', 'detailRequired', 'targetRequired', "typeRequired", "formatRequired", "capacityRequired", "dateTimeRequired", "instructorNameRequired", "instructorBioRequired"]);
})