import delIcon from '../../../images/logo/delete-icon.svg';
import './MoviesCardSaved.css';
import picture from '../../../images/pictureOne.jpg';


const MoviesCardSaved = ({card, onHandleMovieDelete}) => {

    // const card = props.card
    const idForDelete = card._id
    // console.log(idForDelete);
    // console.log(card);

    const time = card.duration
    let hours;
    let minutes;
    const movieTime = (time) => {
        hours = Math.trunc(time / 60)
        minutes = time % 60
        return hours > 0 ? `${hours}ч ${minutes}м` : `${minutes}м`
    }

    const duration = movieTime(time)
    // console.log(card);


    const handleMovieDelete = () => {
        onHandleMovieDelete(card)
    }

    return (
        <article className="MoviesCardSaved">
            <div className="MoviesCardSaved-info">
                <div className="MoviesCardSaved-container">
                    <h2 className="MoviesCardSaved-info__title">{card.nameRU}</h2>
                    <h2 className="MoviesCardSaved-info__duration">{duration}</h2>
                </div>
                <button className="MoviesCardSaved-delete" onClick={handleMovieDelete}></button>
            </div>
            <img className="MoviesCardSaved-image" src={card.image} alt='Фото фильма'></img>
        </article>
    )
}

export default MoviesCardSaved