const jwt = require('jsonwebtoken');
const conn = require('../config/db')
const bcrypt = require('bcrypt')
require('dotenv').config();

exports.login = async (req,res,next)=>{
    try{
        const {email , password} = req.body
        const user = await conn('users').where({email}).first()
         if(!user){return res.status(400).json({success:false , message:'not found'});}
            
         const match = await bcrypt.compare(password , user.password_hah)
         if(!match){return res.status(400).json({success: false , message : 'Password incorrect'})}

         const token = jwt.sign({id: user.id , name: user.name_th , role : user.role  } , process.env.JWT_SECRET , {expiresIn: process.env.JWT_EXPIRESIN || "1h"})
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
        const password_hash = await bcrypt.hash(password , 10)

        const memo = await conn('users').insert({name_th:name,email,password_hash,department_id:department ,org_group_id : group_id , role 	})
        res.json({success:true , message : 'Register successfully'})
    }catch(e){
        next(e)
    }
}

exports.department = async (req,res,next) =>{
    try{
        const dpmtitem = await conn('departments').select('*')
        res.json({dpmtitem})
    }catch(e){
        next(e)
    }
}

exports.groups = async (req,res,next) =>{
    try{
        const groups = await conn('org_groups').select('*')
        res.json({groups})
    }catch(e){
        next(e)
    }
}