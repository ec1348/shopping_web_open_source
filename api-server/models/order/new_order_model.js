const db = require('../connection_db')
let getOrderID  = require('../utils/get_order_list_max_id')
let getProductPrice = require('../utils/get_product_price')

/** given a newOrderList with an object{memberID: 2, productID: "1, 2, 3", quantity: "4, 5, 6", orderDate: xxxxxxxx} */
module.exports = function newOrder(newOrderList) {
    let result = {}
    return new Promise( async (resolve, reject) => {
        let orderID = await getOrderID() +1
        
        //formating the data ==> productID = [1,2,3], orderQuantity = [4,5,6]
        let productID = (newOrderList.productID).replace(/\s*/g,"").split(',').map(Number)
        let orderQuantity = (newOrderList.quantity).replace(/\s*/g,"").split(',').map(Number)

        for(let i = 0; i < productID.length; i ++) {
            const productPrice = await getProductPrice(productID[i])
            const orderData = {
                order_id: orderID,
                member_id: newOrderList.memberID,
                product_id: productID[i],
                order_quantity: orderQuantity[i],
                order_price: orderQuantity[i]*productPrice,
                is_complete: 0,
                create_date: newOrderList.orderDate
            }
            // console.log(orderData)
            db.query('INSERT INTO order_list SET ?', orderData, function(err, rows){
                if(err){
                    console.log(err)
                    result.status = "Create order fail."
                    result.err = "Server error, please try again later."
                    reject(result)
                    return
                }
                result.status = "Create order successfully."
                resolve(result)
            })
        }
    })
} 