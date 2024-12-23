const express = require('express');
const mongoose = require('mongoose');
const log = require('./logger');
const config = require('config');
const stdDebugger = require('debug')('app::debugger');
const coursesRoute = require('./routes/courses');
const usersRoute = require('./routes/users');
const homeRoute = require('./routes/home');
const auth = require('./routes/auth');
const app = express();
const PORT = process.env.PORT || 3000;
const BASE_URL = '/api';
const MONGO_DB_URL = 'mongodb://localhost:27017/db';

mongoose.connect(MONGO_DB_URL)
            .then(() => stdDebugger("Connected to MongoDB..."))
            .catch((error) => stdDebugger(error));

app.set('view engine', 'pug');
app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(express.static('public')); //used for static assets
app.use(log); // using user defined middleware function

// set env variable DEBUG=app::std::debugger to see only these 
stdDebugger(`app: ${app.get('env')}`); // return development when not set
stdDebugger(`NODE_ENV: ${process.env.NODE_ENV}`);

stdDebugger(`Application Name: ${config.get('name')}`);
// console.log(`Mail Server: ${config.get('mail.password')}`); // env var app_password needs to be defined for this line to work

if(!config.get('jwtPrivateKey')) {
    console.error('FATAL ERROR: jwtPrivateKey is not defined.');
    process.exit(1);
}

app.use(`${BASE_URL}/courses`, coursesRoute);
app.use(`${BASE_URL}/users`, usersRoute);
app.use(`${BASE_URL}/auth`, auth);
app.use('', homeRoute);

app.listen(PORT, ()=>{
    console.log(`Listening on port ${PORT}`);
});

