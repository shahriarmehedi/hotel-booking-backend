const express = require('express');
const router = express.Router();
const { PrismaClient } = require('@prisma/client')
const checkLogin = require('../middlewares/CheckLogin');
const prisma = new PrismaClient()

// GET ALL HOLIDAY PACKAGES (ALL USERS CAN ACCESS)

router.get('/', async (req, res) => {

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

// GET SINGLE HOLIDAY PACKAGE (ALL USERS CAN ACCESS)

router.get('/:id', async (req, res) => {

    try {
        const holidayPackage = await prisma.holidayPackages.findUnique({
            where: {
                id: req.params.id
            }
        })
        res.status(200).json({
            success: true,
            message: 'Holiday package fetched successfully',
            holidayPackage: holidayPackage
        })

    } catch (err) {
        res.status(500).json({
            success: false,
            message: 'Server error, unable to fetch holiday package',
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
            const { name, description, price, image, gallery, rating, instantConf, freeCancel, halalRating, duration, from, to, airtime, inclusions, exclusions, groupsize, thumbnail } = req.body;
            const newHolidayPackage = await prisma.holidayPackages.create({
                data: {
                    name: name || null,
                    description: description || null,
                    price: price || null,
                    image: image || null,
                    gallery: gallery || null,
                    rating: rating || null,
                    instantConf: instantConf || null,
                    freeCancel: freeCancel || null,
                    halalRating: halalRating || null,
                    duration: duration || null,
                    from: from,
                    to: to || null,
                    airtime: airtime || null,
                    inclusions: inclusions || null,
                    exclusions: exclusions || null,
                    groupsize: groupsize || null,
                    thumbnail: thumbnail || ""
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
        console.log(err);
    }
})

module.exports = router;
