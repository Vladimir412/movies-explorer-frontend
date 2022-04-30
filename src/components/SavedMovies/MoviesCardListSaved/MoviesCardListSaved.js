import './MoviesCardListSaved.css'
import './MoviesCardListSaved768.css'
import './MoviesCardListSaved320.css'
import MoviesCardSaved from "../MoviesCardSaved/MoviesCardSaved";
import '../MoviesCardSaved/MoviesCardSaved.css';
import { useEffect } from 'react';
import Preloader from '../../Preloader/Preloader';

const MoviesCardListSaved = ({onHandleMovieDelete, closePopup, middleSavedMovies, messageSavedMovies, savedMoviesOnPage, isLoading}) => {

    const infoMessage = (messageSavedMovies === 'Ничего не найдено' ? 'MoviesCardListSaved__message_active' : 'MoviesCardListSaved__message')

    useEffect(() => {
        closePopup()
    }, [])

    // const arrCards = savedMovie.map(i => {
    const arrCards = middleSavedMovies.map(i => {
        return (
            <MoviesCardSaved key={i.movieId} id={i.movieId} card={i} onHandleMovieDelete={onHandleMovieDelete}/>
        )
    })


    return (
        <section className="MoviesCardListSaved">
            <div className='MoviesCardListSaved-container'>
                <h2 className={infoMessage}>{messageSavedMovies}</h2> 
                <Preloader
                    isLoading={isLoading}
                />
               {arrCards}
            </div>
        </section>
    )
}

export default MoviesCardListSaved