const db = require('../connection_db')

module.exports = function update(memberData, member_id){
    result = {}
    return new Promise( (resolve, reject ) => {
        db.query("UPDATE member_info SET ? WHERE id = ?", [memberData, member_id],
                (err , rows) => {
                    if(err){
                        result.status = "Update data fail"
                        result.err = "Server error, pleas try again later"
                        reject(err)
                        return
                    }
                    result.status = "Update data successfully"
                    result.memberDataUpdate = memberData
                    resolve(result)
                }
        )
    })
}