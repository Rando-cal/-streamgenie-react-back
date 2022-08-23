// Express docs: http://expressjs.com/en/api.html
const express = require('express')
// Passport docs: http://www.passportjs.org/docs/
const passport = require('passport')

//model for favorites
const Favorites = require('../models/favorites')

//api calls
import { fetchPopularMovies } from '../api'

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
router.get('/movies/:region', (req, res, next) => {
    //fetch top 20 most popular movies from API
    fetchPopularMovies(req.params.region)
        .then(handle404)
        .then((movies) =>
            res.status(201).json({ movies: movies.toObject() }))
        .catch(next)
})

//INDEX BY STREAMING PLATFORM
// GET /movies/:id/:region
router.get('/movies/:id/:region', (req, res, next) => {
    //fetch top 20 most popular movies from API on specified platform
    fetch(`https://api.themoviedb.org/3/discover/tv?api_key=58a92a2a4d225c25e73bb7fe5bfb8183&language=en-US&sort_by=popularity.desc&include_adult=false&include_video=false&page=1&watch_region=${req.params.region}&with_watch_providers=${req.params.id}`)
        .then(handle404)
        .then((movies) =>
            res.status(201).json({ movies: movies.toObject() }))
        .catch(next)
})


//SHOW
// GET /movie/:id
router.get('/movie/:id', (req, res, next) => {
    //fetch specified move using API's title id
    fetch(`https://api.themoviedb.org/3/movie/${req.params.id}?api_key=58a92a2a4d225c25e73bb7fe5bfb8183`)
        .then(handle404)
        .then((movie) =>
            res.status(201).json({ movie: movie.toObject() }))
        .catch(next)
})

module.exports = router