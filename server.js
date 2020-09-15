if (process.env.NODE_ENV !== "production") {
    require("dotenv").config();
}

const express = require("express");
const expressLayouts = require("express-ejs-layouts");
const bodyParser = require("body-parser");
const session = require("express-session");
const mongoose = require("mongoose");
const MongoStore = require("connect-mongo")(session);

const app = express();

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
    console.log(`connected to MongoDb,readyState = ${mongoose.connection.readyState}`);
})

app.set("view engine", "ejs")
app.set("views", __dirname + "/views")
app.set("layout", "layouts/layout")
app.use(expressLayouts)
app.use(express.static("public"))
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

const indexRouter = require("./routes/index");
app.use("/", indexRouter)
const createRouter = require("./routes/create");
app.use("/create", createRouter)

app.listen(process.env.PORT || 3000, () => {
    console.log(`server started on port ${process.env.PORT || 3000}`);
});