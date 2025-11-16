require('dotenv').config()
const conn = require('../config/db')
const bcrypt = require('bcrypt')

exports.userlist = async(req,res,next)=>{
    try{
        const items = await conn('users').select("*").orderBy("id" , "desc")
        res.json({success:true, items , total : items.length})
    }catch(e){
        next(e)
    }
}

exports.createuser = async (req,res,next) =>{
    try{
        const {name , email , password , department , group_id , role} = req.body
        const row = await conn('users').where({email}).first()
        if(row){
            return res.status(400).json({message : 'อีเมลนี้ถูกใช้ลงทะเบียนแล้ว'})
        }

        const password_hash = await bcrypt.hash(password , 10)

        const create = await conn('users').insert({name,email,password:password_hash,department_id: department ,org_group_id : group_id,role})
            res.json({success:true , message: 'create user complata'})
        

    }catch(e){
        next(e)
    }
}

