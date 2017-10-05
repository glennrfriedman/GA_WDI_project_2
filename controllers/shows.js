const router = require('express').Router();

const auth = require('../services/auth');

// show profile page 
router.get('/profile', 
	auth.restrict,  // restrict this route to logged in users
	
	(req, res) => {
  res.render('shows/profile');
});

module.exports = router;