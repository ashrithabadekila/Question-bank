var express = require('express');
var app = express();
var db = require('./db');

var UserController = require('./user/UserController');
app.use('/users', UserController);

// app.js
var AuthController = require('./auth/AuthController');
app.use('/api/auth', AuthController);

// branch.js
var BranchController = require('./branch_list/branch');
app.use('/api', BranchController);

// college.js
var CollegeController = require('./college_year_list/college');
app.use('/api', CollegeController);

// college.js
var SubjectsController = require('./subject_list/subject');
app.use('/api', SubjectsController);

// image_upload.js
var IMController = require('./image_upload');
app.use('/api', IMController);


module.exports = app;