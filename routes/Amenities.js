const express = require('express');
const router = express.Router();
const { PrismaClient } = require('@prisma/client')
const checkLogin = require('../middlewares/CheckLogin');
const prisma = new PrismaClient()

// GET ALL AMENITIES 

router.get('/', checkLogin, async (req, res) => {
    try {
        // user can get all amenities

        try {
            const amenities = await prisma.amenities.findMany()
            res.status(200).json({
                success: true,
                message: 'All amenities fetched successfully',
                amenities: amenities
            })
        }
        catch (err) {
            res.status(404).json({
                success: false,
                message: 'Unable to fetch amenities',
                error: err
            })
        }


    }
    catch (err) {
        res.status(500).json({
            success: false,
            message: 'Server error, unable to fetch amenities',
            error: err
        })
    }
})

// POST AMENITIES

router.post('/', checkLogin, async (req, res) => {
    try {
        // get LoggedIn user
        const loggedInUser = await prisma.user.findUnique({
            where: {
                id: req.user.id
            }
        })

        // ADMIN can post amenities

        if (loggedInUser.role === 'ADMIN') {
            try {
                const { name, free, price, description } = req.body
                const amenities = await prisma.amenities.create({
                    data: {
                        name,
                        free: free || false,
                        description: description || '',
                        price: price || 0
                    }
                })
                res.status(201).json({
                    success: true,
                    message: 'Amenities created successfully',
                    amenities: amenities
                })
            }
            catch (err) {
                res.status(500).json({
                    success: false,
                    message: 'Unable to create amenities',
                    error: err
                })
            }
        } else {
            res.status(401).json({
                success: false,
                message: 'Unauthorized, only admin can create amenities'
            })
        }
    }
    catch (err) {
        res.status(500).json({
            success: false,
            message: 'Server error, unable to create amenities',
            error: err
        })
    }
})

module.exports = router