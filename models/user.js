const mongoose = require('mongoose');
const Joi = require('joi');
const jwt = require('jsonwebtoken');
const config = require('config');

const userSchema = new mongoose.Schema({
    userName: {
        type: String,
        require: true,
        minLength: 3,
        maxLength: 25
    },
    email: {
        type: String,
        require: true,
        minLength: 3,
        maxLength: 40,
        unique: true
    },
    password: {
        type: String,
        require: true,
        minLength: 3,
        maxLength: 1200
    },
    isAdmin: Boolean
});

userSchema.methods.generateAuthToken = function() {
    const token = jwt.sign({_id: this._id, isAdmin: this.isAdmin}, config.get('jwtPrivateKey'));
    return token;
};

const User = mongoose.model('User', userSchema);

function validateUser(user) {
    const schema = Joi.object({
        userName: Joi.string().min(3).max(25).required(),
        email: Joi.string().min(3).max(40).email().required(),
        password: Joi.string().min(3).max(30).required()
    }).options({abortEarly: false});
    return schema.validate(user);
}

module.exports = {
    User,
    validateUser
};