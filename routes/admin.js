const express = require('express');
const router = express.Router();
const {ensureAuthenticated } = require('../config/auth');
const mongoose = require('mongoose');
const GolfCourse = require('../models/GolfCourse');
const Hole = require('../models/Hole');



// Welcome Page
router.get('/', async (req, res) => {
      const courses = await GolfCourse.find();
      res.render('./admin/home', {courses});
});

// Course Page
router.get('/course', async (req, res) => {
      res.render('./admin/course', {courses});
});

// Add New Course
router.post('/add', (req, res) => {
      const newCourse = new GolfCourse({
            name: req.body.name,
            url: req.body.url,
            address: {
                  street_1: req.body.street1,
                  street_2: req.body.street2,
                  city: req.body.city,
                  state: req.body.state,
                  zip: req.body.zip,
                  country: req.body.country,
                  location: {
                        type: "Point",
                        coordinates: [req.body.coordinatesX, req.body.coordinatesY]
                  }
            }
      });
      newCourse.save();
      res.redirect('/courses')
});

// Single Course Page
router.get('/course/:courseId', async (req, res) => {
      const courseId = req.params.courseId;
      const course = await GolfCourse.findById(courseId);
      const holes = await Hole.find({course: {$eq: courseId}});
      res.render('./admin/course', {course, holes});
});

router.post('/:courseId/hole/add', async (req, res) => {
      const courseId = req.params.courseId;
      const newHole =  new Hole({
            course: courseId,
            hole_number: req.body.hole_number,
            par: req.body.par,
            tee_a: {
                  total_distance: req.body.totalDistanceA,
                  location: {
                        type: "Point",
                        coordinates: [req.body.coordinatesXA, req.body.coordinatesYA]
                  }
            },
            tee_b: {
                  total_distance: req.body.totalDistanceB,
                  location: {
                        type: "Point",
                        coordinates: [req.body.coordinatesXB, req.body.coordinatesYB]
                  }
            },
            tee_c: {
                  total_distance: req.body.totalDistanceC,
                  location: {
                        type: "Point",
                        coordinates: [req.body.coordinatesXC, req.body.coordinatesYC]
                  }
            },
            tee_d: {
                  total_distance: req.body.totalDistanceD,
                  location: {
                        type: "Point",
                        coordinates: [req.body.coordinatesXD, req.body.coordinatesYD]
                  }
            },
            hole: {
                  location: {
                        type: "Point",
                        coordinates: [req.body.coordinatesXHole, req.body.coordinatesYHole]
                  }
            }
      });
      newHole.save();
      res.redirect(`/admin/course/${courseId}`)


});


module.exports = router;