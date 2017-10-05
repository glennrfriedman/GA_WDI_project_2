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


router.post('/search',
	auth.restrict,  
	Shows.search, 
	// Message.saveUserInput,
	// Message.fetchBotResponse,
 //  Message.saveBotResponse,
  (req, res) => {
  	// console.log('TV DATA: ', res.locals.tvData);
  res.redirect('/tvtime/profile');
});

module.exports = router;