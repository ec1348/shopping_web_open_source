const db = require('../connection_db')

module.exports = function getMemberOrder(orderID, memberID){
    result = {}
    return new Promise( (resolve, reject) => {
        db.query('SELECT * FROM order_list WHERE order_id = ? AND member_id = ?', [orderID, memberID], function(err, rows) {
            if(err){
                console.log(err)
                result.status = "Get order list fail."
                result.err = "Server error, please try again later."
                reject(result)
                return
            }
            resolve(rows)
        })
    })
}