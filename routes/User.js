const express = require('express');
const router = express.Router();
const { PrismaClient } = require('@prisma/client')
const checkLogin = require('../middlewares/CheckLogin');
const prisma = new PrismaClient()



// GET ALL USERS

router.get('/', checkLogin, async (req, res) => {

    // get LoggedIn user
    const loggedInUser = await prisma.user.findUnique({
        where: {
            id: req.user.id
        }
    })

    // ADMIN can get all users, user will get only himself
    if (loggedInUser.role === 'ADMIN') {
        const users = await prisma.user.findMany()
        res.status(200).json(users)
    } else {
        res.status(200).json(loggedInUser)
    }


})

// GET ONE USER

router.get('/:id', checkLogin, async (req, res) => {

    // admin can get all users and user can only get himself
    // GET LOGGED IN USER
    const loggedInUser = await prisma.user.findUnique({
        where: {
            id: req.user.id
        }
    })

    if (loggedInUser.role === 'ADMIN') {
        const user = await prisma.user.findUnique({
            where: {
                id: parseInt(req.params.id)
            }
        })
        res.status(200).json(user)
    } else {
        // unauthorized
        res.status(401).json({ message: 'Unauthorized' })
    }

})

// CREATE USER

router.post('/', checkLogin, async (req, res) => {

    // only admin can create user
    if (req.user.role !== 'ADMIN') {
        return res.status(401).json({ message: 'You are not authorized' })
    }

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

    // get logged in user
    const loggedInUser = await prisma.user.findUnique({
        where: {
            id: req.user.id
        }
    })

    // check if user is admin or if user is updating their own profile
    if (loggedInUser.role === 'ADMIN' || loggedInUser.id === req.params.id) {
        try {
            const user = await prisma.user.update({
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
            res.status(200).json(user)
        } catch (err) {
            res.status(400).json({ message: err })
        }
    } else {
        res.status(401).json({ message: 'You are not authorized to update this user' })
    }

})

// DELETE USER

router.delete('/:id', checkLogin, async (req, res) => {

    // get logged in user 
    const loggedInUser = await prisma.user.findUnique({
        where: {
            id: req.user.id
        }
    })

    // check if logged in user is admin
    if (loggedInUser.role === 'ADMIN') {
        const deletedUser = await prisma.user.delete({
            where: {
                id: req.params.id
            }
        })
        res.status(200).json(deletedUser)
    } else {
        res.status(401).json({ message: 'You are not authorized to delete this user' })
    }

})

module.exports = router
