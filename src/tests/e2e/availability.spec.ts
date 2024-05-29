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
        {text: 'Practice', expected_href:'/'},
        {text: 'Demos', expected_href:'/#examples'},
        {text: 'Tools', expected_href:'/#tools'},
        {text: 'About', expected_href:'/about'},
        {text: 'Contact', expected_href:'/contact'},
        {text: 'Automation Training', expected_href:'https://expandtesting.com/formations/'}
    ]
    for (const menu_item of expectedMenuItems) {
        test(`Checking link on navigation bar: ${menu_item.text}`, async ({ page }) => {
            await allure.description('This test pass if all menu elements are present on the page and each of them contains the correct url endpoint.')
            await allure.id('AVAILABILITY-TC-1')
            await allure.owner('Kovács Péter')
            await allure.link('https://www.mytestmanagementtool.com/testcases/1', 'Link for TC1')
            await allure.parameter("navbar element", menu_item.text);

            const element = homePage.menubar.getMenuItemByName(menu_item.text)

            await expect(element).toBeVisible()
            expect(await element.getAttribute('href')).toBe(menu_item.expected_href)
        });
    }

    test('All interactive elements are present on the page', async ({ page }) => {
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