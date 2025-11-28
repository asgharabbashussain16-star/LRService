const express= require('express');
const SubServiceModel = require('../Model/SubServiceModel')

const SubSeriveRouter = express.Router();

SubSeriveRouter.post('/subservice', async (req,res)=>{
    try{
        const subservicedata = new SubServiceModel(req.body);
        const result = await subservicedata.save();
        if(result){
            res.send("Sub Server Add Success")
        }else{
            res.send("Unable to Add Sub Service")
        }
    }catch(err){
        res.send(err)
    }
});

SubSeriveRouter.get('/subservice/:sid', async (req,res)=>{
   try{
     const result = await SubServiceModel.findOne({_id: req.params.sid})
     res.send(result)
   }catch(err){
    res.send(err)
   }
});

SubSeriveRouter.get('/subservicename/:sname', async (req,res)=>{
    try{
        const result = await SubServiceModel.find({sname: req.params.sname})
        res.send(result)
    }catch(err){
        res.send(err)
    }
})

module.exports= SubSeriveRouter;
