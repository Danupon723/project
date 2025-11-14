const express = require('express');
require('dotenv').config()
const auth = require('./router/authrouter');

const app = express(); 

app.use(express.json());
app.use('/api/auth' , auth )

module.exports = app
