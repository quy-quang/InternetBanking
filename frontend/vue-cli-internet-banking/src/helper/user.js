/* eslint-disable */
const API_GET_LIST_ACCOUNT = 'http://localhost:3000/user/getAccountList'
const API_GET_ACCOUNT_DETAIL = 'http://localhost:3000/user/getAccountDetail'
const API_GET_ACCOUNT_NAME = 'http://localhost:3000/getAccountName'
const API_GET_CONTACT_NAME = 'http://localhost:3000/getContactName'
const API_GET_ACCOUNT_HISTORY = 'http://localhost:3000/user/getHistory'
const API_CLOSE_ACCOUNT = 'http://localhost:3000/user/deleteAccount'
const API_TRANSFER_BALANCE = 'http://localhost:3000/user/transferBalance'
const API_TRANSFER_MONEY = 'http://localhost:3000/transaction'
const API_NEW_CONTACT = 'http://localhost:3000/user/newContact'
import axios from 'axios'
export function getListAccount (credentials) {
    return new Promise((resolve, reject) => {
        axios.post(API_GET_LIST_ACCOUNT, credentials)
            .then(response => {
                resolve(response.data)
            })
            .catch(error => {
                reject(error)
            })
    })
}

export function getAccountDetail(credentials) {
    return new Promise((resolve, reject) => {
        axios.post(API_GET_ACCOUNT_DETAIL, credentials)
            .then(response => {
                resolve(response.data)
            })
            .catch(error => {
                reject(error)
            })
    })
}

export function getAccountHistory(credentials) {
    return new Promise((resolve, reject) => {
        axios.post(API_GET_ACCOUNT_HISTORY, credentials)
            .then(response => {
                resolve(response.data)
            })
            .catch(error => {
                reject(error)
            })
    })
}

export function closeAccount(credentials) {
    return new Promise((resolve, reject) => {
        axios.post(API_CLOSE_ACCOUNT, credentials)
            .then(response => {
                resolve(response.data)
            })
            .catch(error => {
                reject(error)
            })
    })
}

export function transferBalance(credentials) {
    return new Promise((resolve, reject) => {
        axios.post(API_TRANSFER_BALANCE, credentials)
            .then(response => {
                resolve(response)
            })
            .catch(error => {
                reject(error)
            })
    })
}

export function getAccountName(credentials) {
    return new Promise((resolve, reject) => {
        axios.post(API_GET_ACCOUNT_NAME, credentials)
            .then(response => {
                resolve(response)
            })
            .catch(error => {
                reject(error)
            })
    })
}

export function getContactName(credentials) {
    return new Promise((resolve, reject) => {
        axios.post(API_GET_CONTACT_NAME, credentials)
            .then(response => {
                resolve(response)
            })
            .catch(error => {
                reject(error)
            })
    })
}

export function transferMoney(credentials) {
    return new Promise((resolve, reject) => {
        axios.post(API_TRANSFER_MONEY, credentials)
            .then(response => {
                resolve(response)
            })
            .catch(error => {
                reject(error)
            })
    })
}

export function newContact(credentials) {
    return new Promise((resolve, reject) => {
        axios.post(API_NEW_CONTACT, credentials)
            .then(response => {
                resolve(response)
            })
            .catch(error => {
                reject(error)
            })
    })
}
