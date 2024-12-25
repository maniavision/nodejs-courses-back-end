const mongoose = require('mongoose');
const express = require('express');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const config = require('config');
const _ = require('lodash');
const {User, validateUser} = require('../models/user');
const {passwordValidation} = require('../password-validation');
const router = express.Router();

router.post('/', async(req, res) => {
    
    const {error} = validateUser(req.body);
    
    if(error) {
        return res.status(400).send(error);
    }

    let user = await User.findOne({email: req.body.email});

    if(user) {
        return res.status(400).send({error: 'User already registered.'});
    }

    // user = new User({
    //     userName: req.body.userName,
    //     email: req.body.email,
    //     password: req.body.password
    // });

    user = new User(_.pick(req.body, ['userName', 'email', 'password']));
    passwordValidation(user.password);
    user.password = await bcrypt.hash(user.password, 10);
    const savedUser = await user.save(user);
    const token = user.generateAuthToken();
    res.header('x-auth-token', token).status(200).send(_.pick(user, ['_id', 'userName', 'email']));
});

module.exports = router;