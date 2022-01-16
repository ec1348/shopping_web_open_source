let toDB_newProduct = require('../../models/product/postNewProduct_models')
let onTime = require('../../utils/time')

module.exports = class ModifyProduct {
    addNewProduct(req, res, next) {
        const newProductData = {
            name: req.body.name,
            stock: req.body.stock,
            price: req.body.price,
            img_url: req.body.img_url,
            img_name: req.body.img_name,
            remark: req.body.short_intro,
            create_date: onTime()
        }        
        toDB_newProduct(newProductData)
            .then(
                result => {
                    res.json({
                        result:result
                    })
                },
                (err) =>{
                    res.json({
                        result: err
                    })
                }
            )
    }
}