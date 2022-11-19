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

    const user = await prisma.user.findUnique({
        where: {
            email: req.body.email
        }
    })
    if (user) {
        const validPassword = await bcrypt.compare(req.body.password, user.password)
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
                message: "Login successful",
                token: token
            })
        } else {
            res.send('Invalid password')
        }
    } else {
        res.status(401).json({
            success: false,
            message: "Auth failed"
        })
    }
})

module.exports = router;