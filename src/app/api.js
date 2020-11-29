import axios from 'axios'

const api = axios.create({
    baseURL: 'http://localhost:3001/api'
})

export default class Api {
    constructor(apiUrl) {
        this.apiUrl = apiUrl
    }

    post(url, object) {
        const request = `${this.apiUrl}${url}`
        return api.post(request, object)
    }

    persist(url, object, token) {
        const request = `${this.apiUrl}${url}`
        return api.post(request, object, {
            headers: {
                'Authorization': `bearer ${token.replace(/['"]+/g, '')}`
            }
        })
    }

    get(url, token) {
        const request = `${this.apiUrl}${url}`
        return api.get(request, {
            headers: {
                'Authorization': `bearer ${token.replace(/['"]+/g, '')}`
            }
        })
    }

    put(url, object, token) {
        const request = `${this.apiUrl}${url}`
        return api.patch(request, object, {
            headers: {
                'Authorization': `bearer ${token.replace(/['"]+/g, '')}`
            }
        })
    }

    delete(url, token) {
        const request = `${this.apiUrl}${url}`
        return api.delete(request, {
            headers: {
                'Authorization': `bearer ${token.replace(/['"]+/g, '')}`
            }
        })
    }

}