import { Locator, Page } from '@playwright/test'

export class Menu {

    // Selector definitions
    readonly items: {
        practice:  Locator, 
        demos: Locator,
        tools: Locator,
        about: Locator,
        contact: Locator,
        training: Locator
    }

    // Initialization
    constructor(page: Page) {

        const navbar = page.getByRole('navigation')
        this.items = {
            // practice : navbar.getByRole('link', { name: 'Practice'}),
            practice : navbar.getByText('Practice'),
            demos: navbar.getByRole('button', { name: 'Demos' }), 
            tools: navbar.getByRole('link', { name: 'Tools'}),
            about: navbar.getByRole('link', { name: 'About'}),
            contact: navbar.getByRole('link', { name: 'Contact'}),
            training: navbar.getByRole('link', { name: 'Automation Training'})
        }
    }

    // Functionality

    getMenuItemByName(name: string): Locator {
        switch( name ) {
            case 'Practice':
                return this.items.practice;
            case 'Demos':
                return this.items.demos;
            case 'Tools':
                return this.items.tools;
            case 'About':
                return this.items.about;
            case 'Contact':
                return this.items.contact;
            case 'Automation Training':
                return this.items.training;
            default:
                return this.items.practice;
        }
    }
}