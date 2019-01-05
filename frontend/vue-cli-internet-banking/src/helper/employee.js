/* eslint-disable */
const API_CHECK_USERNAME = 'http://localhost:3000/user/checkUsername'
const API_CREATE_USER = 'http://localhost:3000/user/createUser'
const API_CREATE_BANK_ACCOUNT = 'http://localhost:3000/user/createBankAccount'
import axios from 'axios'
export function checkUsername (credentials) {
    return new Promise((resolve, reject) => {
        axios.post(API_CHECK_USERNAME, credentials)
            .then(response => {
                resolve(response)
            })
            .catch(error => {
                reject(error)
            })
    })
}

export function createUser(credentials) {
    return new Promise((resolve, reject) => {
        axios.post(API_CREATE_USER, credentials)
            .then(response => {
                resolve(response)
            })
            .catch(error => {
                reject(error)
            })
    })
}

export function createBankAccount(credentials) {
    return new Promise((resolve, reject) => {
        axios.post(API_CREATE_BANK_ACCOUNT, credentials)
            .then(response => {
                resolve(response)
            })
            .catch(error => {
                reject(error)
            })
    })
}