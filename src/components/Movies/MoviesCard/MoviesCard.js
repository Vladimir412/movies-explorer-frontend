import './MoviesCard.css';
import './MoviesCard768.css';
import './MoviesCard320.css';
import { useEffect, useState } from 'react';


const MoviesCard = (props) => {
    
    const savedMovies = props.savedMovies
    const movieOnPage = props.movieOnPage

    // console.log(savedMovies);
    // console.log(movieOnPage);

    //состояние лайка
    const [like, setLike] = useState(false)

    useEffect(() => {
        savedMovies.data.forEach(element => {
            if (element.movieId === props.card.id) {
                setLike(true)
            } else {
                setLike(false)
            }
        });
    }, [savedMovies])

    const time = props.card.duration
    let hours;
    let minutes;
    const movieTime = (time) => {
        hours = Math.trunc(time / 60)
        minutes = time % 60
        return hours > 0 ? `${hours}ч ${minutes}м` : `${minutes}м`
    }

    const duration = movieTime(time)

    const isLike = (like === true ? 'MoviesCard-add MoviesCard-add_active' : 'MoviesCard-add')

    const handleMovieLike = () => {
        console.log('zz');
        props.onHandleMovieLike(props.card)
        // console.log(props.like);

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
            <img className="MoviesCard-image" src={`https://api.nomoreparties.co/${props.card.image.url}`} alt='Фото фильма'></img>
        </article>
    )
}

export default MoviesCard