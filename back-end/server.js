import express from "express";
import dotenv from "dotenv";
import { connectTODB } from "./config/db.js";
import bcryptjs from "bcryptjs";
import User from "./models/user.model.js";
import jwt from "jsonwebtoken";
import cors from "cors";

dotenv.config();

const app = express();
app.use(cors());

const PORT = process.env.PORT || 5000;
console.log(process.env.PORT);
app.use(express.json());

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

app.listen(PORT, async () => {
  await connectTODB();
  console.log(`Server running port: ${PORT}`);
});
