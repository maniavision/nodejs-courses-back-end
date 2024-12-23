const mongoose = require('mongoose');
const express = require('express');
const bcrypt = require('bcrypt');
const Joi = require('joi');
const jwt = require('jsonwebtoken');
const config = require('config');
const _ = require('lodash');
const {User} = require('../models/user');
const router = express.Router();

router.post('/', async(req, res) => {
    
    const {error} = validate(req.body);
    
    if(error) {
        return res.status(400).send(error);
    }

    let user = await User.findOne({email: req.body.email});

    if(!user) {
        return res.status(400).send({error: 'Invalid email or password.'});
    }

    passwordCheck = await bcrypt.compare(req.body.password, user.password);
    if(!passwordCheck) return res.status(400).send({error: 'Invalid email or password.'});
    
    const token = jwt.sign({_id: user._id}, config.get('jwtPrivateKey'));
    res.send({token: token});
});

function validate(req) {
    const schema = Joi.object({
        email: Joi.string().min(5).max(255).required().email(),
        password: Joi.string().min(5).max(255).required()
    }).options({abortEarly: false});
    return schema.validate(req);
}

module.exports = router;