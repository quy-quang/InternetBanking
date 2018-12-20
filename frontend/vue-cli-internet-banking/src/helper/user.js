/* eslint-disable */
const API_GET_LIST_ACCOUNT = 'http://localhost:3000/userInformation/getAccountList'
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