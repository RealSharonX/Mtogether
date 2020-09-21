if (process.env.NODE_ENV !== "production") {
    require("dotenv").config();
}

const express = require("express");
const path = require("path");
const bodyParser = require("body-parser");
const socket = require("socket.io");
const session = require("express-session");
const mongoose = require("mongoose");
const passport = require("passport");
const MongoStore = require("connect-mongo")(session);
const discordStrategy = require("./config/pass-disc");

const indexRouter = require("./routes/index");
const createRouter = require("./routes/create");
const authRouter = require("./routes/auth");
const joinRouter = require("./routes/join");

const app = express();

const server = app.listen(process.env.PORT, () => {
    console.log(`server started on port ${process.env.PORT}`);
});

const dbString = process.env.URI;
const dbOptions = {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
}
const db = mongoose.connect(dbString, dbOptions)
const connection = mongoose.connection;
const sessionStore= new MongoStore({
    mongooseConnection: connection,
    collection: "sessions"
});


//db errors check
connection.on("error", () => {
    console.log(error)
});

//connection check
connection.once("open", () => {
    console.log(`connected to MongoDb,readyState is = ${mongoose.connection.readyState}`);
})

let Room = require("../models/room")

const io = socket(server);

app.use((request, response, next) => {
    request.io = io;
    next();
});

io.on("connection", socket => {
    socket.on("userIn", (room) => {
        socket.join(room);
    })
})

app.set("view engine", "ejs")
app.set("views", path.join(__dirname, "/views"));
app.use(express.static(path.join(__dirname, "/public")));
app.use(bodyParser.urlencoded({extended: true}))
app.use(bodyParser.json());
app.use(session({
    secret: process.env.SECRET,
    resave: false,
    saveUninitialized: true,
    store: sessionStore,
    cookie: {
        maxAge: 1000 * 60 * 60 * 24 * 14
    }
}))
app.use(passport.initialize());
app.use(passport.session());
app.use("/", indexRouter)
app.use("/create", createRouter)
app.use("/auth", authRouter)
app.use("/join", joinRouter)