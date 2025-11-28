const mongoose=require('mongoose');

const serviceschema = new mongoose.Schema({
    sname:{
        type:String,
        required:true
    },
    description:{
        type:String,
        required:true
    }

});
module.exports = mongoose.model("sevices", serviceschema)
