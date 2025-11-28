const mongoose = require('mongoose')

const SubServiceSchema = new mongoose.Schema({
    sname:{
        type:String,
        required:true
    },
    subname:{
        type:String,
        required:true
    },
    description:{
        type:String,
        required:true
    }
});

module.exports= mongoose.model("subservices", SubServiceSchema)