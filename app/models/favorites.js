const mongoose = require('mongoose')

const favoritesSchema = new mongoose.Schema(
    {
        content: [
            {
                contentId: Number,
                title: String,
                img: String,
                release_date: String,
                rating: Number,
                description: String,
                tagline: String,
                genre: [String],
                runtime: Number,
                number_of_seasons: Number,
                type: String

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