const mongoose = require('mongoose');
const { Types } = mongoose;


const ReservationSchema = new mongoose.Schema({
    user: {
        type: Types.ObjectId,
        required: true,
        ref: "User"
    },
    room: {
        type: Types.ObjectId,
        required: true,
        ref: "Room"
    },
    startDate: {
        type: Date,
        required: true,
        default: new Date(),
    },
    endDate: {
        type: Date,
        required: true,
        default: new Date()
    },
    totalPrice: {
        type: Number,
        required: true
    },
    extras: {
        type: [String],
        required: true,
        default: []
    }
})


module.exports = mongoose.model("Reservation", ReservationSchema);