const express = require('express')
const router = express.Router()
const { PrismaClient } = require('@prisma/client')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcryptjs')

const prisma = new PrismaClient()

// LOGIN

router.get('/', (req, res) => {
    res.send('login')
})

router.post('/', async (req, res) => {
    const { email, password } = req.body

    try {
        const user = await prisma.user.findUnique({
            where: {
                email: email
            }
        })
        if (user) {
            const validPassword = await bcrypt.compare(password, user.password)
            if (validPassword) {
                const token = jwt.sign(
                    {
                        id: user.id,
                        user: {
                            name: user.name,
                            email: user.email,
                            username: user.username,
                            role: user.role
                        }
                    }
                    , process.env.JWT_SECRET, {
                    expiresIn: '12h'
                })
                res.status(200).json({
                    success: true,
                    message: "User logged in successfully",
                    token: token
                })
            } else {
                res.status(401).json({
                    success: false,
                    message: "Wrong credentials"
                })
            }
        } else {
            res.status(401).json({
                success: false,
                message: "User with this email does not exist"
            })
        }
    } catch (err) {
        res.status(500).json({
            success: false,
            message: "Unable to login user",
            error: err
        })
        console.log(err)
    }
})

module.exports = router;