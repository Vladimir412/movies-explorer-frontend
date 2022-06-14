import './MoviesCardList.css';
import './MoviesCardList768.css';
import './MoviesCardList320.css';
import MoviesCard from '../MoviesCard/MoviesCard';
import Preloader from '../../Preloader/Preloader';
import { useEffect, useState } from 'react';

const MoviesCardList = ({movieOnPage, middleMovies, messageMovies, isLoading, onButtonElse, onAddSomeMovies, onHandleMovieLike, savedMovies, closePopup}) => {

    useEffect(() => {
        closePopup()
    }, [])

    const [like, setLike] = useState(false)

    const infoMessage = (messageMovies === 'Ничего не найдено' ? 'MoviesCardList__message_active' : 'MoviesCardList__message')
    const button = (onButtonElse === true ? 'MoviesCardList-button' : 'MoviesCardList-button_deactive')

    

    // const arrCards = JSON.parse(localStorage.getItem('movieOnPage')).map(i => {
    const arrCards = movieOnPage.map(i => {
        return (
            <MoviesCard key={i.id} id={i.id} card={i} onHandleMovieLike={onHandleMovieLike}/>
        )
    })

    const add = () => {

        if (window.innerWidth >= 1280) {
            onAddSomeMovies(3)
        }
          if (window.innerWidth >= 768 && window.innerWidth < 1280) {
            onAddSomeMovies(2)
        }
          if (window.innerWidth >= 320 && window.innerWidth < 768) {
            onAddSomeMovies(2)
        }
    }

    return (
        <section className="MoviesCardList">
            <div className='MoviesCardList-container'>
                <Preloader
                    isLoading={isLoading}
                />
                <h2 className={infoMessage}>{messageMovies}</h2>
                {arrCards}
               
            </div>    
                <button className={button} onClick={add}>Ещё</button>
        </section>
    )
}

export default MoviesCardList