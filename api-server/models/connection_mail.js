const con = require('config')
const config = require(`../config/${con.util.getEnv('NODE_ENV')}_config`)
const nodemailer = require('nodemailer')

module.exports = nodemailer.createTransport({
    service: "gmail",
    auth: {
        user: config.senderMail.user,
        pass: config.senderMail.password
    }
})