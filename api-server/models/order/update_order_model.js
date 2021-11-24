const db = require('../connection_db')
let getProductPrice = require('../utils/get_product_price')
let checkOrderExist = require('../utils/check_order_exist')
let checkOrderComplete = require('../utils/check_order_complete')

/** given a updateOrderList with an object{orderID: 1, memberID: 2, productID: "1, 2, 3", quantity: "4, 5, 6", updateDate: xxxxxxxx} */
module.exports = function updateOrder(updateOrderList) {
    let result = {}
    return new Promise( async (resolve, reject) => {
        
        //formating the data ==> productID = [1,2,3], orderQuantity = [4,5,6]
        let productID = (updateOrderList.productID).replace(/\s*/g,"").split(',').map(Number)
        let orderQuantity = (updateOrderList.quantity).replace(/\s*/g,"").split(',').map(Number)
        
        let orderExist = await checkOrderExist(updateOrderList.orderID, updateOrderList.memberID, productID[0])
        if(orderExist === false){
            result.status = "Update order fail."
            result.err = "Order is not exist."
            reject(result)
            return
        }

        let orderComplete = await checkOrderComplete(updateOrderList.orderID, updateOrderList.memberID, productID[0])
        if(orderComplete === false){
            result.status = "Update order fail."
            result.err = "The order is already completed. Generating the new order.."
            reject(result)
            return
        }

        for(let i = 0; i < productID.length; i++){
            const productPrice = await getProductPrice(productID[i])
            await db.query('UPDATE order_list SET order_quantity = ?, order_price = ?, update_date = ? WHERE order_id = ? AND member_id = ? AND product_id = ?',
                        [orderQuantity[i], orderQuantity[i]*productPrice, updateOrderList.updateDate, updateOrderList.orderID, updateOrderList.memberID, productID[i]], function(err, rows){
                            if(err){
                                console.log(err)
                                result.status = "Update order fail."
                                result.err = "Server error, please try again later."
                                reject(err)
                                return
                            }
                            result.status = "Update order successfully."
                            result.updateList = updateOrderList
                            resolve(result)
                        } )
        }
    })
}