// Express docs: http://expressjs.com/en/api.html
const express = require('express')
// Passport docs: http://www.passportjs.org/docs/
const passport = require('passport')

//model for favorites
const Favorites = require('../models/favorites')

//api calls
import { fetchPopularMovies, fetchPopularMoviesByPlatform, fetchMovieById, fetchMovieTitleByPlatform } from '../api'

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
// GET /movies/:region/:id
router.get('/movies/:region/:id', (req, res, next) => {
    //fetch top 20 most popular movies from API on specified platform
    fetchPopularMoviesByPlatform(req.params.region, req.params.id)
        .then(handle404)
        .then((movies) =>
            res.status(201).json({ movies: movies.toObject() }))
        .catch(next)
})


//SHOW
// GET /movie/:id
router.get('/movie/:id', (req, res, next) => {
    //fetch specified move using API's title id
    fetchMovieById(req.params.id)
        .then(handle404)
        .then((movie) =>
            res.status(201).json({ movie: movie.toObject() }))
        .catch(next)
})

//INDEX SEARCH BY PLATFORM, REGION, AND TITLE
//GET /movies/:region/:id/:title
router.get('/movies/:region/:id/:title', (req, res, next) => {
    //fetch search for title and platform
    fetchMovieTitleByPlatform(req.params.region, req.params.id, req.params.title)
        .then(handle404)
        .then((movies) =>
            res.status(201).json({ movies: movies.toObject() }))
        .catch(next)
})

module.exports = router