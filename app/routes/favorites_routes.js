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

//UPDATE TO ADD TO FAVORITES
// PATCH /favorites/:id
router.patch('/favorites/add', requireToken, (req, res, next) => {
    Favorites.findOne({ owner: req.user.id }, async function (error, favorites) {
        //check if user has a favorites list already
        //if they do, push to that content array in the list
        if (favorites) {
            favorites.content.push(req.body.content)
            await favorites.save()
            //otherwise, create a new favorites list and then push content
        } else {
            const newFavorites = new Favorite()
            newFavorites.owner = req.user.id
            newFavorites.content.push(req.body.content)
            await newFavorite.save()
        }
    })
})

//UPDATE TO REMOVE FROM FAVORITES LIST
router.patch('/favorites/remove/:id', requireToken, removeBlanks, (req, res, next) => {
    // delete req.body.cart.owner

    Favorites.findOneAndUpdate({ owner: req.user.id }, { "$pull": { "content": { "_id": req.params.id } } })
        .then(handle404)
        // if that succeeded, return 204 and no JSON
        .then(() => res.sendStatus(204))
        // if an error occurs, pass it to the handler
        .catch(next)
})
