import { Locator, Page } from '@playwright/test'
import { AbstractPage } from './AbstractPage'

export class LoginPage extends AbstractPage {

    // Selector definitions

    readonly input: {
        email: Locator,
        password: Locator
    }

    readonly button: {
        login: Locator,
        loginWithGoogle: Locator,
        loginWithLinkedIn: Locator
    }

    readonly link: {
        forgotPassword: Locator,
        register: Locator
    }

    readonly alertMessage: Locator

    // Initialization
    constructor(page: Page) {
        super(page)

        this.input = {
            email: this.page.getByTestId('login-email'),
            password: this.page.getByTestId('login-password')
        }

        this.button = {
            login: this.page.getByTestId('login-submit'),
            loginWithGoogle: this.page.getByTestId('login-with-google'),
            loginWithLinkedIn: this.page.getByTestId('login-with-linkedin')
        }

        this.link = {
            forgotPassword: this.page.getByRole('link', { name: 'Forgot password' }),
            register: this.page.getByRole('link', { name: 'Create a free account!' }),
        }

        this.alertMessage = this.page.getByTestId('alert-message')
    }

    // Page methods
    async login(email: string, password: string) {
        await this.input.email.fill(email)
        await this.input.password.fill(password)
        await this.button.login.click()
    }

    getErrorByText(error: string): Locator {
        // I am using RegExp for exact matching
        const invalidFeedback = this.page.locator('.invalid-feedback').filter({hasText: new RegExp(`^${error}$`)})
        const generalError = this.page.getByText(new RegExp(`^${error}$`))
        
        return invalidFeedback.or(generalError)
    }

}