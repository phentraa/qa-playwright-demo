import { Locator, Page } from '@playwright/test'
import { AbstractPage } from './AbstractPage'

export class RegisterPage extends AbstractPage {

    // Selector definitions
    readonly registrationForm: Locator
    readonly button: {
        register: Locator,
        registerWithGoole: Locator,
        registerWithLinkedIn: Locator
    }

    readonly link: {
        login: Locator
    }

    readonly input: {
        email: Locator,
        name: Locator,
        password: Locator,
        passwordConfirm: Locator
    }

    readonly successMessage: Locator

    // Initialization
    constructor(page: Page) {
        super(page)

        this.registrationForm = page.getByTestId('login-form')

        this.input = {
            email: this.registrationForm.getByTestId('register-email'),
            name: this.registrationForm.getByTestId('register-name'),
            password: this.registrationForm.getByTestId('register-password'),
            passwordConfirm: this.registrationForm.getByTestId('register-confirm-password')
        }
        
        this.button = {
            register: this.registrationForm.getByTestId('register-submit'),
            registerWithGoole: this.registrationForm.getByTestId('login-with-google'),
            registerWithLinkedIn: this.registrationForm.getByTestId('login-with-linkedin')
        }

        this.link = {
            login: page.getByTestId('login-view')
        }

        this.successMessage = this.page.getByText('User account created successfully')
    }

    // Page methods

    async clearForm() {
        await this.registrationForm.clear()
    }

    async fillForm(email: string, name: string, password: string, passwordConfirm: string) {
        await this.input.email.fill(email)
        await this.input.name.fill(name)
        await this.input.password.fill(password)
        await this.input.passwordConfirm.fill(passwordConfirm)
    }

    async submitRegistration() {
        await this.button.register.click()
    }

    getErrorByText(error: string): Locator {
        // I am using RegExp for exact matching
        return this.registrationForm.locator('.invalid-feedback').filter({hasText: new RegExp(`^${error}$`)})
    }
}