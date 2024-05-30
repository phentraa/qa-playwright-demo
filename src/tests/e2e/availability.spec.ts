import { test, expect } from '@playwright/test'
import { allure } from 'allure-playwright'
import { HomePage, Menu } from '../../page-objects/pages'


test.describe('Availability', () => {

    let homePage: HomePage

    test.beforeEach(async ({ page }) => {
        homePage = new HomePage(page)
        await homePage.visit()
    })

    // PARAMETRIZED TEST
    let expectedMenuItems = [
        {text: Menu.Item.Practice, expected_href:'/'},
        {text: Menu.Item.Demos, expected_href:'/#examples'},
        {text: Menu.Item.Tools, expected_href:'/#tools'},
        {text: Menu.Item.About, expected_href:'/about'},
        {text: Menu.Item.Contact, expected_href:'/contact'},
        {text: Menu.Item.AutomationTraining, expected_href:'https://expandtesting.com/formations/'}
    ]
    for (const menu_item of expectedMenuItems) {
        test(`Checking link on navigation bar: ${menu_item.text}`, async () => {
            await allure.description('This test pass if all menu elements are present on the page and each of them contains the correct url endpoint.')
            await allure.id('AVAILABILITY-TC-1')
            await allure.owner('Kovács Péter')
            await allure.link('https://www.mytestmanagementtool.com/testcases/1', 'Link for TC1')
            await allure.parameter("navbar element", menu_item.text)
            
            const element = homePage.menubar.getMenuItemByText(menu_item.text)

            await expect(element).toBeVisible()
            expect(await element.getAttribute('href')).toBe(menu_item.expected_href)
        });
    }

    test('All interactive elements are present on the page', async () => {
        // Detailed information about the test for reporting
        await allure.description('This test ensures that all interactive elements are present on the page')
        await allure.id('AVAILABILITY-TC-2')
        await allure.owner('Kovács Péter')
        await allure.link('https://www.mytestmanagementtool.com/testcases/2', 'Link for TC2')

        // Test flow & assertions
        await expect(homePage.welcomeText).toBeVisible()
        await expect(homePage.button.login).toBeVisible()
        await expect(homePage.button.createAccount).toBeVisible()
        await expect(homePage.link.googleAccount).toBeVisible()
        await expect(homePage.link.forgotPassword).toBeVisible()  
    })

})