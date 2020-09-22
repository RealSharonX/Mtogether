/* eslint-disable no-unused-expressions */
const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const bodyParser = require("body-parser");

//bring model
let Room = require("../models/room")

router.get("/", (req, res) => {
    res.render("join", {
        errors: null,
    })
})

router.post("/", isAuthorized, (req, res) => {
    Room.findOne({_id: req.body.roomName}, (err, docs) => {
        if (err) {
            console.log(err);
            res.render("join", {
                error: "No room found with this code!"
            })
        } else {
            console.log("yh he got a pass let him in");
            res.render("room", {
                roomName: req.body.roomName,
            })
        }
    })
})

function isAuthorized(req, res, next) {
    if (req.isAuthenticated()) {
        console.log("User is logged in.");
        next();
    } else {
        console.log("User is not logged in.");
        res.redirect("/auth");
    }
}

module.exports = router;