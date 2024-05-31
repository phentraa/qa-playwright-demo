import { test, expect } from '../../fixtures'
import { allure } from 'allure-playwright'
import { TestUserHandler, readFromCSV } from '../../test-data/data'
import { HomePage, RegisterPage, LoginPage } from '../../page-objects/pages'

test.describe('Registration', () => {

    let homePage: HomePage
    let registerPage: RegisterPage

    test.beforeEach(async ({ page }) => {
        homePage = new HomePage(page)
        registerPage = new RegisterPage(page)

        await homePage.visit()
        await homePage.button.createAccount.click()
    })

    // Reading test data from CSV file for parametrized negative path test
    // const records = parse(fs.readFileSync(path.join(__dirname, '../../test-data/registration_negative.csv')), {
    //     columns: true,
    //     skip_empty_lines: true
    // })

    const records = readFromCSV('registration_negative.csv')

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
    test('User registration and first login process', async ({ page }) => {

        const testUser = new TestUserHandler().getUserByRole('registration')

        // Step 1 - Registration
        await registerPage.fillForm(testUser.email, testUser.name, testUser.password, testUser.password)
        await registerPage.submitRegistration()

        await expect(registerPage.successMessage).toBeVisible()

        // Step 2 - Login
        await registerPage.link.login.click()
        let loginPage = new LoginPage(page)
        await loginPage.login(testUser.email, testUser.password)
        
        const logoutButton = page.getByTestId('logout')
        await expect(logoutButton).toBeVisible()

        // Step 3 - Logout

        await logoutButton.click()
        await expect(homePage.welcomeText).toBeVisible()

    })

})
