const db = require('../connection_db')
module.exports = function getAllProducts() {
    let result = {}
    return new Promise( (resolve, reject ) => {
        db.query('SELECT * FROM product', (err, rows) => {
            if(err){
                console.log(err)
                result.statua = "Can not get the product data"
                result.err = "Server error, please try is again later"
                reject(result)
                return
            }
            resolve(rows)
        })
    })
}