const db = require('../connection_db')

module.exports = function checkStock(productID, productQuantity) {
    return new Promise( (resolve ,reject) => {
        db.query('SELECT name, stock FROM product WHERE id = ?', productID, function(err, rows) {
            if(err){
                console.log(err)
                reject("Server error")
            }
            if(rows[0].stock >= productQuantity && rows[0].stock !== 0){
                resolve(true)
            }else{
                resolve(rows[0].name + " has no more stock! ! !")
            }
        })
    })
}