const  DiscordStrategy = require("passport-discord").Strategy;
const passport = require("passport");
const crypto = require("crypto");
const Room = require("../models/room");

passport.serializeUser((room, done) => {
    done(null, room.id);
});

passport.deserializeUser(async (id, done) => {
    const room = await Room.findById(id);
    if (room) {
        done(null, room);
    }
});
passport.use(new DiscordStrategy({
    clientID: process.env.CLIENT_ID,
    clientSecret: process.env.CLIENT_SECRET,
    callbackURL: process.env.CLIENT_REDIRECT,
    scope: [ "identify", "email", "guilds" ]
}, async (accessToken, refreshToken, profile, done) => {
    try {
        const room = await Room.findOne({ creator: profile.id });
        if (room) {
            done(null, room)
        } else {
            const newRoom = await Room.create({
                creatorId: profile.id,
                creatorName: profile.username,
                song: "unknown",
                tracked: false
            });
            const savedRoom = await newRoom.save();
            done(null, savedRoom);
        } 
    } catch (err) {
        console.log(err);
        done(err, null);
    }
}));