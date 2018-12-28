/* eslint-disable */
const API_GET_LIST_ACCOUNT = 'http://localhost:3000/user/getAccountList'
const API_GET_ACCOUNT_DETAIL = 'http://localhost:3000/user/getAccountDetail'
import axios from 'axios'
export function getListAccount (credentials) {
    console.log(credentials)
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