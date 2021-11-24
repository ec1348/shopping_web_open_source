const db = require('../connection_db')

module.exports = function getMemberOrder(memberID){
    result = {}
    return new Promise( (resolve, reject) => {
        db.query('SELECT * FROM member_info WHERE id = ?', memberID, function(err, rows) {
            if(err){
                console.log(err)
                result.status = "Get member data fail."
                result.err = "Server error, please try again later."
                reject(result)
                return
            }
            resolve(rows)
        })
    })
}