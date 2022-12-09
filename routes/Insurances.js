const express = require('express');
const router = express.Router();
const { PrismaClient } = require('@prisma/client')
const checkLogin = require('../middlewares/CheckLogin');
const prisma = new PrismaClient()

// GET ALL INSURANCES

router.get('/', checkLogin, async (req, res) => {

    try {

        const insurances = await prisma.insurances.findMany()
        res.status(200).json({
            success: true,
            message: 'All insurances fetched successfully',
            insurances: insurances
        })


    } catch (err) {
        res.status(500).json({
            success: false,
            message: 'Server error, unable to fetch insurances',
            error: err
        })
    }


})

// POST INSURANCE (ADMIN ONLY)

router.post('/', checkLogin, async (req, res) => {

    try {
        // get LoggedIn user
        const loggedInUser = await prisma.user.findUnique({
            where: {
                id: req.user.id
            }
        })

        // ADMIN can post insurance
        if (loggedInUser.role === 'ADMIN') {

            const { name, description, price, image, rating, halalRating, freeCancel, instantConf, area, packageName } = req.body;

            const insurance = await prisma.insurances.create({
                data: {
                    name: name,
                    description: description,
                    price: price,
                    image: image,
                    rating: rating,
                    halalRating: halalRating,
                    freeCancel: freeCancel,
                    instantConf: instantConf,
                    area: area,
                    packageName: packageName

                }
            })
            res.status(200).json({
                success: true,
                message: 'Insurance created successfully',
                insurance: insurance
            })
        } else {
            res.status(401).json({
                success: false,
                message: 'Unauthorized, only admin can create insurance'
            })
        }
    }
    catch (err) {
        res.status(500).json({
            success: false,
            message: 'Server error, unable to create insurance',
            error: err
        })
    }
})

module.exports = router;