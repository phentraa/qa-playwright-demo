import { test, expect } from '../../fixtures'
import { TestUserHandler } from '../../test-data/data'

let testUser = new TestUserHandler().getUserByRole('login')

test.describe('Health-check @API', () => {

    test('Application is available', async({request, apiBaseUrl}) => {
        const response = await request.get(apiBaseUrl+'/health-check')
        expect(response.ok()).toBeTruthy()

        const data = await response.json()
        expect(data.message).toBe('Notes API is Running')
    })

})

test.describe('Authenticated user checks @API', () => {

    let authToken: string
    
    test.beforeAll( async({ request, apiBaseUrl }) => {

        const response = await request.post(apiBaseUrl+'/users/login', { 
            data: {
                email: testUser.email,
                password: testUser.password
            }
        })

        expect(response.ok()).toBeTruthy()

        const response_body = await response.json()
        authToken = response_body.data.token
    })

    test('Retrieving all notes (API)', async({ request, apiBaseUrl })=>{
        const response = await request.get(apiBaseUrl+'/notes', {
            headers: {
                'x-auth-token': authToken
            }
        })

        expect(response.ok()).toBeTruthy()
    })
})