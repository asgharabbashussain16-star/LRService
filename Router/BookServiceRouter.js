const express = require('express')

const BookServiceModel= require('../Model/BookService')

const BookServiceRouter = express.Router();

BookServiceRouter.post('/bookservice', async (req,res)=>{
    try{
        const Bookservicedata = new BookServiceModel(req.body);
        const result=  await Bookservicedata.save();
        if(result._id){
            res.send('service is inserted')
        }else{
            res.send('service is not inserted')
        }
    }catch(err){
        res.send(err)
    }
});

BookServiceRouter.get('/bookservice', async (req,res)=>{
   try{
     const result= await BookServiceModel.find();
   if((await result).length > 0){
    res.send(result)
   }else{
    res.send("no data found")
   }}catch(err){
    res.send(err)
   }
   
});

BookServiceRouter.delete('/bookservice/:id', async (req,res)=>{
    try{
        const result = await BookServiceModel.deleteOne({_id: req.params.id})
        if(result.deletedCount > 0){
            res.send("Booked Service is Deleted")
        }else{
            res.send("unable to delete booked service")
        }
    }catch(err){
        res.send(err)
    }
})
module.exports= BookServiceRouter;