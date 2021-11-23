const db = require('../connection_db')

module.exports = function getOrderID() {
    return new Promise( (resolve, reject) => {
        db.query('SELECT MAX(order_id) as id FROM order_list', (err, rows) => {
            if(err) {
                console.log(err)
                reject(err)
                return
            }
            resolve(rows[0].id)
        })
    })
}