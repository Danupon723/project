const jwt = require('jsonwebtoken');
const conn = require('../config/db')
const bcrypt = require('bcrypt')
require('dotenv').config();

exports.login = async (req,res,next)=>{
    try{
        const {email , password} = req.body
        const user = await conn('users').where({email}).first()
         if(!user){return res.status(400).json({success:false , message:'not found'});}
            
         const match = await bcrypt.compare(password , user.password)
         if(!match){return res.status(400).json({success: false , message : 'Password incorrect'})}

         const token = jwt.sign({id: user.id , name: user.name , role : user.role  } , process.env.JWT_SECRET , {expiresIn: process.env.JWT_EXPIRESIN || "1h"})
         res.json({success:true ,message:'login complata' ,  token: token })
    }catch(e){
        next(e)
    }
}


exports.register = async (req,res,next)=>{
    try{
        console.log(req.body)
        const {name , email , password , department , group_id , role='Employee' } = req.body
        const row = await conn('users').where({email}).first()
        if(row){
            return res.json({success:false , message: 'user '})
        }   
        const password_bcrypt = await bcrypt.hash(password , 10)

        const memo = await conn('users').insert({name,email,password:password_bcrypt,department_id:department ,org_groups_id : group_id , role 	})
        res.json({success:true , message : 'Register successfully'})
    }catch(e){
        next(e)
    }
}