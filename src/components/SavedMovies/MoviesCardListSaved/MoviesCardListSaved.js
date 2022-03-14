import './MoviesCardListSaved.css'
import './MoviesCardListSaved768.css'
import './MoviesCardListSaved320.css'
import MoviesCardSaved from "../MoviesCardSaved/MoviesCardSaved";
// import delIcon from '../../../images/del-icon.png';
import '../MoviesCardSaved/MoviesCardSaved.css';
import picture from '../../../images/pictureOne.jpg';
import { useEffect } from 'react';

const MoviesCardListSaved = ({savedMoviesOnPage, onHandleMovieDelete, closePopup}) => {

    useEffect(() => {
        closePopup()
    }, [])

    // console.log(savedMoviesOnPage);
    // console.log(savedMoviesOnPage.data);

    const arrCards = (savedMoviesOnPage.data || savedMoviesOnPage).map(i => {
        return (
            <MoviesCardSaved key={i.movieId} id={i.movieId} card={i} onHandleMovieDelete={onHandleMovieDelete}/>
        )
    })



    return (
        <section className="MoviesCardListSaved">
            <div className='MoviesCardListSaved-container'>
               {arrCards}
            </div>
        </section>
    )
}

export default MoviesCardListSaved