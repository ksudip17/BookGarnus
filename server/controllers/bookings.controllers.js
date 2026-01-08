import Bookings from "../models/bookings.model.js";

export const getAllBookings = async (req, res, next) => {
    try {
        const allBookings = await Bookings.find();

        res.status(200).json({
            sucess:true,
            data:allBookings,
        });
    } catch (err) {
        next(err);
    }
}

export const getBookingById = async (req, res, next) => {
    try {
    const { id } = req.params;
    const booking = await Bookings.findById(id);

    if (!booking) {
        const error = new Error('booking not found in the database');
        error.statusCode = 404;
        throw error
    }

    res.status(200).json({
        success:true,
        message:'booking found successfully',
        data:booking,
    })

    } catch (error) {
        next(error);
    }
}

export const createBooking = async(req, res, next) => {
    try {
        const {name, email, phone, date} = req.body;

        if(!name || !date) {
            const error = new Error("name and date are required");
            error.statusCode = 409;
            throw error;
        }

        const existBooking = await Bookings.findOne({
            name:name,
            date:date
        })

        if(existBooking) {
            const error = new Error("Booking already exist");
            error.statusCode = 409;
            throw error;
        }

        const booking = new Bookings(req.body)
        await booking.save();

        res.status(201).json({
            sucess:true, 
            message:"Booking created sucessfully",
            data:booking,
        })

    } catch(err) {
        next(err);
    }
}

export const updateBookingById = async (req, res, next) => {
    try {
    const { id } = req.params;
    const updtBooking = await Bookings.findByIdAndUpdate(id, req.body, {new:true}, {runValidators:true});

    if (!updtBooking) {
        const error = new Error('booking not found in the database');
        error.statusCode = 404;
        throw error
    }

    res.status(200).json({
        success:true,
        message:'booking update successfully',
        data:updtBooking,
    })
    } catch (error) {
        next(error);
    }
}

export const deleteBookingById = async(req, res, next) => {
    try {
        const { id } = req.params;
    const deleteBooking = await Bookings.findByIdAndDelete(id);

    if(!deleteBooking) {
        const error = new Error("Booking not found in the database");
        error.statusCode = 404;
        throw error
    }

    res.status(200).json({
        sucess:true,
        message:"Booking deleted Sucessfully",
    });

    } catch(error) {
        next(error);
    }
}



