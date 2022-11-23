const express = require('express');
const router = express.Router();
const { PrismaClient } = require('@prisma/client')
const checkLogin = require('../middlewares/CheckLogin');
const prisma = new PrismaClient()

// GET ALL HALAL RATINGS

router.get('/', checkLogin, async (req, res) => {

    try {

        const halalRatings = await prisma.halalRating.findMany()
        res.status(200).json({
            success: true,
            message: 'All halal ratings fetched successfully',
            halalRatings: halalRatings
        })

    }
    catch (err) {
        res.status(500).json({
            success: false,
            message: 'Server error, unable to fetch halal ratings',
            error: err
        })
    }

})

// POST A NEW HALAL RATING

router.post('/', checkLogin, async (req, res) => {

    try {
        // get LoggedIn user
        const loggedInUser = await prisma.user.findUnique({
            where: {
                id: req.user.id
            }
        })

        // ADMIN can post a new halal rating
        if (loggedInUser.role === 'ADMIN') {
            const halalRating = await prisma.halalRating.create({
                data: {
                    name: req.body.name,
                    description: req.body.description || null,
                    addedBy: loggedInUser.id || null,
                    percentage: req.body.percentage,
                }
            })
            res.status(200).json({
                success: true,
                message: 'New halal rating created successfully',
                halalRating: halalRating
            })
        } else {
            res.status(401).json({
                success: false,
                message: 'Unauthorized, only admin can create a new halal rating',
            })


        }
    }
    catch (err) {
        res.status(500).json({
            success: false,
            message: 'Server error, unable to create new halal rating',
            error: err
        })
    }

})

// UPDATE A HALAL RATING

router.put('/:id', checkLogin, async (req, res) => {

    try {
        // get LoggedIn user
        const loggedInUser = await prisma.user.findUnique({
            where: {
                id: req.user.id
            }
        })

        // ADMIN can update a halal rating
        if (loggedInUser.role === 'ADMIN') {
            const halalRating = await prisma.halalRating.update({
                where: {
                    id: req.params.id
                },
                data: {
                    name: req.body.name || halalRating.name,
                    description: req.body.description || halalRating.description,
                    addedBy: loggedInUser.id,
                    percentage: req.body.percentage || halalRating.percentage,
                }
            })
            res.status(200).json({
                success: true,
                message: 'Halal rating updated successfully',
                halalRating: halalRating
            })
        } else {
            res.status(401).json({
                success: false,
                message: 'Unauthorized, only admin can update a halal rating',
            })
        }
    }
    catch (err) {
        res.status(500).json({
            success: false,
            message: 'Server error, unable to update halal rating',
            error: err
        })
    }

})

// DELETE A HALAL RATING

router.delete('/:id', checkLogin, async (req, res) => {

    try {
        // get LoggedIn user
        const loggedInUser = await prisma.user.findUnique({
            where: {
                id: req.user.id
            }
        })

        // ADMIN can delete a halal rating
        if (loggedInUser.role === 'ADMIN') {
            const halalRating = await prisma.halalRating.delete({
                where: {
                    id: req.params.id
                }
            })
            res.status(200).json({
                success: true,
                message: 'Halal rating deleted successfully',
                halalRating: halalRating
            })
        } else {
            res.status(401).json({
                success: false,
                message: 'Unauthorized, only admin can delete a halal rating',
            })
        }
    }
    catch (err) {
        res.status(500).json({
            success: false,
            message: 'Server error, unable to delete halal rating',
            error: err
        })
    }

})
