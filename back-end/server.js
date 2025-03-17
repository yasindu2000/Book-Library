import express from "express";
import dotenv from "dotenv";
import { connectTODB } from "./config/db.js";
import bcryptjs from "bcryptjs";
import User from "./models/user.model.js";
import jwt from "jsonwebtoken";
import cors from "cors";
import cookieParser from "cookie-parser";
import {v2 as cloudinary} from "cloudinary"
import Book from "./models/book.model.js";

dotenv.config();

cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.API_KEY,
  api_secret: process.env.API_SECRET,
})

const app = express();
const PORT = process.env.PORT || 5000;
app.use(
  cors({
    origin: "http://localhost:5173", 
    credentials: true,
  })
);


console.log(process.env.PORT);
app.use(express.json({limit: "20mb"}));
app.use(cookieParser());

//signup

app.post("/api/signup", async (req, res) => {
  const { username, email, password } = req.body;

  try {
    if (!username || !password || !email) {
      throw new Error("All fields are required");
    }

    const emailExists = await User.findOne({ email });
    if (emailExists) {
      return res.status(400).json({ message: "User already exit" });
    }

    const usernameExits = await User.findOne({ username });
    if (usernameExits) {
      return res
        .status(400)
        .json({ message: "Username is taken, try another one" });
    }

    //hash password

    const hashedPassword = await bcryptjs.hash(password, 10);
    const userDoc = await User.create({
      username,
      email,
      password: hashedPassword,
    });

    //JWT
    if (userDoc) {
      const token = jwt.sign({ id: userDoc._id }, process.env.JWT_SECRET, {
        expiresIn: "7d",
      });
      res.cookie("token", token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "strict",
        maxAge: 7*24*60*60*1000,
      })
    }

    return res
      .status(200)
      .json({ user: userDoc, message: "User created successfully" });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

app.post("/api/login", async (req, res)=>{

  const {email, password} = req.body;

  try {

    const userDoc = await User.findOne({email});

    if(!userDoc){
      return res.status(400).json({
        message: "Invalid credentials"
      })
    }

    const isPasswordValid = await bcryptjs.compareSync(
      password,
      userDoc.password
    )

    if(!isPasswordValid){

      return res.status(400).json({
        message:"invalid credentials"
      })
    }
    
    //jwt

    if (userDoc) {
      const token = jwt.sign({ id: userDoc._id }, process.env.JWT_SECRET, {
        expiresIn: "7d",
      });
      res.cookie("token", token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "strict",
        maxAge: 7*24*60*60*1000,
      })
    }

    return res
    .status(200)
    .json({ user: userDoc, message: "Logged in successfully" });
} catch (error) {
  res.status(400).json({ message: error.message });
}

});

//Fetch user

app.get("/api/fetch-user",async(req, res) =>{

  const {token} = req.cookies;

if(!token){

  return res.status(401).json({ message: "No Token provided"});
}

try {
  const decoded = jwt.verify(token, process.env.JWT_SECRET);

  if(!decoded){
    return res.status(401).json({
      message: "Invalid token"
    })
  }
  const userDoc = await User.findById(decoded.id).select("password");
  
  if(!userDoc){

    return res.status(400).json({message: "user not found"})
  }

  res.status(200).json({user: userDoc})
} catch (error) {
  
  res.status(400).json({ message: error.message})
}


})
app.post("/api/logout", (req, res) => {
  res.cookie("token", "", {
    httpOnly: true,
    expires: new Date(0), 
    secure: process.env.NODE_ENV === "production",
    sameSite: "strict",
  });

  res.status(200).json({ message: "Logged out successfully" });
});


// ------------------------------------------------------------------------------------------------------

app.post("/api/add-book", async (req, res)=>{

  const { image, title, subtitle, author, link, review } = req.body;
  const {token} = req.cookies;
  if(!token){

    return res.status(401).json({ message: "No token provided"});
  }
try {

  const decoded = jwt.verify(token, process.env.JWT_SECRET);

  if(!decoded){

    return res.status(401).json({message:"Invalid token"})

  }

  

const imageResponse = await cloudinary.uploader.upload(image ,{
  folder: "/library"
})

const userDoc = await User.findById(decoded.Id).select("password")

const book = await  Book.create({

  image: imageResponse.secure_url,
  title,
  subtitle,
  author,
  link,
  review,
  user: userDoc,
})

return res.status(200).json({book, message: "Book added successfully"})
  
} catch (error) {
  res.status(400).json({message:error.message})
  
}

});

app.get("/api/fetch-books", async (req, res) => {
  try {
    const books = await Book.find().sort({ createdAt: -1 });

    return res.status(200).json({ books });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});


app.listen(PORT, async () => {
  await connectTODB();
  console.log(`Server running on port: ${PORT}`);
});
