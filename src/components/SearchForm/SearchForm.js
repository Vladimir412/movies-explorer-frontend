import './SearchForm.css';
import './SearchForm768.css';
import './SearchForm320.css';
import { useEffect, useState } from 'react';

const SearchForm = (props) => {

    const [errMessage, setErrMessage] = useState('')

    useEffect(() => {
        if (localStorage.getItem('titleMovies') !== null && props.statePage === 'movies') {
            setMovies(localStorage.getItem('titleMovies', ''))
        }
        if (localStorage.getItem('titleSavedMovies') !== null && props.statePage === 'saved-movies') {
            setMovies(localStorage.getItem('titleSavedMovies', ''))
        }
    }, [])

    const [movies, setMovies] = useState('')
    // const [movies, setMovies] = useState(props.statePage === 'movies' ? localStorage.getItem('titleMovies') : localStorage.getItem('titleSavedMovies'))
    const handleSetMovies = (e) => {
        setMovies(e.target.value)
    }

    useEffect(() => {
        if (localStorage.getItem('shortFilms') !== null && props.statePage === 'movies') {
            setShortFilms(localStorage.getItem('shortFilms'))
        }
        if (localStorage.getItem('savedShortFilms') !== null && props.statePage === 'saved-movies') {
            setShortFilms(localStorage.getItem('savedShortFilms'))
        }
    }, [])

    const [shortFilms, setShortFilms] = useState(false)
    // const [shortFilms, setShortFilms] = useState(props.statePage === 'movies'
    //     ? JSON.parse(localStorage.getItem('shortFilms'))
    //     : JSON.parse(localStorage.getItem('savedShortFilms')))

    const handleSetShortFilms = () => {
        if (shortFilms === false || shortFilms === null) {
            setShortFilms(true)
            props.statePage === 'movies' ? JSON.stringify(localStorage.setItem('shortFilms', true)) : JSON.stringify(localStorage.setItem('savedShortFilms', true))
        } else {
            setShortFilms(false)
            props.statePage === 'movies' ? JSON.stringify(localStorage.setItem('shortFilms', false)) : JSON.stringify(localStorage.setItem('savedShortFilms', false))
        }
    }

    const handleSubmit = (e) => {
        setErrMessage('')
        e.preventDefault();
        if (movies === '') {
            return setErrMessage('Нужно ввести ключевое слово')
        }
        if (props.onSetGetTitleFilms) {
            props.setResultShortsFilm(shortFilms)
            props.onSetGetTitleFilms(movies) 
            localStorage.setItem('titleMovies', movies)
            localStorage.setItem('shortFilms', shortFilms)
        }      
        if (props.setGetTitleSavedFilms) {
            props.setResultShortsSavedFilm(shortFilms)
            props.setGetTitleSavedFilms(movies)
            localStorage.setItem('titleSavedMovies', movies)
            localStorage.setItem('savedShortFilms', shortFilms)
        }  
    }

    let checkboxState = ''
    if (JSON.parse(localStorage.getItem('shortFilms')) === true && props.statePage === 'movies') {
         checkboxState = 'label__fake_active label__fake_active::after label__fake_active::before' 
    } 
    if (JSON.parse(localStorage.getItem('shortFilms')) !== true && props.statePage === 'movies') {
        checkboxState = 'label__fake label__fake::after label__fake::before'
    }
    if (JSON.parse(localStorage.getItem('savedShortFilms')) === true && props.statePage === 'saved-movies') {
        checkboxState = 'label__fake_active label__fake_active::after label__fake_active::before'
    }
    if (JSON.parse(localStorage.getItem('savedShortFilms')) !== true && props.statePage === 'saved-movies') {
        checkboxState = 'label__fake label__fake::after label__fake::before'
    }

    return (
        <section className="SearchForm">
            <form className='SearchForm-form' onSubmit={handleSubmit}>
                <input className="SearchForm-form__input" value={movies} onChange={handleSetMovies} type="text" placeholder="Фильм" maxLength="20"/>
                <button className='SearchForm-form__button' type='submit'>Найти</button>
            </form>
            <span className='SearchForm-form__input-error'>{errMessage}</span>
            <label className="label">
                <input className="label__checkbox" value={shortFilms} onChange={handleSetShortFilms} type="checkbox" id="checkbox" />
                <span className={checkboxState}></span>
                <span className="label__name">Короткометражки</span>
            </label>
        </section>
    )
}

export default SearchForm