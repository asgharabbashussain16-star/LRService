const express=require('express');
const RegisterModle=require('../Model/registerModel');
const registerModel = require('../Model/registerModel');

const RegisterRouter=express.Router();

RegisterRouter.post('/register', async (req,res)=>{
    try{
        const registerdata = new RegisterModle(req.body);
        const result = await registerdata.save();
        if(result){
            res.send({status:"success", message:"registed sucessfully"})

        }else{
            res.send({status:"failed", message:"failed to register"})
        }
    }catch(err){
        res.send(err)

    }

});
RegisterRouter.post('/admin', async (req,res)=>{
    try{
        const {email,password} = req.body;
        const exists = await RegisterModle.findOne({email:email});
        if(!exists){
            res.send({status:"failed", message:"User not found"});
        }else if(exists.password!==password){
            res.send({status:"failed", message:"inncorrect password"})
        }else{
            res.send({status:"login", message:"sucesfully login"})
        }
    }
    catch(err){
        res.send(err)
    }
})

module.exports= RegisterRouter;