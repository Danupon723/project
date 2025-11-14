const kenx = require('knex')
require('dotenv').config();

const conn = kenx({
    client:'mysql2',
    connection:{
        host: process.env.HOST || '127.0.0.1' ,
        user: process.env.USER || 'root' ,
        password: process.env.PASSWORD || '' , 
        database: process.env.NAME || 'test' , 
        port: process.env.DB_PORT || 3306 , 
        connectTimeout: 1500
    } , 
    pool:{min: 0 , max:10 , acquireTimeoutMillis:20000}
});
module.exports = conn