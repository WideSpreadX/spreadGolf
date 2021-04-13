const express = require('express');
const router = express.Router();
const {ensureAuthenticated } = require('../config/auth');
const mongoose = require('mongoose');



// Welcome Page
router.get('/', (req, res) => {
    const currentUser = null
      res.render('welcome', {currentUser });
});



module.exports = router;