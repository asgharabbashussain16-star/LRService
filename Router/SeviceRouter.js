const express= require('express')
const Servicemodel = require('../Model/ServiceModel')

const ServiceRouter = express.Router();

ServiceRouter.post("/service", async (req,res)=>{
  try{
    const {sname , description} = req.body;
    const BeforeCheck = await Servicemodel.findOne({sname: sname});
    if(BeforeCheck){
      return res.send('Service already Exists');
    }else{
    const Servicedata = new Servicemodel(req.body);
    const result= await Servicedata.save();
    if(result){
        res.send("Service Add Success")
    }else{
        res.send("Service Not Added")
    }
    }
   
  }catch(err){
    res.send(err)
  }

});
ServiceRouter.get("/service", async (req,res)=>{
  try{
      const result = await Servicemodel.find();
      if((await result).length > 0){
        res.send(result)
      }else{
        res.send('no data found')
      }
  }
  catch(err){
    res.send(err)

  }
})
ServiceRouter.delete('/service/:id', async (req,res)=>{
  try{
    const result = await Servicemodel.deleteOne({_id: req.params.id});
    if(result.deletedCount > 0){
      res.send("deleted Service")
    }else{
      res.send("Service is not Delete")
    }
  }catch(err){
    res.send(err)
  }
});

ServiceRouter.get(`/service/:sid`, async(req,res)=>{
  try{
    const result = await Servicemodel.findOne({_id: req.params.sid})
    res.send(result)
  }catch(err){
    res.send(err)
  }
});

ServiceRouter.put('/service/:sid', async(req,res)=>{
  try{
    const result = await Servicemodel.updateOne({_id: req.params.sid}, {$set: req.body})
    if(result.modifiedCount > 0){
      res.send(" Service Updated")
    }else{
      res.send(" Unable to Update Service")
    }

  }catch(err){
    res.send(err)
  }
})
module.exports=ServiceRouter;