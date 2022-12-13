const express = require('express');
const router = express.Router();
const { PrismaClient } = require('@prisma/client')
const checkLogin = require('../middlewares/CheckLogin');
const prisma = new PrismaClient()

// GET ALL TRANSFERS

router.get('/', async (req, res) => {
    try {

        const transfers = await prisma.transfers.findMany()
        res.status(200).json({
            success: true,
            message: 'All transfers fetched successfully',
            transfers: transfers
        })

    }
    catch (err) {
        res.status(500).json({
            success: false,
            message: 'Server error, unable to fetch transfers',
            error: err
        })
    }
})


// POST TRANSFERS

router.post('/', checkLogin, async (req, res) => {
    try {
        // ADMIN can add transfers only

        const loggedInUser = await prisma.user.findUnique({
            where: {
                id: req.user.id
            }
        })

        if (loggedInUser.role === 'ADMIN') {
            const { name, price, description, image, routes, vehicles, vehicleType, rating, thumbnail } = req.body
            const transfer = await prisma.transfers.create({
                data: {
                    name: name || 'No name',
                    price: price || 0,
                    description: description,
                    image: image,
                    routes: routes,
                    vehicles: vehicles,
                    vehicleType: vehicleType,
                    rating: rating,
                    thumbnail: thumbnail
                }
            })
            res.status(201).json({
                success: true,
                message: 'Transfer added successfully',
                transfer: transfer
            })
        } else {
            res.status(401).json({
                success: false,
                message: 'Unauthorized, only admin can add transfers'
            })
        }
    }
    catch (err) {
        res.status(500).json({
            success: false,
            message: 'Server error, unable to create transfer',
            error: err
        })
        console.log(err)

    }
})

module.exports = router