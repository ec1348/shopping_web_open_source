const crypto = require('crypto')
module.exports = function cryptPassword(password){
    let hashPassword = crypto.createHash('sha1')
    hashPassword.update(password)
    const cryptedPassword = hashPassword.digest('hex')
    return cryptedPassword
}