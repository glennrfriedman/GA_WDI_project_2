const axios = require('axios');
const db = require('../db/config');
require('dotenv').config();

// this is the TV Maze api url for a multiple show search 
// if the show name is searched after = it will return 
// a list of all shows that are matches
const API_URL = 'http://api.tvmaze.com/search/shows?q=';

const Shows = {};

// call to get all show data from the api 
Shows.search = (req, res, next) => {
	// get searchbar input
	const search = req.body.input;
	
	console.log('Search input: ' + req.body.input);
	console.log('--------------------------------'); 	
	
	axios({
		url: `http://api.tvmaze.com/search/shows?q=${search}`,
		method: 'GET'
	}).then(tvData => {
		// tvData.data => returns all shows matched with search results 
		// each show is an object with score and show info which is another object
		res.locals.tvData = tvData.data[0].show;
		console.log(res.locals.tvData);
		console.log('--------------------------------');
		next();
	}).catch( err => {
		console.log(`error fetching all train data: ${err}`)
	})
}

module.exports = Shows;