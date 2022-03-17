import './SearchForm.css';
import './SearchForm768.css';
import './SearchForm320.css';
import { useState } from 'react';

const SearchForm = (props) => {

    const [errMessage, setErrMessage] = useState('')

    const [movies, setMovies] = useState('')
    const handleSetMovies = (e) => {
        setMovies(e.target.value)
    }

    const [shortFilms, setShortFilms] = useState(false)
    const handleSetShortFilms = () => {
        if (shortFilms === false) {
            setShortFilms(true)
        } else {
            setShortFilms(false)
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
        }      
        if (props.setGetTitleSavedFilms) {
            props.setResultShortsSavedFilm(shortFilms)
            props.setGetTitleSavedFilms(movies) 
        }  
        setMovies('')
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
                <span className="label__fake"></span>
                <span className="label__name">Короткометражки</span>
            </label>
        </section>
    )
}

export default SearchForm