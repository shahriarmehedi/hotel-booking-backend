const express = require('express');
const router = express.Router();
const { PrismaClient } = require('@prisma/client')

const prisma = new PrismaClient()

// GET ALL USERS
router.get('/', async (req, res) => {
    const users = await prisma.user.findMany()
    res.json(users)
})

// GET ONE USER
router.get('/:id', async (req, res) => {
    const user = await prisma.user.findUnique({
        where: {
            id: req.params.id
        }
    })
    res.json(user)
})

// CREATE USER
router.post('/', async (req, res) => {
    const newUser = await prisma.user.create({
        data: {
            name: req.body.name,
            email: req.body.email,
            password: req.body.password
        }
    })
    res.json(newUser)
})

// UPDATE USER
router.put('/:id', async (req, res) => {
    const updatedUser = await prisma.user.update({
        where: {
            id: req.params.id
        },
        data: {
            name: req.body.name,
            email: req.body.email,
            password: req.body.password
        }
    })
    res.json(updatedUser)
})

// DELETE USER

router.delete('/:id', async (req, res) => {
    const deletedUser = await prisma.user.delete({
        where: {
            id: req.params.id
        }
    })
    res.json(deletedUser)
})





module.exports = router;