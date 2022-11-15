const express = require('express');
const router = express.Router();
const { PrismaClient } = require('@prisma/client')
const checkLogin = require('../middlewares/CheckLogin');
const prisma = new PrismaClient()


// GET ALL HOTELS

router.get('/', checkLogin, async (req, res) => {
    try {
        const hotels = await prisma.hotel.findMany()
        res.status(200).json(hotels)
    } catch (err) {
        res.status(404).json({ message: 'Something went wrong', error: err })
    }
})

// GET ONE HOTEL

router.get('/:id', checkLogin, async (req, res) => {
    try {
        const hotel = await prisma.hotel.findUnique({
            where: {
                id: req.params.id
            }
        })
        res.status(200).json(hotel)
    } catch (err) {
        res.status(404).json({ message: 'Something went wrong', error: err })
    }
})

// CREATE HOTEL

router.post('/', checkLogin, async (req, res) => {
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
                    amenities: req.body.amenities,
                    gallery: req.body.gallery,
                    location: req.body.location,
                    city: req.body.city,
                    address: req.body.address,
                    country: req.body.country,
                    HotelReview: [],
                    HotelRoom: req.body.HotelRoom
                }
            })
            res.status(201).json(hotel)
        } catch (err) {
            res.status(404).json({ message: 'Something went wrong', error: err })
        }
    } else {
        res.status(401).json({ message: 'Unauthorized' })
    }
})

// UPDATE HOTEL

router.patch('/:id', checkLogin, async (req, res) => {

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
                    name: req.body.name,
                    address: req.body.address,
                    city: req.body.city,
                    country: req.body.country,
                    description: req.body.description,
                    image: req.body.image,
                    price: req.body.price,
                    stars: req.body.stars,
                    user: {
                        connect: {
                            id: req.user.id
                        }
                    }
                }
            })
            res.status(200).json(hotel)
        } catch (err) {
            res.status(400).json({ message: 'Something went wrong', error: err })
        }
    } else {
        res.status(401).json({ message: 'Unauthorized' })
    }

})

// DELETE HOTEL

router.delete('/:id', checkLogin, async (req, res) => {

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
            res.status(200).json(hotel)
        } catch (err) {
            res.status(400).json({ message: 'Something went wrong', error: err })
        }
    } else {
        res.status(401).json({ message: 'Unauthorized' })
    }
})


module.exports = router;





