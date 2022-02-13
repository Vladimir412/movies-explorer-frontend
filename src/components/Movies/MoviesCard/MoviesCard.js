import './MoviesCard.css';
import './MoviesCard768.css';
import './MoviesCard320.css';
import picture from '../../../images/pictureOne.jpg';


const MoviesCard = () => {


    return (
        <article className="MoviesCard">
            <div className="MoviesCard-info">
                <div className="MoviesCard-container">
                    <h2 className="MoviesCard-info__title">33 слова о дизайне</h2>
                    <h2 className="MoviesCard-info__duration">1ч 47м</h2>
                </div>
                <button className="MoviesCard-delete">
                </button>
            </div>
            <img className="MoviesCard-image" src={picture} alt='Фото фильма'></img>
        </article>
    )
}

export default MoviesCard