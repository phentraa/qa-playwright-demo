import { Locator, Page } from '@playwright/test'
import { AbstractPage } from './AbstractPage'
import { Menu } from './components/common'

export class HomePage extends AbstractPage {
    
    readonly menubar: Menu

    // Selector definitions
    readonly welcomeText: Locator
    readonly button: {
        login: Locator,
        createAccount: Locator
    }

    readonly link: {
        googleAccount: Locator,
        forgotPassword: Locator
    }


    // Initialization
    constructor(page: Page) {
        super(page)

        this.menubar = new Menu(page)

        this.welcomeText = this.page.getByRole('heading', {name: 'Welcome to Notes App'})
        this.button = {
            login: this.page.getByRole('link', { name: 'Login'} ),
            createAccount: this.page.getByTestId('open-register-view')
        }

        this.link = {
            googleAccount: this.page.getByTestId('use-google-account'),
            forgotPassword: this.page.getByTestId('forgot-password-view'),
        }
    }

    // Page methods
}