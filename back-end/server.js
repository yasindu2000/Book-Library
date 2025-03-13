import express from 'express';
import dotenv from 'dotenv';
import { connectTODB } from './config/db.js';

dotenv.config();

const app = express();

const PORT =  process.env.PORT || 5000;
console.log(process.env.PORT)
app.use(express.json());

//signup

app.post("api/signup",async(req, res)=>{

    const{username, email,password} = req.body;

    try {
        if(!username || !password || !email){
            throw new Error("All fields are required");
        }

        // const emailExists =
    } catch (error) {

        
        
    }

})

app.listen(PORT, async ()=>{
    await connectTODB()
    console.log(`Server running port: ${PORT}`);
})