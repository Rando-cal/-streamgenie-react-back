// Express docs: http://expressjs.com/en/api.html
const express = require('express')
// Passport docs: http://www.passportjs.org/docs/
const passport = require('passport')

//model for favorites
const Favorites = require('../models/favorites')

//api calls
const { fetchPopularShows, fetchPopularShowsByPlatform, fetchShowById, fetchShowsByTitle } = require('../api')
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
// GET /tv
router.get('/tv(/:region)', (req, res, next) => {
    //fetch top 20 most popular shows from API
    fetchPopularShows(req.params.region)
        .then(handle404)
        .then((shows) =>
            res.status(201).json({ shows: shows.data.results }))
        .catch(next)
})

//INDEX BY STREAMING PLATFORM
// GET /tv
router.get('/tv/:id/:region', (req, res, next) => {
    //fetch top 20 most popular shows from API on specified platform
    fetchPopularShowsByPlatform(req.params.region, req.params.id)
        .then(handle404)
        .then((shows) =>
            res.status(201).json({ shows: shows.data.results }))
        .catch(next)
})

//SHOW
// GET /show/:id
router.get('/tv/:id', (req, res, next) => {
    //fetch specified show using API's title id
    fetchShowById(req.paramas.id)
        .then(handle404)
        .then((show) =>
            res.status(201).json({ show: show.data.results }))
        .catch(next)
})

//INDEX SEARCH BY  REGION, AND TITLE
//GET /search/tv/:region/:title
router.get('/search/tv/:region/:title', (req, res, next) => {
    //fetch search for title 
    fetchShowsByTitle(req.params.region, req.params.title)
        .then(handle404)
        .then((shows) =>
            res.status(201).json({ shows: shows.data.results }))
        .catch(next)
})


module.exports = router