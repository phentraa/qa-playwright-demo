import { Page } from '@playwright/test'

export class AbstractPage {
    readonly page: Page

    constructor(page: Page) {
        this.page = page
    }

    async visit() {
        await this.page.goto('/')
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