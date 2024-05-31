import fs from 'fs'
import path from 'path'
import { parse } from 'csv-parse/sync'


export function readFromCSV(filename: string) {

    const records = parse(fs.readFileSync(path.join(__dirname, filename)),{
        columns: true,
        skip_empty_lines: true
    })

    return records
}

export type TestUser = {
    name: string, 
    email: string, 
    password: string,
    role: string,
    setup: string,
    teardown: string
}

export class TestUserHandler {

    readonly users: Array<TestUser>
    
    constructor(){

        this.users = []
        
        const users = readFromCSV('test_users.csv')
        for(const user of users) {
            this.addUser({
                name: user.name,
                email: user.email,
                password: user.password,
                role: user.role,
                setup: user.setup,
                teardown: user.teardown
            })
        }
    }

    addUser(user: TestUser) {
        this.users.push(user)
    }

    getUserByRole(role: string): TestUser {
        let result = this.users.find(user => user.role === role)
        if(typeof(result) === undefined){
            result = {
                name: 'Dummy User',
                email: 'dummy@abcdefgh.com',
                password: '123456789',
                role: 'joker',
                setup: 'yes',
                teardown: 'yes'
            }
        }

        return result as TestUser
    }
}