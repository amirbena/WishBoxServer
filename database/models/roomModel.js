const mongoose = require('mongoose');

const RoomModel = new mongoose.Schema({
    number: {
        type: String,
        required: true,
        unique: true
    },
    guestsCapacity: {
        type: Number,
        required: true,
        default: 1
    },
    priceForNight: {
        type: Number,
        required: true,
    }
})


module.exports = mongoose.model("Room", RoomModel);