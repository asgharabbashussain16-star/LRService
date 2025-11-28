const mongoose = require('mongoose');
const conURL="mongodb+srv://asgharabbashussain16_db_user:pmgvtAV7oGBAVcrA@abbas.pqokrby.mongodb.net/?appName=abbas";

mongoose.connect(conURL)
.then((con)=>{

}).catch((err)=>{
    console.log(err);
    
})