// signup route

const express = require('express');
const router = express.Router();
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

// SIGNUP

router.get('/', (req, res) => {
    res.send('signup');
});

router.post('/', async (req, res) => {
    try {
        const user = await prisma.user.findUnique({
            where: {
                email: req.body.email
            }
        })
        if (user) {
            res.status(409).json({
                success: false,
                message: "User already exists, try different email"
            })
        } else {

            // role can not be ADMIN
            if (req.body.role === 'ADMIN') {
                return res.status(401).json({ message: 'You are not authorized to open ADMIN account' })
            }
            const hashedPassword = await bcrypt.hash(req.body.password, 10)
            const newUser = await prisma.user.create({
                data: {
                    name: req.body.name,
                    email: req.body.email,
                    username: req.body.username || req.body.email,
                    role: req.body.role || 'USER',
                    password: hashedPassword
                }
            })
            const token = jwt.sign(
                {
                    id: newUser.id,
                    user: {
                        name: newUser.name,
                        email: newUser.email,
                        username: newUser.username,
                        role: newUser.role
                    }
                }
                , process.env.JWT_SECRET, {
                expiresIn: '3h'
            })
            res.status(200).json({
                success: true,
                message: "User signed up successfully",
                token: token
            })
        }
    } catch (err) {
        console.log(err);
        res.status(401).json({
            success: false,
            message: "Signup failed",
            error: err
        })
    }

});

module.exports = router;