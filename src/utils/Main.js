const url = 'https://api.movies-vladimir.nomoredomains.work'

export const signin = (email, password) => {
    return fetch(`${url}/signin`, {
        method: 'POST',
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({email, password})
    })
    .then(checkResponse)
    .then(data => data)
}

export const signup = (name, email, password) => {
    return fetch(`${url}/signup`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({name, email, password}),
    })
    .then(checkResponse)
    .then(data => data)
}

export const getInfoAboutUser = () => {
    return fetch(`${url}/users/me`, {
        headers: {
            authorization: `Bearer ${localStorage.getItem('jwt')}`,
            "Content-Type": "application/json",
        },
    })
    .then(checkResponse)
    .then(data => data)
}

export const getMovies = () => {
    return fetch(`${url}/movies`, {
        headers: {
            authorization: `Bearer ${localStorage.getItem('jwt')}`,
            "Content-Type": "application/json",
        },
    })
    .then(checkResponse)
    .then(movies => movies)
}

export const createMovie = (country, director, duration, year, description, image, trailer, thumbnail, movieId, nameRU, nameEN) => {
    return fetch(`${url}/movies`, {
        method: 'POST',
        headers: {
            authorization: `Bearer ${localStorage.getItem('jwt')}`,
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            country, director, duration, year, description, image, trailer, thumbnail, movieId, nameRU, nameEN,
        }),
    })
    .then(checkResponse)
    .then(movie => movie)
}

export const deleteMovie = (data) => {
    return fetch(`${url}/movies/${data}`, {
        method: 'DELETE',
        headers: {
            authorization: `Bearer ${localStorage.getItem('jwt')}`,
            "Content-Type": "application/json",
        },
    })
    .then(checkResponse)
    .then(res => res)
}

const checkResponse = (res) => {
    return res.ok ? res.json() : Promise.reject(console.log(res))
}
