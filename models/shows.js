const axios = require('axios');
const db = require('../db/config');
const convertTime = require('convert-time');
const dateformatConverter = require('dateformat-converter');
const dateFormatLite = require("date-format-lite");
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

    // console.log('Search input: ' + req.body.input);
    // console.log('--------------------------------');

    axios({
        url: `http://api.tvmaze.com/search/shows?q=${search}`,
        method: 'GET'
    }).then(tvData => {
        res.locals.tvData = tvData.data[0].show;
        // console.log(res.locals.tvData);
        // console.log('--------------------------------');
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
        // console.log('show time link: ', timeLink);
        axios({
            url: `${timeLink}`,
            method: 'GET'
        }).then(showTime => {
            const time = showTime.data.airdate.date("MM/DD/YYYY");
            // console.log('time: ' + time);
            res.locals.showDate = time;
            res.locals.showHour = convertTime(showTime.data.airtime);
            res.locals.showTime = showTime.data;
            // console.log('showtime: ', showTime);
            next();
        }).catch(err => {
            console.log(`error fetching show data: ${err}`)
        })

    }
} //end of Shows.time

Shows.save = (req, res, next) => {

    let network = '';

    if (req.body.network === '') {
        network = req.body.webShow;
    } else if (req.body.network !== '') {
        network = req.body.network;
    }

    const user_id = req.user.id,
        show_id = req.body.show_id,
        show_name = req.body.show_name,
        on_air = req.body.on_air,
        image = req.body.image,
        show_time = `${convertTime(req.body.show_time)} EST`,
        show_date = `${req.body.show_date}s`,
        comments = '';

    db.one('INSERT INTO show_data (user_id, show_id, show_name, on_air, image, show_time, show_date, network, comments) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9) RETURNING id', [user_id, show_id, show_name, on_air, image, show_time, show_date, network, comments])
        .then(savedShowData => {
            // console.log('savedShowData: ', savedShowData);
            res.locals.savedShowData = savedShowData;
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
} // end of findAllForUser

// find by showId for edit
Shows.findByShowId = (req, res, next) => {
    // Find all messages to display on this user's message page. Fill me in!
    const showId = req.params.showId;
    // console.log('--------------------------');
    // console.log('showId is + ' + showId);
    db.manyOrNone(
        'SELECT * FROM show_data WHERE id = $1', [showId]
    ).then(data => {
        // console.log('--------------------------');
        // console.log('findByShowId data is ', data);
        res.locals.showIdData = data;
        next();
    }).catch(err => console.log('ERROR:', err));
} // end of findAllForUser

Shows.findById = (req, res, next) => {

    const id = req.params.id;
    // console.log('show id is: ' + showId);
    // axios call to get information based on showId
    axios({
        url: `http://api.tvmaze.com/shows/${id}`,
        method: 'GET'
    }).then(oneShowData => {
        res.locals.oneShowData = oneShowData.data;
        // console.log('--------------------------');
        // console.log('oneShowData: ', res.locals.oneShowData);
        res.locals.premiered = oneShowData.data.premiered.date("MM/DD/YYYY")
        // console.log('premiered on ' + res.locals.premiered);
        next();
    }).catch(err => {
        console.log(`error fetching show data: ${err}`)
    })

} // end of findById

// used to get current show time information for oneShow view
Shows.timeById = (req, res, next) => {

    if (res.locals.oneShowData._links.nextepisode === undefined) {
        next();
    } else {
        const timeLink = res.locals.oneShowData._links.nextepisode.href;
        // console.log('show time link: ', timeLink);
        axios({
            url: `${timeLink}`,
            method: 'GET'
        }).then(showTime => {
            res.locals.oneShowTime = showTime.data;
            // console.log('showtime: ', showTime);
            const time = showTime.data.airdate.date("MM/DD/YYYY");
            // console.log('time: ' + time);
            res.locals.showDate = time.date("MM/DD/YYYY");
            res.locals.showHour = convertTime(showTime.data.airtime);
            next();
        }).catch(err => {
            console.log(`error fetching show data: ${err}`)
        })
    }
} // end of timeById

// update show 
Shows.update = (req, res, next) => {

    const id = req.params.showId;

    const comments = req.body.comments;
    // console.log('--------------------------');
    // console.log('req.body for comments is ' + comments);

    db.one(
        'UPDATE show_data SET comments = $1 WHERE id = $2 returning id', [comments, id]
    ).then((editedShowData) => {
        res.locals.editedShowData = editedShowData;
        next();
    });
} // end of update

// delete show
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

} // end of destroy

module.exports = Shows;