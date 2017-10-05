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
	Shows.time,
	Shows.save,
  (req, res) => {
  const viewData = {show: res.locals.tvData};
  // if i have showTime data
  if(res.locals.showTime !== undefined){
  	viewData.time = res.locals.showTime.data;
  }	
  res.render('shows/profile', viewData);
});

module.exports = router;