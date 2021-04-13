const express = require('express');
const router = express.Router();
const {ensureAuthenticated } = require('../config/auth');
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const bcryptjs = require('bcryptjs');
const passport = require('passport');
const User = require('../models/User');


// Login Page
router.get('/login', (req, res) => {
      const currentUser = null
      res.render('login', {currentPageTitle: 'Login', currentUser});
  })
  // Register Page
  router.get('/register', (req, res) => {
      const currentUser = null
      res.render('register', {currentPageTitle: 'Register', currentUser});
  })
  
  // Register Handle
  router.post('/register', (req, res) => {
      const {fname, lname, email, password, password2 } = req.body;
      let errors = [];
  
      // Check required fields
      if(!fname || !lname || !email || !password || !password2) {
          errors.push({ msg: 'Please fill in all fields'})
      }
      // Check passwords match
      if (password !== password2) {
          errors.push({ msg: 'Passwords do not match'})
      }
  
      // Check password length
      if (password.length < 6) {
          errors.push({ msg: 'Password should be at least 6 characters'})
      }
  
      if (errors.length > 0) {
          res.render('register', {
              errors,
              fname,
              lname,
              email,
              password,
              password2
          });
      } else {
          // Validation Pass
          User.findOne({ email: email })
          .then(user => {
              if (user) {
                  // User Exists
                  errors.push({ msg: 'Email is already registered'})
                  res.render('register', {
                      errors,
                      fname,
                      lname,
                      email,
                      password,
                      password2
                  });
              } else {
                  const newUser = new User({
                      fname,
                      lname,
                      email,
                      password
                  });
                  bcrypt.genSalt(10, (err, salt) => bcrypt.hash(newUser.password, salt, (err, hash) => {
                      if(err) throw err;
                      // Set password to hashed
                      newUser.password = hash;
                      // Save user
                      newUser.save()
                          .then(user => {
                              req.flash('success_msg', 'You are now registered and can log in');
                              res.render('login', {currentPageTitle: 'Login'});
                          })
                          .catch(err => console.log(err));
  
                  }))
              }
          })
          .catch();
      }
  })
  
  
  // Login Handle
  router.post('/login', (req, res, next) => {
      passport.authenticate('local', {
          successRedirect: '/users/caddy',
          failureRedirect: '/users/login',
          failureFlash: true
      })(req, res, next);
  });
  
  // Logout Handle
  router.get('/logout', (req, res) => {
      req.logout();
      req.flash('success_msg', 'You are logged out');
      res.redirect('/users/login')
  });



// Welcome Page
router.get('/', (req, res) => {
      res.render('./users/home');
});


// Caddy Page
router.get('/caddy', ensureAuthenticated, async (req, res) => {
      const userId = req.user._id;
      const user = await User.findById(userId);
      res.render('./users/caddy', {user});
});



module.exports = router;