const discoverMovieUrl = "https://api.themoviedb.org/3/discover/movie?api_key=58a92a2a4d225c25e73bb7fe5bfb8183&language=en-US&sort_by=popularity.desc&include_adult=false&include_video=false&page=1"

const discoverTvUrl = "https://api.themoviedb.org/3/discover/tv?api_key=58a92a2a4d225c25e73bb7fe5bfb8183&language=en-US&sort_by=popularity.desc&include_adult=false&include_video=false&page=1"

const showMovieUrl = `https://api.themoviedb.org/3/movie/${movieId}?api_key=58a92a2a4d225c25e73bb7fe5bfb8183&language=en-US`

const showTvUrl = `https://api.themoviedb.org/3/tv/${showId}?api_key=58a92a2a4d225c25e73bb7fe5bfb8183&language=en-US`

export const fetchPopularMovies = (region) => {
    return axios({
        url: `${discoverMovieUrl}&watch_region=${region}`,
        method: 'GET'
    })
}

export const fetchPopularShows = (region) => {
    return axios({
        url: `${discoverTvUrl}&watch_region=${region}`,
        method: 'GET'
    })
}