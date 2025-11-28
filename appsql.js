const express = require('express')
const cors = require('cors');
const StudentRouter = require('./RouterMySQL/StudentRouter');

const app= express();


const port = 4000;


app.use(cors());
app.use(express.json());


app.use("/", StudentRouter )

app.listen(port, ()=>{
    console.log("server is started a port number 4000");
    
})