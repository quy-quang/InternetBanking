/* eslint-disable */
import axios from 'axios'
export function login (credentials) {
    console.log(credentials)
    return new Promise((resolve, reject) => {
        axios.post('http://dev.api.com/login', credentials)
            .then(response => {
                resolve(response.data)
            })
            .catch(error => {
                reject(error)
            })
    })
}
export function getLocalUser () {
    const userStr = localStorage.getItem('user')
    if (!userStr) {
        return null
    }
    return JSON.parse(userStr)
}
