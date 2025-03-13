import express from 'express';
import dotenv from 'dotenv';
import { connectTODB } from './config/db.js';

dotenv.config();

const app = express();

const PORT =  process.env.PORT || 5000;
console.log(process.env.PORT)
app.use(express.json());

//test

app.get('/', (req,res)=>{
    res.send("hello 22");
})

app.listen(PORT, async ()=>{
    await connectTODB()
    console.log(`Server running port: ${PORT}`);
})