//jshint esversions:6
const express = require("express");
const db = require('../config/db.config');
const mongoose = require('mongoose');
const mod = require('../models/main.model')
const cors = require("cors");
const bodyParser = require('body-parser');
const passport = require('passport');

const app = express();
app.use(bodyParser.urlencoded({extended: true}));

app.use(cors())

mongoose.connect(db.url, {useNewUrlParser: true});


exports.register = (req, res)=>{
    const reg ={
        fName: req.body.fName,
        lName: req.body.lName,
        phone: req.body.phone,
        username: req.body.username,
        conPass: req.body.conPass,
        city: req.body.city,
        pCode: req.body.pCode,
        jobDes: req.body.jobDes,
        dob: req.body.dob,
        
    }
    if (reg.conPass === req.body.password){
        mod.UserModel.register(reg, req.body.password, (err, user)=>{    
            if(!err ){
                res.send({check: user})
            } else {
                res.send({err})
            }
        })
    } else {
        res.send({check: "Password doesn't match"})
    }
}

exports.login = (req, res)=>{
    const log = new mod.UserModel({
        username: req.body.username,
        password: req.body.password,
    })
    
    req.login(log, (err, user)=>{
        if(err){
            res.send({check: err});
        } else {
            passport.authenticate('local')(req, res, ()=>{
                res.send({user: req.user});
            })
        } 
    })
}

exports.update = (req, res) =>{
    mod.UserModel.findByIdAndUpdate(req.params.id, {$set: req.body}, (err)=>{
        !err ? res.send({check: true, msg: "successfully updated"}): res.send(err)
    })
}

exports.findOneUser = (req, res)=>{
    mod.UserModel.findById(req.params.id, (err, user)=>{
        res.send({user})
    })
}

exports.profile = (req, res)=>{
    if(req.isAuthenticated()){
        res.send({check: req.user})
    } else {
        res.send({check: false, msg: "You are not login. Login first to access your profile"})
    }
}

exports.getAll = (req, res)=>{
    mod.UserModel.find({}, (err, user)=>{
        res.send(user)
    })
}

exports.logout = (req, res)=>{
    req.logOut((err)=>{
        !err ? res.send({check: true, msg: "successfully logout"}): res.send(err)
    })
}