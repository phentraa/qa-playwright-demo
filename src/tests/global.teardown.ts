import { test as teardown } from '../fixtures'
import { TestUser } from '../test-data/data'

teardown('Removing test user', async({ request, apiBaseUrl }) => {
    console.log(`Removing ${TestUser.email} in teardown function`)

    let response = await request.post(apiBaseUrl+'/users/login', {
        data: {
            email: TestUser.email,
            password: TestUser.password
        }
    })

    if(response.status() === 200){
        const responseBody = await response.json()
        const authToken = responseBody.data.token

        response = await request.delete(apiBaseUrl+'/users/delete-account', {
            headers: {
                'x-auth-token': authToken
            }
        })

        if(response.ok()){
            console.log('User removed')
        }
        else{
            console.log('Could not delete user')
            console.log(await response.text())
        }
    }
    else{
        console.log(`Could not log in with ${TestUser.email}`)
        console.log(await response.text())
    }

})