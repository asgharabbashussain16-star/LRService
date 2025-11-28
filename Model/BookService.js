const mongoose = require('mongoose')

const BookServiceschema= new mongoose.Schema({
    sname:{
        type:String,
        required:true
    },
    subname:{
        type:String,
        required:true
    },sprovider:{
        type:String,
        required:true
    },
    name:{
        type:String,
        required:true
    },email:{
        type:String,
        required:true
    },
    mobile:{
        type:String,
        required:true
    },message:{
        type:String,
        required:true
    }

});

module.exports= mongoose.model('bookservices', BookServiceschema)