const express = require('express')
const connection = require('../DBConfig/DBConnect')

const StudentRouter=express.Router();

StudentRouter.get('/student', (req,res)=>{
    try{
        connection.query('SELECT * FROM student', (err,result)=>{
            if(err) throw err;
            res.send(result);
        })
    }catch(err){
        res.send("server error")
        
    }


});
/*StudentRouter.post('/student', (req,res)=>{
    try{
        const {id,name,address}= req.body;
        connection.query(`insert into student (id, name, address) values('${id}', "${name}",'${address}')`, (err,result)=>{
            if(err) throw err;
            res.send(result);
        })
    }catch(err){
        res.send("server error")
    }
});*/

StudentRouter.delete('/student/:sid', (req,res)=>{
    try{
        const sid = req.params.sid;
        connection.query(`delete from student where id="${sid}"`, (err,result)=>{
            if(err) throw err;
            res.send(result)
        })
    }catch(err){
        res.send("server error")
    }
});
StudentRouter.get('/student/:sid', (req,res)=>{
    try{
        const sid = req.params.sid;
        connection.query(`select * from student where id="${sid}"`,(err,result)=>{
            if(err) throw err;
            res.send(result)
        })
    }catch(err){
        res.send('server error')
    }
});

StudentRouter.put('/student/:sid', (req,res)=>{
    try{
        const sid = req.params.sid;
        const {id, name , address} = req.body;
        connection.query(`update student set name='${name}' ,address='${address}' where id='${sid}'`, (err, result)=>{
            if (err) throw err;
            res.send(result);
        })
    }catch(err){
        res.send('server error')
    }
})
StudentRouter.post('/student',(req,res)=>{
    try{
        const {id,name, address}= req.body;
        connection.query(`select * from student where name='${name}' and address='${address}'`, (err,result)=>{
           if (err) throw err;
           res.send(result)
           
        })
    }catch(err){
        res.send(err)
    }
})



module.exports= StudentRouter;