import './MoviesCardListSaved.css'
import './MoviesCardListSaved768.css'
import './MoviesCardListSaved320.css'
import MoviesCardSaved from "../MoviesCardSaved/MoviesCardSaved";
import '../MoviesCardSaved/MoviesCardSaved.css';
import { useEffect } from 'react';

const MoviesCardListSaved = ({onHandleMovieDelete, closePopup, middleSavedMovies, messageSavedMovies}) => {

    const infoMessage = (messageSavedMovies === 'Ничего не найдено' ? 'MoviesCardListSaved__message_active' : 'MoviesCardListSaved__message')

    useEffect(() => {
        closePopup()
    }, [])

    const arrCards = middleSavedMovies.map(i => {
        return (
            <MoviesCardSaved key={i.movieId} id={i.movieId} card={i} onHandleMovieDelete={onHandleMovieDelete}/>
        )
    })

    return (
        <section className="MoviesCardListSaved">
            <div className='MoviesCardListSaved-container'>
                <h2 className={infoMessage}>{messageSavedMovies}</h2> 
               {arrCards}
            </div>
        </section>
    )
}

export default MoviesCardListSaved