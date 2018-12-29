/* eslint-disable */
import axios from 'axios'

//Hàm login
export function login (credentials) {
    return new Promise((resolve, reject) => {
        axios.post('http://localhost:3000/user/login', credentials)
            .then(response => {
                resolve(response.data)
            })
            .catch(error => {
                reject(error)
            })
    })
}
// Lấy data user từ Storrage
export function getLocalUser () {
    const userStr = localStorage.getItem('user')
    if (!userStr) {
        return null
    }
    return JSON.parse(userStr)
}
// Lấy data bankAccount từ Storrage
export function getLocalAccount () {
    const accountStr = localStorage.getItem('account')
    if (!accountStr) {
        return null
    }
    return JSON.parse(accountStr)
}

