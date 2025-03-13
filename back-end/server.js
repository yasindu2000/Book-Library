import express from 'express';
import dotenv from 'dotenv';

dotenv.config();

const app = express();

const PORT =  process.env.PORT || 5000;
console.log(process.env.PORT)
app.use(express.json());

//test

app.get('/', (req,res)=>{
    res.send("hello 22");
})

app.listen(PORT, ()=>{
    console.log(`Server running port: ${PORT}`);
})