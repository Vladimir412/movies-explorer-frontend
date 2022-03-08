import './SearchForm.css';
import './SearchForm768.css';
import './SearchForm320.css';
import { useState } from 'react';

const SearchForm = (props) => {

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
        e.preventDefault();
        // props.onHandleSetClickSubmit(true)
        props.onSetGetTitleFilms(movies)
        setMovies('')
    }


    return (
        <section className="SearchForm">
            <form className='SearchForm-form' onSubmit={handleSubmit}>
                <input className="SearchForm-form__input" value={movies} onChange={handleSetMovies} type="text" placeholder="Фильм" minLength="1" maxLength="100" required/>
                <button className='SearchForm-form__button' type='submit'>Найти</button>
            </form>
            <label className="label">
                <input className="label__checkbox" value={shortFilms} onChange={handleSetShortFilms} type="checkbox" id="checkbox" />
                <span className="label__fake"></span>
                <span className="label__name">Короткометражки</span>
            </label>
        </section>
    )
}

export default SearchForm