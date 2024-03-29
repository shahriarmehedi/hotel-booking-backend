const express = require('express');
const router = express.Router();
const { PrismaClient } = require('@prisma/client')
const checkLogin = require('../middlewares/CheckLogin');
const prisma = new PrismaClient()


// GET ALL HOTELS

router.get('/', async (req, res) => {
    try {
        const hotels = await prisma.hotel.findMany()
        res.status(200).json({
            success: true,
            message: 'All hotels fetched successfully',
            hotels: hotels
        })
    }
    catch (err) {
        console.log(err)
        res.status(500).json({
            success: false,
            message: 'Server error, unable to fetch hotels',
            error: err
        })
    }

})

// GET ONE HOTEL

router.get('/:id', async (req, res) => {

    try {
        try {
            const hotel = await prisma.hotel.findUnique({
                where: {
                    id: req.params.id
                }
            })
            res.status(200).json({
                success: true,
                message: 'Requested hotel fetched successfully',
                hotel: hotel
            })
        } catch (err) {
            res.status(404).json({
                success: false,
                message: 'Unable to fetch requested hotel',
                error: err
            })
        }
    }
    catch (err) {
        res.status(404).json({
            success: false,
            message: 'Unable to fetch requested hotel',
            error: err
        })
    }
})

// CREATE HOTEL

router.post('/', checkLogin, async (req, res) => {

    try {
        // only admin can create hotel
        // GEt logged in user
        const loggedInUser = await prisma.user.findUnique({
            where: {
                id: req.user.id
            }
        })
        if (loggedInUser.role === 'ADMIN') {
            try {
                const hotel = await prisma.hotel.create({
                    data: {
                        name: req.body.name,
                        description: req.body.description,
                        rating: req.body.rating,
                        halalRatingTotal: req.body.halalRatingTotal,
                        halalRating: req.body.halalRating,
                        roomType: req.body.roomType,
                        price: req.body.price,
                        image: req.body.image,
                        slug: req.body.slug,
                        language: req.body.language,
                        thumbnail: req.body.thumbnail || null,
                        gallery: req.body.gallery || null,
                        location: req.body.location,
                        city: req.body.city,
                        address: req.body.address,
                        country: req.body.country,
                        amenities: req.body.amenities,
                    }
                })
                res.status(201).json({
                    success: true,
                    message: 'Hotel created successfully',
                    hotel: hotel
                })
            } catch (err) {
                console.log(err)
                res.status(404).json({
                    success: false,
                    message: 'Something went wrong',
                    error: err
                })
            }
        } else {
            res.status(401).json({
                success: false,
                message: 'You are not authorized to create hotel'
            })
        }
    }
    catch (err) {
        res.status(404).json({
            success: false,
            message: 'Unable to create hotel',
            error: err
        })
    }
})

// UPDATE HOTEL

router.put('/:id', checkLogin, async (req, res) => {

    try {
        // only admin can update hotel
        // GEt logged in user
        const loggedInUser = await prisma.user.findUnique({
            where: {
                id: req.user.id
            }
        })

        if (loggedInUser.role === 'ADMIN') {
            try {
                const hotel = await prisma.hotel.update({
                    where: {
                        id: req.params.id
                    },
                    data: {
                        name: req.body.name || hotel.name,
                        description: req.body.description || hotel.description,
                        rating: req.body.rating || hotel.rating,
                        halalRatingTotal: req.body.halalRatingTotal || hotel.halalRatingTotal,
                        halalRating: req.body.halalRating || hotel.halalRating,
                        roomType: req.body.roomType || hotel.roomType,
                        price: req.body.price || hotel.price,
                        image: req.body.image || hotel.image,
                        slug: req.body.slug || hotel.slug,
                        language: req.body.language || hotel.language,
                        thumbnail: req.body.thumbnail || hotel.thumbnail,
                        gallery: req.body.gallery || hotel.gallery,
                        location: req.body.location || hotel.location,
                        city: req.body.city || hotel.city,
                        address: req.body.address || hotel.address,
                        country: req.body.country || hotel.country,
                        amenities: req.body.amenities || hotel.amenities,

                    }
                })
                res.status(200).json({
                    success: true,
                    message: 'Hotel updated successfully',
                    hotel: hotel
                })
            } catch (err) {
                res.status(400).json({
                    success: false,
                    message: 'Unable to update hotel',
                    error: err
                })
            }
        } else {
            res.status(401).json({
                success: false,
                message: 'You are not authorized to update hotel'
            })
        }
    }
    catch (err) {
        console.log(err);
        res.status(404).json({
            success: false,
            message: 'Unable to update hotel',
            error: err
        })
        console.log(err)
    }

})

// DELETE HOTEL

router.delete('/:id', checkLogin, async (req, res) => {

    try {
        // only admin can delete hotel
        // GEt logged in user
        const loggedInUser = await prisma.user.findUnique({
            where: {
                id: req.user.id
            }
        })

        if (loggedInUser.role === 'ADMIN') {
            try {
                const hotel = await prisma.hotel.delete({
                    where: {
                        id: req.params.id
                    }
                })
                res.status(200).json({
                    success: true,
                    message: 'Hotel deleted successfully',
                    hotel: hotel
                })
            } catch (err) {
                res.status(400).json({
                    success: false,
                    message: 'Something went wrong',
                    error: err
                })
            }
        } else {
            res.status(401).json({
                success: false,
                message: 'You are not authorized to delete hotel'
            })
        }
    }
    catch (err) {
        res.status(404).json({
            success: false,
            message: 'Unable to delete hotel',
            error: err
        })
    }
})


module.exports = router;





