const jwt = require('jsonwebtoken')
const config = require('../config/development_config')

module.exports = function verifyToken(token){
    let verifyResult = {}
    const time = Math.floor(Date.now() / 1000)
    return new Promise( (resolve, reject) => {
        if(token){
            jwt.verify(token, config.secret, (err, decoded) => {
                if (err) {
                    verifyResult.status = false
                    verifyResult.err = "Server error, please try again"
                    reject(verifyResult)
                    return
                }
                if (decoded.exp <= time) {
                    verifyResult.status = false
                    verifyResult.err = "Token has expired, plear login again"
                    reject(verifyResult)
                    return                   
                }
                verifyResult.status = "Token correct"
                verifyResult.data = decoded.data
                resolve(verifyResult)
            })
        }
    })
}