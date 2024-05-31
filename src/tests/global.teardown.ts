import { expect, test as teardown } from '../fixtures'
import { TestUserHandler } from '../test-data/data'

teardown('Removing test users', async ({ request, apiBaseUrl }) => {
    const testUsers = new TestUserHandler().users
    
    for (const testUser of testUsers) {

        if(testUser.teardown === 'yes'){
            //console.log(`Removing ${testUser.email} in teardown function`)

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
    
                // if (response.ok()) {
                //     console.log('User removed')
                // }
                // else {
                //     console.log('Could not delete user')
                //     console.log(await response.text())
                // }
            }
            // else {
            //     console.log(`Could not log in with ${testUser.email}`)
            //     console.log(await response.text())
            // }
        }
        
    }

})