const db = require('../connection_db')

/**Check if the order exist by given orderID, memberID. Return reject(false) if not, otherwise return resolve(true) if exists. */
module.exports = function checkOrder(orderID, memberID) {
    return new Promise( (resolve, reject ) => {
        db.query('SELECT * FROM order_list WHERE order_id = ? AND member_id = ?', [orderID, memberID], function( err, rows) {
            if(err){
                console.log(err)
                reject(err)
                return
            }
            if(rows[0] === undefined){
                console.log("Order is not exist.")
                reject(false)
                return
            }
            console.log("Order found !")
            resolve(true)
        })
    })
}