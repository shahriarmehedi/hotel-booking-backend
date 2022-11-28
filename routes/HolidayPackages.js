const express = require('express');
const router = express.Router();
const { PrismaClient } = require('@prisma/client')
const checkLogin = require('../middlewares/CheckLogin');
const prisma = new PrismaClient()

// GET ALL HOLIDAY PACKAGES (ALL USERS CAN ACCESS)

router.get('/', checkLogin, async (req, res) => {

    try {
        const holidayPackages = await prisma.holidayPackages.findMany()
        res.status(200).json({
            success: true,
            message: 'All holiday packages fetched successfully',
            holidayPackages: holidayPackages
        })

    } catch (err) {
        res.status(500).json({
            success: false,
            message: 'Server error, unable to fetch holiday packages',
            error: err
        })
    }

})

// POST A HOLIDAY PACKAGE (ONLY ADMIN CAN ACCESS)

router.post('/', checkLogin, async (req, res) => {

    try {
        // get LoggedIn user
        const loggedInUser = await prisma.user.findUnique({
            where: {
                id: req.user.id
            }
        })

        // ADMIN can post a holiday package
        if (loggedInUser.role === 'ADMIN') {
            const { name, description, price, image, rating, instantConf, freeCancel, halalRating, area, package, duration } = req.body;
            const newHolidayPackage = await prisma.holidayPackages.create({
                data: {
                    name: name,
                    description: description,
                    price: price,
                    image: image,
                    rating: rating,
                    instantConf: instantConf,
                    freeCancel: freeCancel,
                    halalRating: halalRating,
                    area: area,
                    package: package,
                    duration: duration

                }
            })
            res.status(200).json({
                success: true,
                message: 'Holiday package created successfully',
                holidayPackage: newHolidayPackage
            })
        } else {
            res.status(401).json({
                success: false,
                message: 'Unauthorized, only admin can post a holiday package'
            })
        }
    }
    catch (err) {
        res.status(500).json({
            success: false,
            message: 'Server error, unable to create holiday package',
            error: err
        })
    }
})

module.exports = router;
