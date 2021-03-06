/* eslint-disable */
import axios from 'axios'

//Hàm login
export function login (credentials) {
    return new Promise((resolve, reject) => {
        axios.post('http://localhost:3000/login', credentials)
            .then(response => {
                resolve(response)
            })
            .catch(error => {
                reject(error)
            })
    })
}

export function getToken (credentials) {
    return new Promise((resolve, reject) => {
        axios.post('http://localhost:3000/getAccessTokenFromRefreshToken', credentials)
            .then(response => {
                resolve(response)
            })
            .catch(error => {
                reject(error)
            })
    })
}

export function verifyCaptcha (credentials) {
    return new Promise((resolve, reject) => {
        axios.post('http://localhost:3000/verifyCaptcha', credentials)
            .then(response => {
                resolve(response)
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

