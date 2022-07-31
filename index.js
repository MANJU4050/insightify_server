const express = require('express');
const app = express();
const cors = require('cors');
const fetch = require('node-fetch');
const insighter = require('./insighter')

app.use(cors({
    origin: 'https://insightify.netlify.app/',
    methods: ['GET', 'POST','PUT','PATCH','DELETE'],
    credentials: true
}));
app.use(express.json());
app.use(express.urlencoded({extended:true}));

app.post('/getinsight',(req,res)=>{

   

    const data =async (url)=>{
        try{
            const text = await insighter(`${url}`);
           
            if(text.result==='invalid url'){
                res.send(text);
            }else{
                res.send({id:text.id,url:url,wordcount:text.count,weblinks:text.weblinks,medialinks:text.medialinks,fav:"false"});

            }
            
           
        
        }catch(err){
            console.log(err)
        }
    }

    data(req.body.url);
   
   


})










app.listen(4000,()=>{
    console.log("server started running on port 4000");
})