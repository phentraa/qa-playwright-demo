import fs from 'fs'
import path from 'path'
import { parse } from 'csv-parse/sync'
import { test, expect } from '../../fixtures'
import { allure } from 'allure-playwright'
import { TestUser } from '../../test-data/data'
import { HomePage, RegisterPage, LoginPage } from '../../page-objects/pages'

test.describe.only('Registration', () => {

    let homePage: HomePage
    let registerPage: RegisterPage

    test.beforeEach(async ({ page }) => {
        homePage = new HomePage(page)
        registerPage = new RegisterPage(page)

        await homePage.visit()
        await homePage.button.createAccount.click()
    })

    test.afterAll(async({}) => {
        //Removing registrated test user from the system
        console.log('REMOVE')
    })

    // Reading test data from CSV file for parametrized negative path test
    const records = parse(fs.readFileSync(path.join(__dirname, '../../test-data/registration_negative.csv')), {
        columns: true,
        skip_empty_lines: true
    })

    for (const record of records) {
        test(`Negative path - ${record.test_case}`, async () => {

            await registerPage.fillForm(record.email, record.user, record.password, record.passwordConfirm)
            await registerPage.submitRegistration()

            for (const error_message of record.expected_errors.split(';')) {
                const errorField = registerPage.getErrorByText(error_message)
                await expect(errorField).toBeVisible()
            }
        })
    }

    // Positive path after negative path test cases
    test('User can registrate with valid information', async () => {
        await registerPage.fillForm(TestUser.email, TestUser.name, TestUser.password, TestUser.password)
        await registerPage.submitRegistration()

        await expect(registerPage.successMessage).toBeVisible()
    })

    test('User can login to & logout from the new account', async ({ page, request, apiBaseUrl }) => {
        await registerPage.link.login.click()
        let loginPage = new LoginPage(page)

        await loginPage.login(TestUser.email, TestUser.password)

        const logoutButton = page.getByTestId('logout')
        await expect(logoutButton).toBeVisible()
        
        //const authToken = await loginPage.getAuthorizationToken()

        logoutButton.click()
        await expect(homePage.welcomeText).toBeVisible()

        // Removing test user from the system
        // console.log(`Removing ${TestUser.email} from the system`)
        // console.log(`Token: ${authToken}`)

        // const response = await request.delete(apiBaseUrl+'/users/delete-account', {
        //     headers: {
        //         'x-auth-token': authToken
        //     }
        // })
        // console.log(response.status()+' '+response.statusText())
        // console.log(await response.text())
        // expect(response.ok()).toBeTruthy()
    })

})
