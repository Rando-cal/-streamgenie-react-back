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

//DO NOT NEED INDEX ROUTE

//SHOW ROUTE
//GET /favorites
router.get('/favorites', requireToken, (req, res, next) => {

    Favorites.findOne({ owner: req.user.id })
        .then(handle404)
        // // if `findById` is succesful, respond with 200 and "cart" JSON
        .then((favorites) => res.status(200).json({ favorites: favorites.toObject() }))
        // // if an error occurs, pass it to the handler
        .catch(next)
})

//CREATE A FAVORITES LIST UPON SIGNUP
//CREATE
//POST /favorites
router.post('/favorites', requireToken, (req, res, next) => {
    // set owner of new item to be current user
    req.body.favorites.owner = req.user.id

    Favorites.create(req.body.favorites)
        // respond to succesful `create` with status 201 and JSON of new "item"
        .then((favorites) => {
            res.status(201).json({ favorites: favorites.toObject() })
        })
        // if an error occurs, pass it off to our error handler
        // the error handler needs the error message and the `res` object so that it
        // can send an error message back to the client
        .catch(next)
})

// UPDATE IS BOTH ADD AND DELETE CONTENT FROM LIST
// PATCH /favorites/:id
router.patch('/favorites/:id', requireToken, removeBlanks, (req, res, next) => {
    // if the client attempts to change the `owner` property by including a new
    // owner, prevent that by deleting that key/value pair
    delete req.body.favorites.owner
    Favorites.findById(req.params.id)
        .then(handle404)
        .then((favorites) => {
            // pass the `req` object and the Mongoose record to `requireOwnership`
            // it will throw an error if the current user isn't the owner
            // requireOwnership(req, item)

            // pass the result of Mongoose's `.update` to the next `.then`
            return item.updateOne(req.body.item)
        })
        // if that succeeded, return 204 and no JSON
        .then(() => res.sendStatus(204))
        // if an error occurs, pass it to the handler
        .catch(next)
})
