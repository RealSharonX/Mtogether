/* eslint-disable no-unused-expressions */
const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const bodyParser = require("body-parser");

//bring model
let Room = require("../models/room")

router.get("/", isAuthorized, (req, res) => {
    if (req.user.tracked) {
        res.redirect("/create/share")
    } else {
        res.render("create", {
            user: req.user.creatorId,
        });
    }
})

router.post("/", (req, res) => {
    let query = {creatorId: req.body.id};
    let room = {song: req.body.song, tracked: true};
    Room.findOneAndUpdate(query, room, (err, result) => {
        if (err) {
            console.log(err)
        } else {
            if (result.tracked) {
                console.log(`User tracked already, changing song from ${result.song} to ${req.body.song}`);
                req.io.to(result._id).emit("newMusic", req.body.song);
            } else {
                console.log(req.body.id);
                req.io.emit("user-tracked", req.body.id);
            }
        }
    })
    res.sendStatus(200).end();
})

router.get("/share", isAuthorized, (req, res) => {
    res.render("share", {
        share: req.user._id,
    });
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