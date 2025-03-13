import mongoose from "mongoose";

export async function connectTODB(){
    try {
        const conn = await mongoose.connect(process.env.MONGO_URI)
        console.log("Mongodb Connected", conn.connection.host)
        
    } catch (error) {
        console.log("error connect DB", error.message);
        process.exit(1)
    }
}