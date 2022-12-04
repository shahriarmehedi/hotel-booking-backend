const express = require('express');
const router = express.Router();
const { PrismaClient } = require('@prisma/client')
const checkLogin = require('../middlewares/CheckLogin');
const prisma = new PrismaClient()

// GET ALL BOOKINGS

router.get('/', checkLogin, async (req, res) => {

    try {
        // get LoggedIn user
        const loggedInUser = await prisma.user.findUnique({
            where: {
                id: req.user.id
            }
        })

        // ADMIN can get all bookings, user will get only his bookings
        if (loggedInUser.role === 'ADMIN') {
            const bookings = await prisma.booking.findMany()
            res.status(200).json({
                success: true,
                message: 'All bookings fetched successfully',
                bookings: bookings
            })
        } else {
            const bookings = await prisma.booking.findMany({
                where: {
                    userId: req.user.id
                }
            })
            res.status(200).json({
                success: true,
                message: 'Requested bookings fetched successfully',
                bookings: bookings
            })
        }
    }
    catch (err) {
        res.status(404).json({
            success: false,
            message: 'Unable to fetch all bookings',
            error: err
        })
    }

})

// GET ONE BOOKING

router.get('/:id', checkLogin, async (req, res) => {

    try {
        // admin can get all bookings and user can only get his bookings
        // GET LOGGED IN USER
        const loggedInUser = await prisma.user.findUnique({
            where: {
                id: req.user.id
            }
        })

        // GET BOOKING
        const booking = await prisma.booking.findUnique({
            where: {
                id: parseInt(req.params.id)
            }
        })

        // CHECK IF USER IS ADMIN OR USER IS THE OWNER OF THE BOOKING
        if (loggedInUser.role === 'ADMIN' || booking.userId === req.user.id) {
            res.status(200).json({
                success: true,
                message: 'Requested booking fetched successfully',
                booking: booking
            })
        } else {
            res.status(401).json({
                success: false,
                message: 'You are not authorized to view this booking'
            })
        }
    }
    catch (err) {
        res.status(404).json({
            success: false,
            message: 'Unable to fetch booking',
            error: err
        })
    }

})

// CREATE BOOKING

router.post('/', checkLogin, async (req, res) => {

    try {
        // get LoggedIn user
        const loggedInUser = await prisma.user.findUnique({
            where: {
                id: req.user.id
            }
        })

        // create booking
        const booking = await prisma.booking.create({
            data: {
                userId: loggedInUser.id,
                carId: req.body.carId,
                startDate: req.body.startDate,
                endDate: req.body.endDate
            }
        })

        res.status(201).json({
            success: true,
            message: 'Booking created successfully',
            booking: booking
        })
    }
    catch (err) {
        res.status(404).json({
            success: false,
            message: 'Unable to create booking',
            error: err
        })
    }

})

// UPDATE BOOKING

router.put('/:id', checkLogin, async (req, res) => {

    try {
        // get LoggedIn user
        const loggedInUser = await prisma.user.findUnique({
            where: {
                id: req.user.id
            }
        })

        // get booking
        const booking = await prisma.booking.findUnique({
            where: {
                id: parseInt(req.params.id)
            }
        })

        // check if user is admin or user is the owner of the booking
        if (loggedInUser.role === 'ADMIN' || booking.userId === req.user.id) {
            // update booking
            const updatedBooking = await prisma.booking.update({
                where: {
                    id: parseInt(req.params.id)
                },
                data: {
                    startDate: req.body.startDate,
                    endDate: req.body.endDate
                }
            })

            res.status(200).json({
                success: true,
                message: 'Booking updated successfully',
                booking: updatedBooking
            })
        } else {
            res.status(401).json({
                success: false,
                message: 'You are not authorized to update this booking'
            })
        }
    }
    catch (err) {
        res.status(404).json({
            success: false,
            message: 'Unable to update booking',
            error: err
        })
    }

})

// DELETE BOOKING

router.delete('/:id', checkLogin, async (req, res) => {

    try {
        // get LoggedIn user
        const loggedInUser = await prisma.user.findUnique({
            where: {
                id: req.user.id
            }
        })

        // get booking
        const booking = await prisma.booking.findUnique({
            where: {
                id: parseInt(req.params.id)
            }
        })

        // check if user is admin or user is the owner of the booking
        if (loggedInUser.role === 'ADMIN' || booking.userId === req.user.id) {
            // delete booking
            const deletedBooking = await prisma.booking.delete({
                where: {
                    id: parseInt(req.params.id)
                }
            })

            res.status(200).json({
                success: true,
                message: 'Booking deleted successfully',
                booking: deletedBooking
            })
        } else {
            res.status(401).json({
                success: false,
                message: 'You are not authorized to delete this booking'
            })
        }
    }
    catch (err) {
        res.status(404).json({
            success: false,
            message: 'Unable to delete booking',
            error: err
        })
    }

})

module.exports = router