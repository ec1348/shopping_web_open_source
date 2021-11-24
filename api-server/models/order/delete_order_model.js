const db = require('../connection_db')
let checkOrderExist = require('../utils/check_order_exist')
let checkOrderComplete = require('../utils/check_order_complete')

module.exports = function deleteOrder(deleteOrderList) {
    let result = {}
    return new Promise( async (resolve, reject) => {
        //formating the data ==> productID = [1,2,3]
        let productID = (deleteOrderList.productID).replace(/\s*/g,"").split(',').map(Number)

        let orderExist = await checkOrderExist(deleteOrderList.orderID, deleteOrderList.memberID, productID[0])
        if(orderExist === false){
            result.status = "Delete order fail."
            result.err = "Order is not exist."
            reject(result)
            return
        }

        let orderComplete = await checkOrderComplete(deleteOrderList.orderID, deleteOrderList.memberID, productID[0])
        if(orderComplete === false){
            result.status = "Delete order fail."
            result.err = "The order is already completed. Can not delete the order.."
            reject(result)
            return
        }
        for(let i = 0; i < productID.length; i ++){
            db.query('DELETE FROM order_list WHERE order_id = ? AND member_id = ? AND product_id = ?',[deleteOrderList.orderID, deleteOrderList.memberID, productID[i]], function(err, rows) {
                if(err){
                    console.log(err)
                    result.status = "Delete the order fail."
                    result.err = "Server error, please try again later."
                    reject(err)
                    return
                }
                result.status = "Order has been deleted."
                result.deleteList = deleteOrderList
                resolve(result)
            })
        }
    })
}