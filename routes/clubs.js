const express = require('express');
const router = express.Router();
const {ensureAuthenticated } = require('../config/auth');
const mongoose = require('mongoose');
const Club = require('../models/Club');
const GolfBag = require('../models/GolfBag');

// Clubs Home Page
router.get('/', (req, res) => {
      res.render('./clubs/home');
});


// Golf Bag Page
router.get('/golf-bag', ensureAuthenticated, async (req, res) => {
      const user = req.user._id;
      const clubs = await Club.find();
      const golfBag = await GolfBag.findOne({owner: {$eq: user}}).populate('clubs').exec()
      res.render('./clubs/golf-bag', {golfBag, clubs})
});

// Golf Bag ID Page
router.get('/golf-bag/:golfBagId', ensureAuthenticated, async (req, res) => {
      const golfBagId = req.params.golfBagId;
      const clubs = await Club.find();
      const user = req.user._id;
      const golfBag = await GolfBag.findById(golfBagId).populate('clubs').exec()
      res.render('./clubs/golf-bag-id', {golfBag, clubs})
})
// Create Golf Bag
router.post('/golf-bag/add', ensureAuthenticated, (req, res) => {
      const user = req.user._id;
      const newGolfBag = new GolfBag({
            owner: user,
            manufacturer: req.body.manufacturer,
            name: req.body.name
      });
      newGolfBag.save();
      res.redirect(`/clubs/golf-bag`)
})

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


// Add Golf Club to Golf Bag
router.patch('/golf-bag/:golfBagId/add-club/:clubId', ensureAuthenticated, async (req, res) => {
      const golfBagId = req.params.golfBagId;
      const clubId = req.params.clubId;
      await GolfBag.findByIdAndUpdate(golfBagId,
            {$addToSet: {"clubs": clubId}},
            {safe: true, upsert: true},
            function(err, doc) {
                if(err) {
                    console.log(err)
                } else {
                    return;
                }
            }
            )
            res.redirect(`/clubs/golf-bag/${golfBagId}`);
});

// Remove Golf Club to Golf Bag
router.patch('/golf-bag/:golfBagId/remove-club/:clubId', ensureAuthenticated, async (req, res) => {
      const golfBagId = req.params.golfBagId;
      const clubId = req.params.clubId;
      await GolfBag.findByIdAndUpdate(golfBagId,
            {$pull: {"clubs": req.body.clubId}},
            function(err, doc) {
                if(err) {
                    console.log(err)
                } else {
                    return;
                }
            }
            )
            res.redirect(`/clubs/golf-bag/${golfBagId}`);
});


module.exports = router;