const router = require('express').Router();
// get auth module
const auth = require('../services/auth');
// get Shows model 
const Shows = require('../models/shows');

// show profile page 
router.get('/profile',
    auth.restrict, // restrict this route to logged in users
    Shows.findAllForUser,
    (req, res) => {
        res.render('shows/profile', { savedShow: res.locals.savedShowData });
    });


// show search
router.post('/search',
    auth.restrict,
    // returns all search results in an JSON from model
    Shows.search,
    Shows.time,
    Shows.save,
    (req, res) => {
        const viewData = { show: res.locals.tvData };
        // if i have showTime data
        if (res.locals.showTime !== undefined) {
            viewData.time = res.locals.showTime.data;
        }
        res.render('shows/search', viewData);
    });

// get show by name and 
router.get('/:id',
    auth.restrict,
    Shows.findById,
    Shows.timeById,
    (req, res) => {
        const viewData = { oneShow: res.locals.oneShowData };
        // console.log(res.locals.oneShowData);
        // if i have showTime data
        if (res.locals.oneShowTime !== undefined) {
            viewData.oneTime = res.locals.oneShowTime.data;
        }
        res.render('shows/oneShow', viewData);
    });

router.delete('/:id',
    auth.restrict,
    Shows.destroy,
    (req, res) => {
        res.send('deleted');
    });

module.exports = router;