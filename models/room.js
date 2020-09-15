const mongoose = require("mongoose");

//Room scheme

const roomSchema = mongoose.Schema({
    joinId: {
        type: String,
        trim: true,
        required: true,
        unique: true,
    },
    creator: {
        type: String,
        trim: true,
        required: true,
        unique: true,
    },
    fans: {
        type: Array,
        required: true,
    },
    song: {
        type: String,
        required: true,
    }
});

const Room = module.exports = mongoose.model("Room", roomSchema, "rooms");