import process from 'process'
import { test, expect } from '../../fixtures'
import { APIRequestContext } from '@playwright/test'

test.describe('Health-check', () => {

    test('Application is available', async({request, apiBaseUrl}) => {
        const response = await request.get(apiBaseUrl+'/health-check')
        expect(response.ok()).toBeTruthy()

        const data = await response.json()
        expect(data.message).toBe('Notes API is Running')
    })

})

test.describe('Authenticated user checks', () => {

    let apiContext: APIRequestContext
    
    test.beforeAll( async({ playwright, request, apiBaseUrl }) => {
        const response = await request.post(apiBaseUrl+'/users/login', 
        { 
            data: {
                email: process.env.TEST_USER_EMAIL,
                password: process.env.TEST_USER_PASSWORD
            }
        })

        expect(response.ok()).toBeTruthy()

        const response_body = await response.json()

        apiContext = await playwright.request.newContext({
            baseURL: apiBaseUrl,
            extraHTTPHeaders: {
                'x-auth-token': response_body.data.token
            }
        })

    })

    test.afterAll( async({})=> {
        await apiContext.dispose()
    })

    test('Retrieve all notes', async({})=>{
        const response = await apiContext.get('/notes')

        expect(response.ok()).toBeTruthy()
    })
})