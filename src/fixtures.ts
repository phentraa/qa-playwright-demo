// This fixture helps me to declare a base url for API requests in the default config file that
// can be passed to the test functions as the baseUrl parameter on default.
// Based on article, 2024.05:
// https://playwrightsolutions.com/how-do-you-define-an-apiurl-along-with-the-baseurl-in-playwright/

import { test as base } from '@playwright/test'

export type TestOptions = {
    apiBaseUrl: string;
  };
  
// This will allow you to set apiURL in playwright.config.ts
export const test = base.extend<TestOptions>({
apiBaseUrl: ["", { option: true }],
});

export default test;
export { expect } from '@playwright/test'