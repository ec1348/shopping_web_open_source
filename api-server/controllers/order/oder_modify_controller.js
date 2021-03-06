let onTime = require('../../utils/time')
let verify_token = require('../../service/verify_token')
let createOrderModel = require('../../models/order/new_order_model')
let getMemberOrderModel = require('../../models/order/get_personal_order_model')
let updateOrderModel = require('../../models/order/update_order_model')
let deleteOrderModel = require('../../models/order/delete_order_model')
let addProductToOrderModel = require('../../models/order/add_product_to_order_model')
let completeOrderModel = require('../../models/order/complete_order_model')

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
    getMemberOrder(req ,res, next) {
        const token = req.headers['token']
        verify_token(token).then(result => {
            const memberID = result.data
            getMemberOrderModel(memberID).then(result => {
                res.json({
                    result:result
                })
            }, err => {
                res.json({
                    result:err
                })
            })
        }, err => {
            res.json({
                result:err
            })
        })
    }
    updateOrder(req, res, next) {
        const token = req.headers['token']
        verify_token(token).then(result => {
            const memberID = result.data
            const updateOrderData = {
                orderID: req.body.orderID,
                memberID: memberID,
                productID: req.body.productID,
                quantity: req.body.quantity,
                updateDate: onTime()
            }
            updateOrderModel(updateOrderData).then(result => {
                res.json({
                    result:result
                })
            }, err => {
                res.json({
                    result:err
                })
            }
            )
        },err => {
            res.json({
                result:err
            })
        })
    }
    deleteOrder(req, res, next) {
        const token = req.headers['token']
        verify_token(token).then(result => {
            const memberID = result.data
            const deletOrderData = {
                orderID: req.body.orderID,
                memberID: memberID,
                productID: req.body.productID,
            }
            deleteOrderModel(deletOrderData).then(result => {
                res.json({
                    result:result
                })
            }, err => {
                res.json({
                    result:err
                })
            })
        },err => {
            res.json({
                result:err
            })
        })
    }
    addProductToOrder(req, res, next){
        const token = req.headers['token']
        verify_token(token).then(result => {
            const memberID = result.data
            const newProductToOrderData = {
                orderID: req.body.orderID,
                memberID: memberID,
                productID: req.body.productID,
                quantity: req.body.quantity,
                orderDate: onTime()
            }
            addProductToOrderModel(newProductToOrderData).then(result => {
                res.json({
                    result: result
                })
            }, err => {
                res.json({
                    result: err
                })
            })
        }, err => {
            res.json({
                result: err
            })
        })
    }
    completeOrder(req, res, next) {
        const token = req.headers['token']
        verify_token(token).then(result => {
            const memberID = result.data
            const completeOrderData = {
                orderID: req.body.orderID,
                memberID: memberID
            }
            completeOrderModel(completeOrderData).then(result => {
                res.json({
                    result: result
                })
            }, err => {
                res.json({
                    result: err
                })
            })
        }, err => {
            res.json({
                result: err
            })
        })
    }
}