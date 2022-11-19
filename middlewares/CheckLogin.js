// Check Login middleware

const jwt = require('jsonwebtoken');
const { PrismaClient } = require('@prisma/client')
const prisma = new PrismaClient()

const checkLogin = async (req, res, next) => {
    try {
        const token = req.headers.authorization.split(" ")[1];
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        const user = await prisma.user.findUnique({
            where: {
                id: decoded.id
            }
        })
        if (!user) {
            return res.status(401).json({
                success: false,
                message: "User not found"
            })
        }
        req.user = user;
        next();
    } catch (err) {
        return res.status(401).json({
            success: false,
            message: "Authentication failed"
        })
    }
}

module.exports = checkLogin;






// Path: app.js

// const express = require('express')
// const app = express()


// const dotenv = require('dotenv')
// const path = require('path')
// const routes = require('./routes')

// dotenv.config()

// app.use(express.json())
// app.use(express.urlencoded({ extended: true }))
// app.use(cookieParser())
// app.use(session({
//     secret: process.env.SESSION_SECRET,
//     resave: false,
//     saveUninitialized: true,
//     cookie: { secure: false }
// }))


