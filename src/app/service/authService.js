import Api from '../api'

export default class AuthService extends Api {
    constructor() {
        super('/auth')
    }

    signin(credentials) {
        return this.post('/signin', credentials)
    }

    signup(credentials) {
        console.log(credentials)
        return this.post('/signup', credentials)
    }

}