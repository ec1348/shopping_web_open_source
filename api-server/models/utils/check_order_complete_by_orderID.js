const db = require('../connection_db')

/**check if the order is completed by given orderID? If yes return resolve(true), otherwise return resolve(false) */
module.exports = function checkOrderComplete(orderID) {
    return new Promise ( (resolve, reject) => {
        db.query('SELECT * FROM order_list WHERE order_id = ? AND is_complete = 0', orderID, function(err, row) {
            if(err){
                console.log(err)
                reject(false)
                return
            }
            if(row[0] === undefined){
                console.log("The order is already completed. Generating the new order.")
                resolve(false)
            }else{
                console.log("The order is not complete yet.")
                resolve(true)
            }
        })

    })
}