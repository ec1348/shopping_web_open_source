let jwt = require('jsonwebtoken')
let onTime = require('../../utils/time')
let verify_token = require('../../service/verify_token')
let createOrderModel = require('../../models/order/new_order_model')

module.exports = class ModifyOrder {
    createOrder(req, res, next) {
        const token = req.headers['token']
        verify_token(token).then(result => {
            const memberID = result.data
            const newOrderData = {
                memberID: memberID,
                productID: req.body.productID,
                quantity: req.body.quantity,
                orderDate: onTime()
            }
            createOrderModel(newOrderData).then(result => {
                res.json({
                    result:result
                })
            }, err => {
                res.json({
                    result:err
                })
            })
        })
    }
}