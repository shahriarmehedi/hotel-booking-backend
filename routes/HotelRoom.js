const express = require('express');
const router = express.Router();
const { PrismaClient } = require('@prisma/client')
const checkLogin = require('../middlewares/CheckLogin');
const prisma = new PrismaClient()

// GET ALL HOTEL ROOMS

router.get('/', checkLogin, async (req, res) => {
    try {
        const hotelRooms = await prisma.hotelRoom.findMany()
        res.status(200).json({
            success: true,
            message: 'All hotel rooms fetched successfully',
            hotelRooms: hotelRooms
        })
    }
    catch (err) {
        res.status(500).json({
            success: false,
            message: 'Server error, unable to fetch hotel rooms',
            error: err
        })
    }
})

// GET ONE HOTEL ROOM OF A HOTEL

router.get('/:hotelId', checkLogin, async (req, res) => {
    try {
        const hotelRooms = await prisma.hotelRoom.findMany({
            where: {
                hotelId: req.params.hotelId
            }
        })
        res.status(200).json({
            success: true,
            message: 'Requested hotel rooms fetched successfully',
            hotelRooms: hotelRooms
        })
    }
    catch (err) {
        res.status(500).json({
            success: false,
            message: 'Server error, unable to fetch hotel rooms',
            error: err
        })
    }
})

// POST ONE HOTEL ROOM (ADMIN)

router.post('/', checkLogin, async (req, res) => {
    try {
        // Only ADMIN can add hotel rooms
        const loggedInUser = await prisma.user.findUnique({
            where: {
                id: req.user.id
            }
        })
        if (loggedInUser.role === 'ADMIN') {
            const { name, hotelId, size, price, description, image, thumbnail, adults, children } = req.body
            const hotelRoom = await prisma.hotelRoom.create({
                data: {
                    hotelId: hotelId,
                    name: name,
                    size: size,
                    price: price,
                    description: description,
                    image: image,
                    thumbnail: thumbnail,
                    adults: adults,
                    children: children
                }
            })
            res.status(200).json({
                success: true,
                message: 'Hotel room added successfully',
                hotelRoom: hotelRoom
            })
        } else {
            res.status(401).json({
                success: false,
                message: 'Unauthorized, only ADMIN can add hotel rooms'
            })
        }

    }
    catch (err) {
        res.status(500).json({
            success: false,
            message: 'Server error, unable to create hotel room',
            error: err
        })
    }
})

module.exports = router;
