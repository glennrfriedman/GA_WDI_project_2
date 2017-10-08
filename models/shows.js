const axios = require('axios');
const db = require('../db/config');
const convertTime = require('convert-time');
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
} //end of Shows.Search

// used to get current show time information for search
Shows.time = (req, res, next) => {
    // grab link from tvData object with next show information 

    if (res.locals.tvData._links.nextepisode === undefined) {
        next();
    } else {
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
} //end of Shows.time

Shows.save = (req, res, next) => {

    console.log('res.locals : ', res.locals)

    const user_id = req.user.id,
        show_id = res.locals.tvData.id,
        show_name = res.locals.tvData.name,
        on_air = res.locals.tvData.status,
        image = res.locals.tvData.image.medium,
        show_time = `${convertTime(res.locals.tvData.schedule.time)} EST`,
        show_date = `${res.locals.tvData.schedule.days[0]}s`,
        comments = '';

    db.one('INSERT INTO show_data (user_id, show_id, show_name, on_air, image, show_time, show_date, comments) VALUES ($1, $2, $3, $4, $5, $6, $7, $8) RETURNING id', [user_id, show_id, show_name, on_air, image, show_time, show_date, comments])
        .then(savedShowData => {
            // console.log('savedShowData: ', savedShowData);
            // res.locals.savedShowData = savedShowData;
            next();
        }).catch(err => {
            console.log(err);
        })
}; //end of Shows.save

Shows.findAllForUser = (req, res, next) => {
    // Find all messages to display on this user's message page. Fill me in!
    const userId = req.user.id;
    db.manyOrNone(
        'SELECT * FROM show_data WHERE user_id = $1', [userId]
    ).then(data => {
        // console.log('findAllForUser: ', data);
        res.locals.savedShowData = data;
        next();
    }).catch(err => console.log('ERROR:', err));
};

Shows.findById = (req, res, next) => {

    const id = req.params.id;
    // console.log('show id is: ' + showId);

    // axios call to get information based on showId
    axios({
        url: `http://api.tvmaze.com/shows/${id}`,
        method: 'GET'
    }).then(oneShowData => {
        res.locals.oneShowData = oneShowData.data;
        console.log('--------------------------');
        console.log('oneShowData: ', res.locals.oneShowData);
        next();
    }).catch(err => {
        console.log(`error fetching show data: ${err}`)
    })

}

// used to get current show time information for oneShow view
Shows.timeById = (req, res, next) => {

    if (res.locals.oneShowData._links.nextepisode === undefined) {
        next();
    } else {
        const timeLink = res.locals.oneShowData._links.nextepisode.href;
        console.log('show time link: ', timeLink);
        axios({
            url: `${timeLink}`,
            method: 'GET'
        }).then(showTime => {
            res.locals.oneShowTime = showTime;
            console.log('showtime: ', showTime);
            next();
        }).catch(err => {
            console.log(`error fetching show data: ${err}`)
        })
    }
}

Shows.destroy = (req, res, next) => {

    const id = req.params.id;

    db.none(
        'DELETE FROM show_data WHERE id = $1', [id]
    ).then(() => {
        // res.locals.destroyedShowData = "maybe something could go here";
        // console.log(res.locals.destroyedShowData);
        next();
    }).catch(err => {
        console.log(`ERROR AT DESTROY MODEL: ${err}`);
    })

};

module.exports = Shows;