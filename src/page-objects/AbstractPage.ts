import { Page } from '@playwright/test'
import { Menu } from './components/common'

export class AbstractPage {
    readonly page: Page
    readonly menubar: Menu

    constructor(page: Page) {
        this.page = page
        this.menubar = new Menu(page)
    }

    async visit() {
        await this.page.goto('')
    }

    async open(subpage_url: string) {
        await this.page.goto(subpage_url)
    }

    async screenshot() {
        await this.page.screenshot()
    }

    async wait(second: number) {
        await this.page.waitForTimeout(second)
    }

    async getAuthorizationToken(): Promise<string>{
        const cookies = await this.page.context().cookies()
        const token = cookies.find(cookie => cookie.name === 'token' )
        if(token){
            return token.value
        }

        const tokenFromLocalStorage = await this.page.evaluate(() => localStorage.getItem('token'))
        if(tokenFromLocalStorage) {
            return tokenFromLocalStorage
        }

        return 'Could not find token'
        
    }
}