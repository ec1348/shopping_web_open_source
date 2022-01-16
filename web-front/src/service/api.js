
import axios from 'axios'
const api = {
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },

    get: (url, params) => {
        return new Promise( (resolve, reject) => {
            axios.get(url, {
                params: params
            })
            .then( (response) => resolve(response.data))
            .catch( err => reject(err))
        })
    },

    post: (url, params, headers={}) => {
        return new Promise( (resolve, reject) => {
            axios.post(url, params, {headers})
            .then( (response) => resolve(response))
            .catch( err => reject(err))
        })
    },

    put: (url, params, headers={}) => {
        return new Promise( (resolve, reject) => {
            axios.put(url, params, {headers})
            .then( (response) => resolve(response.data))
            .catch( err => reject(err))
        })
    },

    delete: (url, params) => {
        return new Promise( (resolve, reject) => {
            axios.delete(url, params)
            .then( (response) => resolve(response.data))
            .catch( err => reject(err))
        })
    }
}

export default api