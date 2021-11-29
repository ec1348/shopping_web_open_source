const con = require('config')
const config = require(`../config/${con.util.getEnv('NODE_ENV')}_config`)
console.log(`${con.util.getEnv('NODE_ENV')} environment`)
const mysql = require('mysql')

const connection = mysql.createConnection({
    host: config.mysql.host,
    user: config.mysql.user,
    password: config.mysql.password,
    database: config.mysql.database
})

connection.connect(err => {
    if(err) console.log(err)
    else{
        if(con.util.getEnv('NODE_ENV') !== 'test'){
            console.log("Succeffully connect to database")
        }
    }
})

module.exports = connection