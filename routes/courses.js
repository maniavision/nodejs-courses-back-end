const express = require('express');
const stdDbDebugger = require('debug')('app::db');
const {Course, validateCourse}= require('../models/course');
const auth = require('../middleware/auth');
const admin = require('../middleware/admin');
const createCourses = require('../create-courses');
const router = express.Router();


router.get(`/`, async (req, res)=>{
    const {search} = req.query;
    const courses = await Course.find();
    let filteredCourses = [...courses];

    if(search){
        filteredCourses = filteredCourses.filter(course => course.name.includes(search));
        stdDbDebugger(`filteredCourses: ${filteredCourses}`);
    }
    res.json(filteredCourses);
});

router.get(`/:id`, async (req, res)=>{
    const {id} = req.params;
    const course = await Course.findById(id);

    if(!course) {
        return res.status(404).send('The course with the given id was not found...');
    }
    res.json(course);
});

router.post(`/`, auth, (req, res)=>{

    const course = new Course({
        name: req.body.name,
        price: req.body.price,
        startDate: req.body.startDate,
        length: req.body.length,
        instructor: req.body.instructor,
        isDiscontinued: req.body.isDiscontinued
    });

    const {error} = validateCourse(req.body);
    
    if(error) {
        return res.status(400).send(error);
    }

    const savedCourse = saveCourse(course);
    res.status(200).send(savedCourse);
});

router.put(`/:id`, async(req, res)=>{
    const {error} = validateCourse(req.body);
    
    if(error) {
        return res.status(400).send(error);
    }

    const {id} = req.params;
    const course = await Course.findByIdAndUpdate(id, {
        name: req.body.name,
        price: req.body.price,
        startDate: req.body.startDate,
        length: req.body.length,
        instructor: req.body.instructor
    }, {new: true});

    if(!course) {
        return res.status(404).send(`Course with id: ${id} doesn't exist.`);
    }

    res.send(course);
});

router.delete(`/:id`, [auth, admin], async(req, res)=>{
    const {id} = req.params;
    const deletedCourse = await Course.findByIdAndDelete(id);
    
    if(!deletedCourse) {
        return res.status(404).send(`Course with id: ${id} doesn't exist.`);
    }

    res.send(deletedCourse);
});

async function saveCourse(course) {
    const savedCourse = await course.save();
    stdDbDebugger(savedCourse);
    return saveCourse;
}

// createCourses(Course, saveCourse);

module.exports = router;