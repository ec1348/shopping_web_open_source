const db = require('../connection_db')

module.exports = function register(memberData) {
    let result = {}
    return new Promise( (resolve, reject) => {
        db.query('SELECT email FROM member_info WHERE email = ?',
                memberData.email,
                (err, rows) => {
                    if(err){
                        console.log(err)
                        result.status = "Register fail"
                        result.err = "Server error, try again later"
                        reject(result)
                        return
                    }
                    if(rows.length > 0){
                        result.status = "Register fail"
                        result.err = "The email address has registered."
                        reject(result)
                        return
                    } else {
                        db.query('INSERT INTO member_info SET ?', 
                                memberData, 
                                (err, rows) => {
                                    if(err){
                                        console.log(err)
                                        result.status = "Register fail"
                                        result.err = "Server error, try again later"
                                        reject(result)
                                        return
                                    }
                                    result.status = "Register successfully"
                                    result.RegisterMember = memberData
                                    resolve(result)
                                }
                                )
                        
                    }
                }
                )
    })
}