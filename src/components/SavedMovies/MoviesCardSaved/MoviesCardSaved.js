import delIcon from '../../../images/logo/delete-icon.svg';
import './MoviesCardSaved.css';
import picture from '../../../images/pictureOne.jpg';


const MoviesCardSaved = () => {


    return (
        <article className="MoviesCardSaved">
            <div className="MoviesCardSaved-info">
                <div className="MoviesCardSaved-container">
                    <h2 className="MoviesCardSaved-info__title">33 слова о дизайне</h2>
                    <h2 className="MoviesCardSaved-info__duration">1ч 47м</h2>
                </div>
                <button className="MoviesCardSaved-delete"></button>
            </div>
            <img className="MoviesCardSaved-image" src={picture} alt='Фото фильма'></img>
        </article>
    )
}

export default MoviesCardSaved