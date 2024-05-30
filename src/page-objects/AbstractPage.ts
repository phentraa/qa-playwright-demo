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
}