import { test, expect } from '../../fixtures'
import { allure } from 'allure-playwright'
import { TestUserHandler, readFromCSV } from '../../test-data/data'
import { HomePage, LoginPage } from '../../page-objects/pages'


test.describe('Login', () => {
    let homePage: HomePage
    let loginPage: LoginPage
    const testUser = new TestUserHandler().getUserByRole('login')

    test.beforeEach(async ({ page }) => {
        homePage = new HomePage(page)
        loginPage = new LoginPage(page)

        await homePage.visit()
        await homePage.button.login.click()
    })

    // Reading test data from CSV file for parametrized negative path test
    const records = readFromCSV('login_negative.csv')

    for(const record of records) {
        test(`Negative path - ${record.test_case}`, async () => {
            let email = record.email as string
            if((email).includes('$')){
                email = email.replace('$', testUser.email)
            }

            let password = record.password as string
            if((password).includes('$')){
                password = password.replace('$', testUser.password)
            }

            await loginPage.login(email, password)

            for(const error_message of record.expected_errors.split(';')) {
                const errorField = loginPage.getErrorByText(error_message)
                await expect(errorField).toBeVisible()
            }
        })
    }

    test('Positive path', async ({ page }) => {
        await loginPage.login(testUser.email, testUser.password)

        const logoutButton = page.getByTestId('logout')
        await expect(logoutButton).toBeVisible()

        await logoutButton.click()
        await expect(homePage.welcomeText).toBeVisible()
    })
    
})