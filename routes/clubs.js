const express = require('express');
const router = express.Router();
const {ensureAuthenticated } = require('../config/auth');
const mongoose = require('mongoose');
const Club = require('../models/Club');


// Clubs Home Page
router.get('/', (req, res) => {
      res.render('./clubs/home');
});

// Golf Bag Page
router.get('/your-clubs', ensureAuthenticated, async (req, res) => {
      const clubs = await Club.find()
      res.render('./clubs/golf-bag', {clubs});
});

// Add Golf Club
router.post('/add', ensureAuthenticated, (req, res) => {
      const newClub = new Club({
            manufacturer: req.body.manufacturer,
            type: req.body.type,
            number: req.body.number,
            name: req.body.name,
            url: req.body.url,
            image_url: req.body.image_url
      });
      newClub.save();
      res.redirect(`/clubs/your-clubs`);
});



module.exports = router;