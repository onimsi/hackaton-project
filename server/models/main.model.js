const express = require('express')
const mongoose = require('mongoose');
const passport = require('passport');
const session = require('express-session');
const passportLocalMongoose = require('passport-local-mongoose');
// const findOrCreate = require('mongoose-findorcreate');
const db = require('../config/db.config')
const app = express()

app.use(session({
    secret: "this is my first cookies",
    resave: false,
    saveUninitialized: false,
    cookie: { maxAge: 5_000_000}
}))

app.use(passport.initialize());
app.use(passport.session())

const userSchema = new  mongoose.Schema({
    fName: String,
    lName: String,
    phone: Number,
    city: String,
    pCode: Number,
    jobDes: String,
    dob: Date,
})
userSchema.plugin(passportLocalMongoose);

exports.UserModel = mongoose.model("User", userSchema)
