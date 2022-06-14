const url = 'https://api.nomoreparties.co/beatfilm-movies';

export const getMovies = () => {
    return fetch(`${url}`, {
        headers: {
            "Content-Type": "application/json",
        }
    })
    .then(checkResponse)
    .then(data => data)
}

const checkResponse = (res) => {
    return res.ok ? res.json() : Promise.reject(console.log(res))
}