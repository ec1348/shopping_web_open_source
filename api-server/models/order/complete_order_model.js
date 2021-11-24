const db = require('../connection_db')
const transport = require('../connection_mail')
const config = require('../../config/development_config')
let checkOrderExist = require('../utils/check_order_exist_by_orderID_memberID')
let checkOrderComplete = require('../utils/check_order_complete_by_orderID')
let getOrderData = require('../utils/get_order_data')
let getMemberData = require('../utils/get_member_data')
let checkProductStock = require('../utils/check_product_stock')

module.exports = function completeOrder(completeOrderList){
    let result = {}
    return new Promise( async(resolve, reject) => {
        // check if order exist
        let orderExist = await checkOrderExist(completeOrderList.orderID, completeOrderList.memberID).catch(err => {return false})
        if(orderExist === false){
            result.status = "Complete the order fail."
            result.err = "Order does not exist."
            reject(result)
            return
        }
        // check if order complete
        let orderComplete = await checkOrderComplete(completeOrderList.orderID)
        if(orderComplete === false){
            result.status = "Complete the order fail."
            result.err = "The order is already completed."
            reject(result)
            return
        }
        // get the order data
        let orderData = await getOrderData(completeOrderList.orderID, completeOrderList.memberID)

        // check if order has enough stock
        for(let key in orderData){
            const checkStock = await checkProductStock(orderData[key].product_id,orderData[key].order_quantity)
            if(checkStock !== true){
                result.status = "Can not complete the order."
                result.err = checkStock
                reject(result)
                return
            }
        }

        //deduct product stock quantity from db
        await db.query('UPDATE product, order_list SET product.stock = product.stock-order_list.order_quantity WHERE product.id=order_list.product_id AND order_list.order_id = ?',completeOrderList.orderID, function(err, rows){
            if(err){
                console.log(err)
                result.status = "Complete the order fail."
                result.err = "Server error, please try again later."
                reject(result)
                return
            }
        })
        // make order complete, change is_complete value to 1
        await db.query('UPDATE order_list SET is_complete = 1 WHERE order_id = ?', completeOrderList.orderID, (err, rows) => {
            if( err ) {
                console.log(err)
                result.status = "Complete the order fail"
                result.err = "Server error, please try again later."
                reject(result)
                return
            }  
        })
        // send the confirm email
        const memberData = await getMemberData(completeOrderList.memberID)
        console.log(memberData)
        const email = memberData[0].email
        const name = memberData[0].name

        const mailOptions = {
            from: `"Test name cake store" <${config.senderMail.user}>`,
            to: email,
            subject: name + " [Your order has completed]",
            html: `<p>Hi, ${name} </p>` + `<br>` + `<br>` + `<span> Thanks for your order from <b>test name cake store</b>, we hope to serve you again soon! </span>`
        }

        transport.sendMail( mailOptions, ( err, info ) => {
            if( err ) {
                return console.log(err)
            }
            console.log("Message %s sent: %s", info.messageId, info.response)
        })
        result.status = "Order id: " + completeOrderList.orderID + " payment accomplished, thanks for using our service! Order detail will be send to " + email
        resolve(result)
    })
}