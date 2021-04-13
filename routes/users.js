const express = require('express');
const router = express.Router();
const {ensureAuthenticated } = require('../config/auth');
const mongoose = require('mongoose');



// Welcome Page
router.get('/', (req, res) => {
      res.render('./users/home');
});


// Caddy Page
router.get('/caddy', (req, res) => {
      res.render('./users/caddy');
});



module.exports = router;