const axios = require('axios');
const db = require('../db/config');
require('dotenv').config();

// this is the TV Maze api url for a multiple show search 
// if the show name is searched after = it will return 
// a list of all shows that are matches
const API_URL = 'http://api.tvmaze.com/search/shows?q=';

const Shows = {};

Shows.findAll = (req, res, next) => {
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