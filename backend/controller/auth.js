const jwt = require('jsonwebtoken');
const conn = require('../config/db')
const bcrypt = require('bcrypt')
require('dotenv').config();

exports.login = async (req,res,next)=>{
    try{
        const {email , password} = req.body
        const user = await conn('users').select("*").where({email}).first()
         if(!user){
            return res.status(404).json({success:false , message:'not found'});
         }

         const token = jwt.sign({id: user.id , name: user.name , role : user.role  } , process.env.JWT_SECRET , {expiresIn: process.env.JWT_EXPIRESIN || "1h"})
         res.json({success:true , token: token })
    }catch(e){
        next(e)
    }
}


exports.register = async (req,res,next)=>{
    try{
        const {name , email , password , department , group } = req.body
        const row = await conn('users').where({email}).first()
        if(row.length === 1){
            return res.json({success:false , message: 'user '})
        }   
        const password_bcrypt = await bcrypt.hash(password , 10)

        const memo = await conn('users').insert({name,email,password,})
    }catch(e){
        next(e)
    }
}