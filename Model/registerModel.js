const mongoose=require('mongoose');

const registerschema = new mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true
    },mobile:{
        type:Number,
        required:true
    },
    password:{
        type:String,
        required:true
    },address:{
        type:String,
        required:true
    }

});
module.exports = mongoose.model("registers", registerschema)
