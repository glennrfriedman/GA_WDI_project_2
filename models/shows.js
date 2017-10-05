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

        // for(var i = 0; i < tvData.data.length; i++){

        res.locals.tvData = tvData.data[0].show;

        // link to the source that has the next episode data 
        // res.locals.nextEpisode = tvData.data[0]._links;
        // console.log('Next episode is: ' + res.locals.nextEpisode.nextepisode);

        // }
        console.log(res.locals.tvData);
        console.log('--------------------------------');
        next();
    }).catch(err => {
        console.log(`error fetching show data: ${err}`)
    })
}

Shows.time = (req, res, next) => {
    // grab link from tvData object with next show information 
    if (res.locals.tvData._links.nextepisode === undefined) {
        next();
    } 
    else {
        const timeLink = res.locals.tvData._links.nextepisode.href;
        console.log('show time link: ', timeLink);
        axios({
            url: `${timeLink}`,
            method: 'GET'
        }).then(showTime => {
            res.locals.showTime = showTime;
            console.log('showtime: ', showTime);
            next();
        }).catch(err => {
            console.log(`error fetching show data: ${err}`)
        })
    }
}

module.exports = Shows;