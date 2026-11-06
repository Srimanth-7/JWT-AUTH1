const dotenv = require('dotenv');
dotenv.config();
const authMiddleware = require('./middelware/authMiddelware')
const express = require('express');
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const cors = require('cors');
const adminMiddleware = require('./middelware/adminMiddelware');

const app = express();

app.use(express.json());
app.use(cors());

mongoose.connect(process.env.MONGODB_URI)
    .then(() => {
        console.log('MongoDB connected');
    })
    .catch((err) => {
        console.log('MongoDB not connected:', err.message);
    });

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    role: {
        type: String,
        default: "user"
    }
});

const User = mongoose.model("User", userSchema);

app.post("/signup", async (req, res) => {
    try {
        const { username, password, role } = req.body;

        if (!username || !password) {
            return res.status(400).send('Enter username and password');
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        await User.create({
            username: username,
            password: hashedPassword,
            role: role || "user"
        });

        return res.status(201).send('User created successfully');
    } catch (err) {
        return res.status(500).send(err.message);
    }
});

app.post("/login", async (req, res) => {
    try {
        const { username, password } = req.body;

        if (!username || !password) {
            return res.status(400).send({
                message:'Enter username and password'
            });
        }

        const user = await User.findOne({ username });

        if (!user) {
            return res.status(404).send({
                message:'User not found'
            });
        }

        const isMatch = await bcrypt.compare(password, user.password);

        if (!isMatch) {
            return res.status(401).send({
                message:'Wrong password'
            });
        }

        const token = jwt.sign(
            {
                username: user.username,
                role:user.role 
            },
            process.env.JWT_SECRET
        );

        return res.status(200).send({
            message: 'Login successful',
            token
        });
    } catch (err) {
        return res.status(500).send(err.message);
    }
});

app.get("/profile", authMiddleware,(req,res)=>{
    res.send("profile data fetched")
})

app.get("/dashboard", authMiddleware,(req,res)=>{
    res.send("dashboard route")
})

app.get("/admin", 
    authMiddleware,
    adminMiddleware,
    async(req,res)=>{
    const users = await User.find();
    res.json(users)
})

app.delete("/admin/:id",
    authMiddleware,
    adminMiddleware,
     async(req,res)=>{
    await User.findByIdAndDelete(req.params.id);
    res.send({
        message:"user deleted"
    }) 
})

app.listen(process.env.PORT || 3000, () => {
    console.log('Server running successfully');
});