const express = require('express');
const path = require("path");
const mongoose = require('mongoose');
const router = require('./routes/user-routes')
const cookieParser = require("cookie-parser");
const cors = require('cors');
require("dotenv").config();
const app = express();

app.use(cors({ credentials: true, origin: "http://localhost:3000" }));
app.use(cookieParser());
app.use(express.json());
app.use("/api", router);

mongoose.connect(process.env.MONGO_URI)
    .then(() => {
        app.listen(process.env.PORT || 5000);
        console.log("Database is connected! Listening to localhost 5000");
    })
    .catch((err) => console.log(err));

if (process.env.NODE_ENV === "production") {
    app.use(express.static("client/build"));
    app.get("*", (req, res) => {
        res.sendFile(path.resolve(__dirname, "client", "build", "index.html"))
    })
}

//possible error using static adding ../