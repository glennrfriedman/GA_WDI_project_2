const axios = require('axios');
const db = require('../db/config');
require('dotenv').config();

// this is the TV Maze api url for a multiple show search 
// if the show name is searched after = it will return 
// a list of all shows that are matches
const API_URL = 'http://api.tvmaze.com/search/shows?q=';

const Shows = {};

// call to get all show data from the api 
Shows.findAll = (req, res, next) => {
	// get searchbar input
	const search = req.body.searchbar;
	// 	
	axios({
		url: 'API_URL',
		method: 'GET'
	}).then(tvData => {
		console.log(tvData);
		res.locals.tvData = tvData;
		next();
	}).catch( err => {
		console.log(`error fetching all train data: ${err}`)
	})
}

module.exports = Shows;