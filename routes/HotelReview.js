const express = require('express');
const router = express.Router();
const { PrismaClient } = require('@prisma/client')
const checkLogin = require('../middlewares/CheckLogin');
const prisma = new PrismaClient()

// GET ALL HOTEL REVIEWS

router.get('/', checkLogin, async (req, res) => {
    try {
        // get LoggedIn user

        const loggedInUser = await prisma.user.findUnique({
            where: {
                id: req.user.id
            }
        })

        // ADMIN can get all hotel reviews, user will get only his hotel review

        if (loggedInUser.role === 'ADMIN') {
            const hotelReviews = await prisma.hotelReview.findMany()
            res.status(200).json({
                success: true,
                message: 'All hotel reviews fetched successfully',
                hotelReviews: hotelReviews
            })
        } else {
            try {
                const hotelReviews = await prisma.hotelReview.findMany({
                    where: {
                        userId: req.user.id
                    }
                })
                res.status(200).json({
                    success: true,
                    message: 'Requested hotel reviews fetched successfully',
                    hotelReviews: hotelReviews
                })
            }
            catch (err) {
                res.status(404).json({
                    success: false,
                    message: 'Unable to fetch hotel reviews',
                    error: err
                })
            }
        }

    }
    catch (err) {
        res.status(500).json({
            success: false,
            message: 'Server error, unable to fetch hotel reviews',
            error: err
        })
    }
})

// GET ONE HOTELS ALL REVIEWS

router.get('/:hotelId', checkLogin, async (req, res) => {
    try {
        // get single hotel reviews
        const hotelReviews = await prisma.hotelReview.findMany({
            where: {
                hotelId: req.params.hotelId
            }
        })
        res.status(200).json({
            success: true,
            message: 'Requested hotel reviews fetched successfully',
            hotelReviews: hotelReviews
        })
    }
    catch (err) {
        res.status(404).json({
            success: false,
            message: 'Unable to fetch hotel reviews',
            error: err
        })
    }

})



// POST HOTEL REVIEW 

router.post('/', checkLogin, async (req, res) => {
    try {
        // get LoggedIn user

        const loggedInUser = await prisma.user.findUnique({
            where: {
                id: req.user.id
            }
        })

        // TODO USER CAN ONLY POST REVIEW IF HE BOOKED THE HOTEL

        const { hotelId, rating, review, title, hotelName } = req.body;
        const hotelReview = await prisma.hotelReview.create({

            data: {
                hotelId: hotelId,
                userId: loggedInUser.id,
                title: title,
                rating: rating,
                review: review,
                hotelName: hotelName,
            }
        })
        res.status(200).json({
            success: true,
            message: 'Hotel review added successfully',
            hotelReview: hotelReview
        })
    }
    catch (err) {
        res.status(500).json({
            success: false,
            message: 'Server error, unable to add hotel review',
            error: err
        })
    }
})







module.exports = router;
