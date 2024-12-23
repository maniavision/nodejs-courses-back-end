const mongoose = require('mongoose');
const Joi = require('joi'); // for validation

// Schema
const courseSchema = new mongoose.Schema({
    name: {
        type: String,
        require: true,
        minLength: 3,
        maxLength: 25
    },
    price: {
        type: Number,
        require: function() {return !this.isDiscontinued},
        min: 850.00,
        max: 1200.00,
        set: v => Math.round(v), // Custom function used to set the price
        get: v => Math.round(v) // Custom function used to get the price
    },
    startDate: {
        type: Date,
        default: Date.now
    },
    length: {
        type: String,
        require: function() {return !this.isDiscontinued},
        enum: ['3-Months', '6-Months']
    },
    instructor: {
        type: Array,
        validate: { // Custom validator
            validator: function(v){
                return v && v.length > 0;
            },
            message: 'An instructor should have at least one tag.'
        }
    },
    isDiscontinued: {
        type: Boolean,
        require: true
    }
});

// Create Class
const Course = mongoose.model('Course', courseSchema);

function validateCourse(course) {
    const schema = Joi.object({
        // id: Joi.number(),
        name: Joi.string().min(3).max(25).required(),
        price: Joi.number(),
        startDate: Joi.date(),
        length: Joi.string(),
        instructor: Joi.array(),
        isDiscontinued: Joi.boolean()
    }).options({abortEarly: false});

    return schema.validate(course);
}

module.exports = {Course, validateCourse};