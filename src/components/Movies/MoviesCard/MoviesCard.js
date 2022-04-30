import './MoviesCard.css';
import './MoviesCard768.css';
import './MoviesCard320.css';
import { useEffect, useState } from 'react';
import { Redirect } from 'react-router-dom';


const MoviesCard = (props) => {
    // console.log(props.card);

    //настраиваем время фильма
    const time = props.card.duration
    let hours;
    let minutes;
    const movieTime = (time) => {
        hours = Math.trunc(time / 60)
        minutes = time % 60
        return hours > 0 ? `${hours}ч ${minutes}м` : `${minutes}м`
    }

    const duration = movieTime(time)

    const isLike = (props.card.like === true ? 'MoviesCard-add MoviesCard-add_active' : 'MoviesCard-add')

    const handleMovieLike = () => {
        props.onHandleMovieLike(props.card)
    }

    return (
        <article className="MoviesCard">
            <div className="MoviesCard-info">
                <div className="MoviesCard-container">
                    <h2 className="MoviesCard-info__title">{props.card.nameRU}</h2>
                    {/* <h2 className="MoviesCard-info__duration">{props.card.duration}</h2> */}
                    <h2 className="MoviesCard-info__duration">{duration}</h2>
                </div>
                <button className={isLike} onClick={handleMovieLike}>
                </button>
            </div>
            <a className='MoviesCard-trailer' href={props.card.trailerLink} target="_blank" rel="noreferrer"><img className="MoviesCard-image" src={`https://api.nomoreparties.co/${props.card.image.url}`} alt='Фото фильма' ></img></a>
        </article>
    )
}

export default MoviesCard