const express = require('express');
const router = express.Router();
const { PrismaClient } = require('@prisma/client')

const bcrypt = require('bcryptjs');
const checkLogin = require('../middlewares/CheckLogin');

const prisma = new PrismaClient()



// GET ALL USERS

router.get('/', checkLogin, async (req, res) => {
    try {
        const users = await prisma.user.findMany()
        res.status(200).json(users)
    } catch (err) {
        res.status(404).json({ message: 'Something went wrong', error: err })
    }

})

// GET ONE USER

router.get('/:id', checkLogin, async (req, res) => {
    try {
        const user = await prisma.user.findUnique({
            where: {
                id: req.params.id
            }
        })
        res.status(200).json(user)
    } catch (err) {
        res.status(404).json({ message: 'Something went wrong', error: err })
    }
})

// CREATE USER

router.post('/', checkLogin, async (req, res) => {
    try {
        const user = await prisma.user.create({
            data: {
                name: req.body.name,
                email: req.body.email,
                username: req.body.username,
                role: req.body.role,
                password: req.body.password
            }
        })
        res.status(201).json(user)
    } catch (err) {
        res.status(400).json({ message: err })
    }
})

// UPDATE USER

router.put('/:id', checkLogin, async (req, res) => {
    const updatedUser = await prisma.user.update({
        where: {
            id: req.params.id
        },
        data: {
            name: req.body.name,
            email: req.body.email,
            username: req.body.username,
            role: req.body.role,
            password: req.body.password
        }
    })

    res.status(200).json(updatedUser)
})

// DELETE USER

router.delete('/:id', checkLogin, async (req, res) => {
    const deletedUser = await prisma.user.delete({
        where: {
            id: req.params.id
        }
    })

    res.status(200).json(deletedUser)
})

module.exports = router
