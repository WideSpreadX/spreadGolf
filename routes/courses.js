const express = require('express');
const router = express.Router();
const {ensureAuthenticated } = require('../config/auth');
const mongoose = require('mongoose');
const GolfCourse = require('../models/GolfCourse');
const Hole = require('../models/Hole');



// Courses Home Page
router.get('/', async (req, res) => {
    const allCourses = await GolfCourse.find();
    res.render('./courses/home', {allCourses});
});

// Single Course Page
router.get('/course/:courseId', async (req, res) => {
    const courseId = req.params.courseId;
    const course = await GolfCourse.findById(courseId);
    const holes = await Hole.find({course: {$eq: courseId}});
    res.render('./courses/single-course', {course, holes});
});



// Course Scorecard Page
router.get('/scorecard', (req, res) => {
    res.render('./courses/scorecard');
});



module.exports = router;