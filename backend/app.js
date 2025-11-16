require('dotenv').config()

const express = require('express');
const cors = require('cors')
const morgan = require('morgan')

const auth = require('./router/authrouter');
const app = express(); 
app.use(cors({origin:process.env.CORS_ORIGIN ? process.env.CORS_ORIGIN.split(',') : '*'}))
    

app.use(express.urlencoded({ extended: true}))
app.use(express.json());
app.use(morgan('dev'))

app.get('/oak' , (req,res)=>{
    console.log('req = ' , req.query)
    res.json({
        status:"hello world oak" , 
        data : req.query
    })
})

app.use('/api/auth' , auth )

module.exports = app
