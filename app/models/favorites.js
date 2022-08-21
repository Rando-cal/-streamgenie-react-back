const mongoose = require('mongoose')

const favoritesSchema = new mongoose.Schema(
    {
        content: [
            {
                id: Number,
                title: String,
                img: String,
                year: Number,
                rating: Number,
                description: String,
                tagline: String,
                genre: [String],
                runtime: Number,

            }
        ],
        owner: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User',
            required: true
        }
    },
    {
        timestamps: true
    }
)

module.exports = mongoose.model('Favorites', favoritesSchema)