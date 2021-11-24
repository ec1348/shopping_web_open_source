const db = require('../connection_db')
let getProductPrice = require('../utils/get_product_price')
let checkOrderExist = require('../utils/check_order_exist')
let checkOrderComplete = require('../utils/check_order_complete_by_orderID')


/** given a addProductToOrderList with an object{orderID: 1, memberID: 2, productID: "1, 2, 3", quantity: "4, 5, 6", orderDate: xxxxxxxx} */
module.exports = function addProductToOrder(addProductToOrderList) {
    let result = {}
    return new Promise( async (resolve, reject) => {
        //formating the data ==> productID = [1,2,3], orderQuantity = [4,5,6]
        let productID = (addProductToOrderList.productID).replace(/\s*/g,"").split(',').map(Number)
        let orderQuantity = (addProductToOrderList.quantity).replace(/\s*/g,"").split(',').map(Number)
        
        let orderExist = await checkOrderExist(addProductToOrderList.orderID, addProductToOrderList.memberID, productID[0]).catch(err => {return false})
        if(orderExist === true){
            result.status = "Add new product to order fail."
            result.err = "Order exists."
            reject(result)
            return
        }
    
        let orderComplete = await checkOrderComplete(addProductToOrderList.orderID)
        if(orderComplete === false){
            result.status = "Add new product to order fail."
            result.err = "The order is already completed. Generating the new order.."
            reject(result)
            return
        }
        for(let i = 0; i < productID.length; i++){
            const productPrice = await getProductPrice(productID[i])
            const newProductToOrderList = {
                order_id: addProductToOrderList.orderID,
                member_id: addProductToOrderList.memberID,
                product_id: productID[i],
                order_quantity: orderQuantity[i],
                order_price: orderQuantity[i]*productPrice,
                is_complete: 0,
                create_date: addProductToOrderList.orderDate
            }
            db.query('INSERT INTO order_list SET ?', newProductToOrderList, function(err, rows) {
                if(err){
                    console.log(err)
                    result.status = "Add new product to order fail."
                    result.err = "Server error, please try again later."
                    reject(result)
                    return
                }
                result.status = "Add new product to order successfully."
                result.newProductToOrderList = newProductToOrderList
                resolve(result)
            })
        }

    })
}