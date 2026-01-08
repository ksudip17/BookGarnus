import mongoose from "mongoose";

const bookingSchema = new mongoose.Schema ({
    name : {
        type:String,
        required: [true, "Name is Required"],
        trim: true,
        minLength: 3,
        maxLength: 50,
    },
    email: {
        type:String,
        required: [true, 'email is required'],
        lowercase: true, 
        unique: true, 
        match: [/\S+@\S+\.\S+/, 'Please fill a valid email address']
    } ,
    date: {
        type: String,
        required: [true, 'date is required'],
    }, 
    phone: {
        type : Number,
        trim: true,
    }
}, {
    timestamps: true
});

const Bookings = mongoose.model('Bookings', bookingSchema);

export default Bookings;



