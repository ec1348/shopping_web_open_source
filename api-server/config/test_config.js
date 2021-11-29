require('dotenv').config()

module.exports = {
    mysql: {
        host:process.env.HOST,
        user:process.env.DATABASE_USER_TEST,
        password:process.env.DATABASE_PASSWORD_TEST,
        database:process.env.DATABASE_TEST
    },
    secret:process.env.MY_SECRET_KEY,
    senderMail:{
        user: process.env.SEND_MAIL_USER,
        password: process.env.SEND_MAIL_PASSWORD
    }
}