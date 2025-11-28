const express = require('express')
const nodemailer = require('nodemailer')

const ContactUsRouter = express.Router();

ContactUsRouter.post('/contactus', (req,res)=>{
    try{
        const {name,email, mobile, subject, message}= req.body;

        const transport = nodemailer.createTransport({
            service: 'gmail',

            auth:{
                user:'asgharabbashussain1@gmail.com',
                pass:"vhgc faya gkik cfpu",
            },
        
        });
        const mailopitions= {
            From:`${email}`,
            to:`asgharabbashussain16@gmail.com`,
            subject:`contact Us ${subject}`,
            text:`name: ${name} \n email: ${email} \n mobile: ${mobile} \n subject: ${subject} \n message:${message}`,
        }
        transport.sendMail(mailopitions, (error, info)=>{
            if (error) throw error;
            res.send({status:true, message:'mail sent successfully'})
            
            

        });
    }catch(err){
        res.send({status:false, message:'unable to send mail'})
    }

})

module.exports = ContactUsRouter;
