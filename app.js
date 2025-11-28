const express=require("express");
const app=express();
const cors = require("cors");
const RegisterRouter = require("./Router/registerRouter");
const ServiceRouter = require("./Router/SeviceRouter");
const SubSeriveRouter = require("./Router/SubServiceRouter");
const ServiceProviderRouter = require("./Router/ServiceProviderRouter");
const BookServiceRouter = require("./Router/BookServiceRouter");
const ContactUs = require('./Router/ContactUs')
require('./DBConfig/DBConfig')
const port=4000;

app.use(cors());

app.use(express.json());


app.use("/",RegisterRouter)
app.use('/',ServiceRouter)
app.use('/',SubSeriveRouter)
app.use('/', ServiceProviderRouter)
app.use('/', BookServiceRouter)
app.use('/', ContactUs)


app.listen(port,()=>{
    console.log(`server is started a port number${port}`);
    
})