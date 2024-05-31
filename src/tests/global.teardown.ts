import { expect, test as teardown } from '../fixtures'
import { TestUserHandler } from '../test-data/data'

teardown('Removing test users', async ({ request, apiBaseUrl }) => {
    const testUsers = new TestUserHandler().users
    
    for (const testUser of testUsers) {

        if(testUser.teardown === 'yes'){

            let response = await request.post(apiBaseUrl + '/users/login', {
                data: {
                    email: testUser.email,
                    password: testUser.password
                }
            })
    
            if (response.status() === 200) {
                const responseBody = await response.json()
                const authToken = responseBody.data.token
    
                response = await request.delete(apiBaseUrl + '/users/delete-account', {
                    headers: {
                        'x-auth-token': authToken
                    }
                })

                expect(response.ok()).toBeTruthy()
            }
        }
        
    }

})