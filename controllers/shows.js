const router = require('express').Router();
// get auth module
const auth = require('../services/auth');
// get Shows model 
const Shows = require('../models/shows');

// show profile page 
router.get('/profile', 
	auth.restrict,  // restrict this route to logged in users
	(req, res) => {
  res.render('shows/profile');
});


// show search
router.post('/search',
	auth.restrict, 
	// returns all search results in an JSON from model
	Shows.search, 
  (req, res) => {
  	// console.log('TV DATA: ', res.locals.tvData);
  res.render('shows/profile', {show: res.locals.tvData});
});

module.exports = router;