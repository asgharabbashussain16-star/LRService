const express = require('express')
const ServiceProviderModel = require('../Model/ServiceProvider');
const { model } = require('mongoose');


const ServiceProviderRouter = express.Router();
 

ServiceProviderRouter.post('/serviceprovider', async (req,res)=>{
   try{
     const ServiceProviderData = new ServiceProviderModel(req.body);
    const result = await ServiceProviderData.save();
    if(result._id){
        res.send(" Sub Service Provider Added ")
    }else{
        res.send('unable to add provider')
    }
   }catch(err){
    res.send(err)
   }
});

ServiceProviderRouter.get('/serviceprovider/:sname/:subname', async (req,res)=>{
    try{
        const result = await ServiceProviderModel.find({sname: req.params.sname , subname: req.params.subname})
        if(result.length > 0){
            res.send(result)
        }
        else{
            res.send('np record round')
        }
    }catch(err){
        res.send(err)
    }
});


module.exports = ServiceProviderRouter;
