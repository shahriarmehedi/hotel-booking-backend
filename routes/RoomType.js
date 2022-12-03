const express = require('express');
const router = express.Router();
const { PrismaClient } = require('@prisma/client')
const checkLogin = require('../middlewares/CheckLogin');
const prisma = new PrismaClient()

// GET ALL ROOM TYPES

router.get('/', checkLogin, async (req, res) => {
    try {
        const roomTypes = await prisma.hotelRoomType.findMany()
        res.status(200).json({
            success: true,
            message: 'All room types fetched successfully',
            roomTypes: roomTypes
        })
    }
    catch (err) {
        res.status(500).json({
            success: false,
            message: 'Server error, unable to fetch room types',
            error: err
        })
    }
})

// GET ONE ROOM TYPE OF A HOTEL

router.get('/:hotelId', checkLogin, async (req, res) => {
    try {
        const roomTypes = await prisma.hotelRoomType.findMany({
            where: {
                hotelId: req.params.hotelId
            }
        })
        res.status(200).json({
            success: true,
            message: 'Requested room types fetched successfully',
            roomTypes: roomTypes
        })
    }
    catch (err) {
        res.status(500).json({
            success: false,
            message: 'Server error, unable to fetch room types',
            error: err
        })
    }
})

// POST ONE ROOM TYPE (ADMIN)

router.post('/', checkLogin, async (req, res) => {
    try {
        // Only ADMIN can add room types
        const loggedInUser = await prisma.user.findUnique({
            where: {
                id: req.user.id
            }
        })
        if (loggedInUser.role === 'ADMIN') {
            const { name, description, price, bed, meals, thumbnail, cancellation, image, payment } = req.body;
            const roomType = await prisma.hotelRoomType.create({
                data: {
                    name: name,
                    description: description,
                    price: price,
                    bed: bed,
                    image: image,
                    payment: payment,
                    meals: meals,
                    thumbnail: thumbnail,
                    cancellation: cancellation,
                }
            })
            res.status(201).json({
                success: true,
                message: 'Room type added successfully',
                roomType: roomType
            })
        } else {
            res.status(401).json({
                success: false,
                message: 'Unauthorized, only ADMIN can add room types'
            })
        }
    }
    catch (err) {
        console.log(err);
        res.status(500).json({
            success: false,
            message: 'Server error, unable to add room type',
            error: err
        })
    }
})

// UPDATE ONE ROOM TYPE (ADMIN)

router.put('/:id', checkLogin, async (req, res) => {
    try {
        // Only ADMIN can update room types
        const loggedInUser = await prisma.user.findUnique({
            where: {
                id: req.user.id
            }
        })
        if (loggedInUser.role === 'ADMIN') {
            const { name, description, price, bed, meals, thumbnail, cancellation, image, payment } = req.body;

            const roomType = await prisma.hotelRoomType.update({
                where: {
                    id: req.params.id
                },
                data: {
                    name: name,
                    description: description || undefined,
                    price: price,
                    bed: bed,
                    image: image || undefined,
                    payment: payment,
                    meals: meals,
                    thumbnail: thumbnail,
                    cancellation: cancellation,
                }
            })
            res.status(200).json({
                success: true,
                message: 'Room type updated successfully',
                roomType: roomType
            })
        } else {
            res.status(401).json({
                success: false,
                message: 'Unauthorized, only ADMIN can update room types'
            })
        }
    }
    catch (err) {
        res.status(500).json({
            success: false,
            message: 'Server error, unable to update room type',
            error: err
        })
    }
})

// DELETE ONE ROOM TYPE (ADMIN)

router.delete('/:id', checkLogin, async (req, res) => {
    try {
        // Only ADMIN can delete room types
        const loggedInUser = await prisma.user.findUnique({
            where: {
                id: req.user.id
            }
        })
        if (loggedInUser.role === 'ADMIN') {
            const roomType = await prisma.hotelRoomType.delete({
                where: {
                    id: req.params.id
                }
            })
            res.status(200).json({
                success: true,
                message: 'Room type deleted successfully',
                roomType: roomType
            })
        } else {
            res.status(401).json({
                success: false,
                message: 'Unauthorized, only ADMIN can delete room types'
            })
        }
    }
    catch (err) {
        res.status(500).json({
            success: false,
            message: 'Server error, unable to delete room type',
            error: err
        })
    }
})

module.exports = router;