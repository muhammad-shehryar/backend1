const express = require("express")
const router = express.Router()
const User= require("../models/User")
const jwt = require("jsonwebtoken")
const bcrypt = require("bcryptjs")

router.post("/register",async(req,res)=>{
    const {name,email,password}=req.body;
    try{
        let user = await User.findOne({email})

        if(user){
            return res.status(500).json({msg:"user already exits"})
        }
        user = new User({
            name,
            email,
            password,
        })

        const encryption = await bcrypt.genSalt(10)
        user.password = await bcrypt.hash(password,encryption)

        const payload={
            user:{
                id:req.user.id
            }
        }
        const token = jwt.sign(payload,process.env.JWT_SECRET_KEY,{expiresIn:"1h"})
        res.status(200).json({token})
    }catch(error){
        res.status(200).json("server error")
    }
})

router.post("/login",async(req,res)=>{
    const {email,password}=req.body;
    try{
        let user = await User.findOne({email})
        if(!user){
            return res.status(500).json("user not exits")
        }
        const isMatch = await bcrypt.compare(password,user.password)

        if(!isMatch){
            return res.status(200).json("passord not match")
        }
        const payload = {
            user:{
                id:req.user.id
            }
        }
        const token=jwt.sign(payload,process.env.JWT_SECRET_KEY,{expiresIn:"1h"})
        res.json({token})
    }catch(error){
        res.status(500).json("server error")
    }
})

module.exports = router;

