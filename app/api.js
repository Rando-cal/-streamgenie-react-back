const axios = require('axios')

const discoverMovieUrl = "https://api.themoviedb.org/3/discover/movie?api_key=58a92a2a4d225c25e73bb7fe5bfb8183&language=en-US&sort_by=popularity.desc&include_adult=false&include_video=false&page=1"

const discoverTvUrl = "https://api.themoviedb.org/3/discover/tv?api_key=58a92a2a4d225c25e73bb7fe5bfb8183&language=en-US&sort_by=popularity.desc&include_adult=false&include_video=false&page=1"

const showMovieUrl = "https://api.themoviedb.org/3/movie/"

const showTvUrl = "https://api.themoviedb.org/3/tv/"

const apiKey = "?api_key=58a92a2a4d225c25e73bb7fe5bfb8183&"
const languageCode = "&language=en-US`"

//FETCH MOST POPULAR BY REGION
const fetchPopularMovies = (region) => {
    return axios({
        url: `${discoverMovieUrl}&watch_region=${region}`,
        method: 'GET'
    })
}

const fetchPopularShows = (region) => {
    return axios({
        url: `${discoverTvUrl}&watch_region=${region}`,
        method: 'GET'
    })
}

//FETCH MOST POPULAR BY REGION AND STREAMING PLATFORM
const fetchPopularMoviesByPlatform = (region, platform) => {
    return axios({
        url: `${discoverMovieUrl}&watch_region=${region}&with_watch_providers=${platform}`,
        method: 'GET'
    })
}

const fetchPopularShowsByPlatform = (region, platform) => {
    return axios({
        url: `${discoverTvUrl}&watch_region=${region}&with_watch_providers=${platform}`,
        method: 'GET'
    })
}

//FETCH SPECIFIC TITLE BY API SUPPLIED ID
const fetchMovieById = (id) => {
    return axios({
        url: `${showMovieUrl}${id}${apiKey}${languageCode}`,
        method: 'GET'
    })
}

const fetchShowById = (id) => {
    showId = id
    return axios({
        url: `${showTvUrl}${id}${apiKey}${languageCode}`,
        method: 'GET'
    })
}

module.exports = { fetchPopularMovies, fetchPopularShows, fetchPopularMoviesByPlatform, fetchPopularShowsByPlatform, fetchMovieById, fetchShowById }