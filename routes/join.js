/* eslint-disable no-unused-expressions */
const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const bodyParser = require("body-parser");

//bring model
let Room = require("../models/room")

router.get("/", (req, res) => {
    res.render("join", {
        error: null,
    })
})

router.post("/", (req, res) => {
    Room.findById(req.body.roomName, (err, docs) => {
        if (err) {
            console.log(err);
            res.render("join", {
                error: "No room found with this code!"
            })
        } else {
            if (!docs) {
                console.log(docs);
                res.render("join", {
                    error: "No room found with this code!"
                })
            } else {
                console.log("yh he got a pass let him in");
                console.log(req.body.roomName);
                res.render("room", {
                    roomName: req.body.roomName,
                    currentSong: docs.song,
                })
            }
        }
    })
})

module.exports = router;