const express = require('express');
const router = express.Router();
const { PrismaClient } = require('@prisma/client')
const checkLogin = require('../middlewares/CheckLogin');
const prisma = new PrismaClient()

// GET ALL ACTIVITIES

router.get('/', async (req, res) => {
    try {
        const activities = await prisma.activities.findMany()
        res.status(200).json({
            success: true,
            message: 'All activities fetched successfully',
            activities: activities
        })
    }
    catch (err) {
        res.status(500).json({
            success: false,
            message: 'Server error, unable to fetch activities',
            error: err
        })
    }
})

// POST ACTIVITY (ADMIN)

router.post('/', checkLogin, async (req, res) => {
    try {
        // Only ADMIN can add activities
        const loggedInUser = await prisma.user.findUnique({
            where: {
                id: req.user.id
            }
        })
        if (loggedInUser.role === 'ADMIN') {
            const { name, description, image, price, halalRating, InstantConf, freeCancel, date, adults, children, rating } = req.body;
            const activity = await prisma.activities.create({
                data: {
                    name: name,
                    description: description,
                    image: image,
                    price: price,
                    halalRating: halalRating,
                    InstantConf: InstantConf,
                    freeCancel: freeCancel,
                    date: date,
                    adults: adults,
                    children: children,
                    rating: rating

                }
            })
            res.status(200).json({
                success: true,
                message: 'Activity added successfully',
                activity: activity
            })
        }
        else {
            res.status(403).json({
                success: false,
                message: 'You are not authorized to add activities'
            })
        }
    }
    catch (err) {
        console.log(err);
        res.status(500).json({
            success: false,
            message: 'Server error, unable to add activity',
            error: err
        })
    }
})

module.exports = router;