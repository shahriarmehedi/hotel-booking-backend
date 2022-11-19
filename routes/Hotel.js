const express = require('express');
const router = express.Router();
const { PrismaClient } = require('@prisma/client')
const checkLogin = require('../middlewares/CheckLogin');
const prisma = new PrismaClient()


// GET ALL HOTELS

router.get('/', checkLogin, async (req, res) => {

    try {
        // get LoggedIn user
        const loggedInUser = await prisma.user.findUnique({
            where: {
                id: req.user.id
            }
        })
        console.log(loggedInUser);

        // ADMIN can get all hotels, user will get only his hotels
        if (loggedInUser.role === 'ADMIN') {
            console.log("yes I am admin");
            const hotels = await prisma.hotel.findMany()
            console.log(hotels);
            res.status(200).json({
                success: true,
                message: 'All hotels fetched successfully',
                hotels: hotels
            })
        } else {
            const hotels = await prisma.hotel.findMany({
                where: {
                    userId: req.user.id
                }
            })
            res.status(200).json({
                success: true,
                message: 'Requested hotels fetched successfully',
                hotels: hotels
            })
        }
    }

    catch (err) {
        res.status(404).json({
            success: false,
            message: 'Unable to fetch all hotels',
            error: err
        })
    }

})

// GET ONE HOTEL

router.get('/:id', checkLogin, async (req, res) => {

    try {
        // admin can get all hotels and user can only get his hotels
        // GET LOGGED IN USER
        const loggedInUser = await prisma.user.findUnique({
            where: {
                id: req.user.id
            }
        })

        if (loggedInUser.role === 'ADMIN') {
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
        } else {
            try {
                // if user request his own hotel then he can get it
                const hotel = await prisma.hotel.findUnique({
                    where: {
                        id: req.params.id,
                        userId: req.user.id
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
                        halalRating: req.body.halalRating,
                        price: req.body.price,
                        image: req.body.image,
                        thumbnail: req.body.thumbnail,
                        gallery: req.body.gallery,
                        location: req.body.location,
                        city: req.body.city,
                        address: req.body.address,
                        country: req.body.country,
                    }
                })
                res.status(201).json({
                    success: true,
                    message: 'Hotel created successfully',
                    hotel: hotel
                })
            } catch (err) {
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
                        halalRating: req.body.halalRating || hotel.halalRating,
                        price: req.body.price || hotel.price,
                        image: req.body.image || hotel.image,
                        thumbnail: req.body.thumbnail || hotel.thumbnail,
                        gallery: req.body.gallery || hotel.gallery,
                        location: req.body.location || hotel.location,
                        city: req.body.city || hotel.city,
                        address: req.body.address || hotel.address,
                        country: req.body.country || hotel.country,

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
        res.status(404).json({
            success: false,
            message: 'Unable to update hotel',
            error: err
        })
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





