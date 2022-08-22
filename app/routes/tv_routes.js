// Express docs: http://expressjs.com/en/api.html
const express = require('express')
// Passport docs: http://www.passportjs.org/docs/
const passport = require('passport')

//model for favorites
const Favorites = require('../models/favorites')

//error handling methods
const customErrors = require('../../lib/custom_errors')

//function to send 404 when doc requested doesn't exist
const handle404 = customErrors.handle404
// send 401 when user tries modifying resource without proper auth
const requireOwnership = customErrors.requireOwnership

//remove blanks
const removeBlanks = require('../../lib/remove_blank_fields')

//require token to be passed 
const requireToken = passport.authenticate('bearer', { session: false })

//instantiate router
const router = express.Router()


//INDEX
// GET /movies
router.get('/tv(/:region)', (req, res, next) => {
    //fetch top 20 most popular shows from API
    fetch(`https://api.themoviedb.org/3/discover/tv?api_key=58a92a2a4d225c25e73bb7fe5bfb8183&language=en-US&sort_by=popularity.desc&include_adult=false&include_video=false&page=1&watch_region=${req.params.region}`)
        .then(handle404)
        .then((shows) =>
            res.status(201).json({ shows: shows.toObject() }))
        .catch(next)
})

//SHOW
// GET /show/:id
router.get('/tv/:id', (req, res, next) => {
    //fetch specified show using API's title id
    fetch(`https://api.themoviedb.org/3/tv/${req.params.id}?api_key=58a92a2a4d225c25e73bb7fe5bfb8183`)
        .then(handle404)
        .then((show) =>
            res.status(201).json({ show: show.toObject() }))
        .catch(next)
})


