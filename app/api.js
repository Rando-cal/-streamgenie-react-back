const discoverMovieUrl = "https://api.themoviedb.org/3/discover/movie?api_key=58a92a2a4d225c25e73bb7fe5bfb8183&language=en-US&sort_by=popularity.desc&include_adult=false&include_video=false&page=1"

const discoverTvUrl = "https://api.themoviedb.org/3/discover/tv?api_key=58a92a2a4d225c25e73bb7fe5bfb8183&language=en-US&sort_by=popularity.desc&include_adult=false&include_video=false&page=1"

const showMovieUrl = `https://api.themoviedb.org/3/movie/${movieId}?api_key=58a92a2a4d225c25e73bb7fe5bfb8183&language=en-US`

const showTvUrl = `https://api.themoviedb.org/3/tv/${showId}?api_key=58a92a2a4d225c25e73bb7fe5bfb8183&language=en-US`

//FETCH MOST POPULAR BY REGION
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

//FETCH MOST POPULAR BY REGION AND STREAMING PLATFORM
export const fetchPopularMoviesByPlatform = (region, platform) => {
    return axios({
        url: `${discoverMovieUrl}&watch_region=${region}&with_watch_providers=${platform}`,
        method: 'GET'
    })
}

export const fetchPopularShowsByPlatform = (region, platform) => {
    return axios({
        url: `${discoverTvUrl}&watch_region=${region}&with_watch_providers=${platform}`,
        method: 'GET'
    })
}

//FETCH SPECIFIC TITLE BY API SUPPLIED ID
export const fetchMovieById = (id) => {
    movieId = id
    return axios({
        url: `${showMovieUrl}`,
        method: 'GET'
    })
}

export const fetchShowById = (id) => {
    showId = id
    return axios({
        url: `${showTvUrl}`,
        method: 'GET'
    })
}