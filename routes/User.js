const express = require('express');
const router = express.Router();
const { PrismaClient } = require('@prisma/client')
const checkLogin = require('../middlewares/CheckLogin');
const prisma = new PrismaClient()
const bcrypt = require('bcryptjs');




// GET ALL USERS

router.get('/', checkLogin, async (req, res) => {

    try {
        // get LoggedIn user
        const loggedInUser = await prisma.user.findUnique({
            where: {
                id: req.user.id
            }
        })

        // ADMIN can get all users, user will get only himself
        if (loggedInUser.role === 'ADMIN') {
            const users = await prisma.user.findMany()
            res.status(200).json({
                success: true,
                message: 'All users fetched successfully',
                users: users
            })
        } else {
            res.status(200).json({
                success: true,
                message: 'Requested user fetched successfully',
                user: loggedInUser
            })
        }
    }
    catch (err) {
        res.status(404).json({
            success: false,
            message: 'Unable to fetch all users',
            error: err
        })
    }


})

// GET ONE USER

router.get('/:id', checkLogin, async (req, res) => {

    try {
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
                    id: req.params.id
                }
            })
            res.status(200).json(user)
        } else {
            // unauthorized
            res.status(401).json({ message: 'Unauthorized' })
        }
    }
    catch (err) {
        res.status(404).json({
            success: false,
            message: 'Unable to fetch single user',
            error: err
        })
    }

})

// CREATE USER

router.post('/', checkLogin, async (req, res) => {

    try {
        // get LoggedIn user
        const loggedInUser = await prisma.user.findUnique({
            where: {
                id: req.user.id
            }
        })

        // only admin can create user
        if (loggedInUser.role === 'ADMIN') {
            const user = await prisma.user.create({
                data: {
                    name: req.body.name,
                    email: req.body.email,
                    username: req.body.username,
                    role: req.body.role,
                    password: req.body.password
                }
            })
            res.status(201).json({
                success: true,
                message: 'User created successfully',
                user: user
            })
        } else {
            res.status(401).json({
                success: false,
                message: 'Unauthorized to create user'
            })
        }
    }
    catch (err) {
        res.status(404).json({
            success: false,
            message: 'Unable to create user',
            error: err
        })
    }

})

// UPDATE USER

router.put('/:id', checkLogin, async (req, res) => {

    try {
        // get logged in user
        const loggedInUser = await prisma.user.findUnique({
            where: {
                id: req.user.id
            }
        })

        // check if user is admin or if user is updating their own profile
        if (loggedInUser.role === 'ADMIN' || loggedInUser.id === req.params.id) {
            try {
                hashedPassword = await bcrypt.hash(req.body.password, 10)
                const user = await prisma.user.update({
                    where: {
                        id: req.params.id
                    },
                    data: {
                        name: req.body.name || user.name,
                        email: req.body.email || user.email,
                        username: req.body.username || user.username,
                        role: req.body.role || user.role,
                        password: hashedPassword || user.password
                    }
                })
                res.status(200).json({
                    success: true,
                    message: 'User updated successfully',
                    user: user
                })
            } catch (err) {
                res.status(400).json({
                    success: false,
                    message: 'Unable to update user',
                    error: err
                })
            }
        } else {
            res.status(401).json({
                success: false,
                message: 'You are not authorized to update this user'
            })
        }
    }
    catch (err) {
        res.status(404).json({
            success: false,
            message: 'Unable to update user',
            error: err
        })
    }

})

// DELETE USER

router.delete('/:id', checkLogin, async (req, res) => {

    try {
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
            res.status(200).json({
                success: true,
                message: 'User deleted successfully',
                user: deletedUser
            })
        } else {
            res.status(401).json({
                success: false,
                message: 'You are not authorized to delete this user'
            })
        }
    }
    catch (err) {
        res.status(404).json({
            success: false,
            message: 'Unable to delete user',
            error: err
        })
    }

})

module.exports = router
