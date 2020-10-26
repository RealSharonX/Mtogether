const mongoose = require("mongoose");

//Room scheme

const roomSchema = mongoose.Schema({
    creatorId: {
        type: String,
        trim: true,
        required: true,
        unique: true,
    },
    creatorName: {
        type: String,
        trim: true,
        required: true,
        unique: true,
    },
    song: {
        type: String,
        required: true,
    },
    tracked: {
        type: Boolean,
        required: true,
    },
});

const Room = module.exports = mongoose.model("Room", roomSchema, "rooms");