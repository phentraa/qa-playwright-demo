import { expect, test as setup } from '../fixtures'
import { TestUserHandler } from '../test-data/data'

setup('Registrating test users', async ({ request, apiBaseUrl }) => {

    const testUserHandler = new TestUserHandler()

    for(const user of testUserHandler.users){
        if(user.setup === 'yes'){

            const response = await request.post(apiBaseUrl+'/users/register', {
                data: {
                    name: user.name,
                    email: user.email,
                    password: user.password
                }
            })
            
            expect(response.ok()).toBeTruthy()
        }
    }
})