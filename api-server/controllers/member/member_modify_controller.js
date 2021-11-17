// receive, prepare and send the data to db service
let jwt = require('jsonwebtoken')
let config = require('../../config/development_config')

let toDB_register = require('../../models/member/register_models')
let toDB_login = require('../../models/member/login_models')
let toDB_update = require('../../models/member/update_models')

let onTime = require('../../utils/time')

let Check = require('../../service/member_check')
let cryptPassword = require('../../service/crypt_password')
let verify_token = require('../../service/verify_token')

check = new Check()

module.exports = class Member {
    register(req, res, next){
        const cryptedPassword = cryptPassword(req.body.password)
        const memberData = {
            name : req.body.name,
            email : req.body.email,
            password : cryptedPassword,
            create_date : onTime()
        }
        const checkEmail = check.checkEmail(memberData.email)

        if(checkEmail === false){
            res.json({
                result:{
                    status:"Register fail",
                    err: "Please enter correct email format. (test@gmail.com"
                }
            })
        } else {
            toDB_register(memberData).then(result => {
                res.json({
                    result: result
                })
            }, (err) => {
                res.json({
                    result: err
                })
            })
        }
    }

    login(req, res, next) {
        const cryptedPassword = cryptPassword(req.body.password)
        const memberData = {
            email: req.body.email,
            password: cryptedPassword
        }
        toDB_login(memberData).then(result => {
            const token = jwt.sign({
                algorithm: 'HS256',
                exp: Math.floor(Date.now()/1000) + (60 * 60),
                data: result.loginMember[0].id
            }, config.secret)
            res.setHeader('token', token)
            res.json({
                result:result
            })
        }, (err) => {
            res.json({
                result: err
            })
        })
        
    }

    update(req, res, next) {
        const token = req.headers['token']
        const cryptedPassword = cryptPassword(req.body.password)
        const memberData = {
            name: req.body.name,
            password: cryptedPassword,
            update_date: onTime()
        }
        verify_token(token).then(result => {
            const member_id = result.data
            toDB_update(memberData, member_id).then(result => {
                res.json({
                    result:result
                })
            }, (err) =>{
                res.json({
                    result:err
                })
            })
        }, (err) => {
            res.json({
                result: err
            })
        })



        
    }
}