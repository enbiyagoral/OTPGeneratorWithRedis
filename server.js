const express = require('express');
const redis = require('redis');
const otpGenerator = require('otp-generator')
const { registerMail} = require('./sendMail');
const dotenv = require('dotenv');
dotenv.config();
const app = express();

const client = redis.createClient({
    url: process.env.REDIS_URL,
});

client.on('error', err => console.log('Redis Client Error', err));

client.connect().then(()=>{
    console.log("Redis connected!");
});

app.use(express.json());

app.get("/generate-otp/:id",async(req,res)=>{
    const { id } = req.params;
    const otp = otpGenerator.generate(6, { upperCaseAlphabets: false, lowerCaseAlphabets: false, specialChars: false });
    console.log(id);

    client.set("id",otp).then(()=>{
        console.log("Data added to Redis");
    });

    registerMail("john","johndoe@mail.com",otp).then(()=>{
        console.log("Mail is sended");
    })

    res.status(201).json("OTP Gönderildi");
});

app.get("/verify-otp/:id",async(req,res)=>{
    const { id}  = req.params;
    const { code } = req.body;

    const stockdb = await client.get("id");
    console.log(stockdb);
    if(code == stockdb){
        res.status(201).json("Doğrulandı");
    }else{
        res.status(400).json("Hatalı opt değeri");
    }
});

const port = 3000 || process.env.PORT;

app.listen(port,()=>{
    console.log(`Server starting on ${port} the port`);
});

