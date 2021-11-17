const db = require('../connection_db')

module.exports = function login(memberData) {
    let result = {}
    return new Promise( (resolve, reject) => {
        db.query('SELECT * FROM member_info WHERE email = ?', 
                memberData.email,
                (err, rows) => {
                    if(err){
                        result.status = "login fail",
                        result.err = "Server error, please try again later",
                        reject(result)
                        return
                    }
                    if(Object.keys(rows).length === 0) {
                        result.status = "login fail",
                        result.err = "Email is not registered",
                        reject(result)
                        return
                    }
                    if(rows[0].password === memberData.password){
                        result.status = "login succeffully"
                        result.loginMember = rows
                        resolve(result)
                    }else{
                        result.status = "login fail",
                        result.err = "Please enter the correct password",
                        reject(result)
                        return
                    }
                })
    })
}