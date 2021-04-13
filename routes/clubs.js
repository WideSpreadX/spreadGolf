const express = require('express');
const router = express.Router();
const {ensureAuthenticated } = require('../config/auth');
const mongoose = require('mongoose');



// Clubs Home Page
router.get('/', (req, res) => {
      res.render('./clubs/home');
});



module.exports = router;