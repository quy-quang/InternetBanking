/* eslint-disable */
const API_CHECK_USERNAME = 'http://localhost:3000/user/checkUsername'
const API_CREATE_USER = 'http://localhost:3000/user/createUser'
const API_CREATE_BANK_ACCOUNT = 'http://localhost:3000/user/createBankAccount'
const API_CHECK_ACCOUNT_NUMBER = 'http://localhost:3000/user/checkBankAccount'
const API_ADD_FUND= 'http://localhost:3000/user/addFund'
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

export function checkAccount(credentials) {
    return new Promise((resolve, reject) => {
        axios.post(API_CHECK_ACCOUNT_NUMBER, credentials)
            .then(response => {
                resolve(response)
            })
            .catch(error => {
                reject(error)
            })
    })
}

export function addFund(credentials) {
    return new Promise((resolve, reject) => {
        axios.post(API_ADD_FUND, credentials)
            .then(response => {
                resolve(response)
            })
            .catch(error => {
                reject(error)
            })
    })
}