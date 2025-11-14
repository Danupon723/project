const jwt = require('jsonwebtoken');
const conn = require('../config/db')
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