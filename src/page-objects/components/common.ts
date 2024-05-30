import { Locator, Page } from '@playwright/test'

export class Menu {

    static Item = {
        Practice: 'Practice',
        Demos: 'Demos',
        Tools: 'Tools',
        About: 'About',
        Contact: 'Contact',
        Training: 'Training',
        AutomationTraining: 'Automation Training'
    }
    

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
            practice : navbar.getByLabel('SUT'),
            demos: navbar.getByRole('button', { name: 'Demos' }), 
            tools: navbar.getByRole('link', { name: 'Tools'}),
            about: navbar.getByRole('link', { name: 'About'}),
            contact: navbar.getByRole('link', { name: 'Contact'}),
            training: navbar.getByRole('link', { name: 'Automation Training'})
        }
    }

    // Functionality

    getMenuItemByText(item: string): Locator {
        switch( item ) {
            case Menu.Item.Practice:
                return this.items.practice;
            case Menu.Item.Demos:
                return this.items.demos;
            case Menu.Item.Tools:
                return this.items.tools;
            case Menu.Item.About:
                return this.items.about;
            case Menu.Item.Contact:
                return this.items.contact;
            case Menu.Item.AutomationTraining:
                return this.items.training;
            default:
                return this.items.practice;
        }
    }
}