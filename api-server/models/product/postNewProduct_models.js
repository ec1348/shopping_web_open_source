const db = require('../connection_db')
module.exports = function postNewProduct(newProductData){
    let result = {}
    return new Promise( (resolve, reject) => {
        db.query('INSERT INTO product SET ?', 
            newProductData,
            (err, row)=> {
                if(err){
                    console.log(err)
                    result.status = "Add new product fail."
                    result.err = "Server error, please try again later."
                    reject(result)
                    return
                }
                result.status = "Add new product successfully"
                result.newProductData = newProductData
                resolve(result)
            })
    })

}