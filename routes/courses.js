const express = require('express');
const router = express.Router();
const {ensureAuthenticated } = require('../config/auth');
const mongoose = require('mongoose');
const GolfCourse = require('../models/GolfCourse');
const Hole = require('../models/Hole');
const Scorecard = require('../models/Scorecard');



// Courses Home Page
router.get('/', async (req, res) => {
    const allCourses = await GolfCourse.find();
    res.render('./courses/home', {allCourses});
});

// Single Course Page
router.get('/course/:courseId', async (req, res) => {
    const courseId = req.params.courseId;
    const userId = req.user._id;
    const course = await GolfCourse.findById(courseId);
    const holes = await Hole.find({course: {$eq: courseId}});
    const scorecards = await Scorecard.find({player: {$eq: userId}, course: {$eq: courseId}});
    res.render('./courses/single-course', {course, holes, userId, scorecards});
});


// Start New Round
router.post('/course/:courseId/:userId/scorecard/new', ensureAuthenticated, async(req, res) => {
    const courseId = req.params.courseId;
    const userId = req.params.userId;
    const holes = await Hole.find({course: {$eq: courseId}});
    let hole_ids = [];
    for (i = 0; i < holes.length; i++) {

    }
    for (let i in holes) {
        hole_ids.push(holes[i])
      }
    const scorecard = new Scorecard({
        course: courseId,
        player: userId
    });
    scorecard.save();
    res.redirect(`/courses/course/${courseId}/scorecard/${scorecard._id}`)
});


// Course Scorecard Page
router.get('/course/:courseId/scorecard/:scorecardId', async (req, res) => {
    const courseId = req.params.courseId;
    const userId = req.user._id;
    const scorecardId = req.params.scorecardId;

    const course = await GolfCourse.findById(courseId);
    const holes = await Hole.find({course: {$eq: courseId}});
    const scorecard = await Scorecard.findById(scorecardId).populate('holes.hole_id').exec()
    console.log(`ScorecardId: ${scorecardId}`)
    console.log(`Scorecard: ${scorecard.holes}`)
    res.render(`./courses/scorecard`, {course, holes, scorecard, scorecardId, courseId, userId});
});


router.patch('/course/:courseId/scorecard/:userId/:scorecardId/:holeId/add-score', ensureAuthenticated, async (req, res) => {
    const courseId = req.params.courseId;
    const userId = req.params.userId;
    const scorecardId = req.params.scorecardId;
    const holeId = req.params.holeId;
    const scoreData = {
        hole_id: holeId,
        strokes: req.body.strokes,
        mulligans: req.body.mulligans,
        penalties: req.body.penalties,
    }
    await Scorecard.findByIdAndUpdate(scorecardId,
        {$addToSet: {"holes": scoreData}},
        {safe: true, upsert: true},
        function(err, doc) {
            if(err) {
                console.log(err)
            } else {
                return;
            }
        }
        )
        res.redirect(`/courses/course/${courseId}/scorecard/${scorecardId}`);
});



module.exports = router;