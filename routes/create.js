/* eslint-disable no-unused-expressions */
const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const crypto = require("crypto");
const bodyParser = require("body-parser");
const { check, validationResult } = require("express-validator");
let Room = require("../models/room");

router.get("/", (req, res) => {
    res.render("create", {
        errors: null,
    })
})

router.get("/bot", (req, res) => {
    res.render("inviteBot", {
        creator: req.session.creator
    })
})

router.post("/", [
    check("discId").not().isEmpty().withMessage("discord ID is required!"),
    check("discId")
        .custom((value, {req, loc, path}) => {
            let str = value.split("#");
            if (value == str) {
                throw new Error("wrong discord id no # found");
            } else if (str.length > 2) {
                throw new Error("wrong discord id more than 2 # found")
            } else if (!(value.split(" ") == value)) {
                throw new Error("wrong discord id spaces found in name")
            }else if (isNaN(Number(str[1]))) {
                throw new Error("letters found in the numbers part")
            } else if (str[1].length < 4) {
                throw new Error("wrong discord id 4 numbers required after #")
            } else if (str[1].length > 4) {
                throw new Error("wrong discord id more than 4 numbers after #")
            } else {
                return value;
            }
        }).withMessage("wrong discord id")
], (req, res, error) => {
    
    const errors = validationResult(req);
    console.log(req.body);
    
    if (!errors.isEmpty()) {
        res.render("create", {
            errors: errors.errors[0].msg
        });
    } else {
        let newRoom = new Room({
            joinId: genRoom(10),
            creator: req.body.discId,
            fans: [],
            song: "unknown",
        });
        req.session.creator = newRoom.creator;
        req.session.save()
        newRoom.save((err) => {
            if (err) {
                console.log(err);
            } else {
                res.redirect("/create/bot")
            }
        })
    }
})

function genRoom(length) {
    let id = String(crypto.randomBytes(length).toString("hex"));
    return id;

}
module.exports = router;