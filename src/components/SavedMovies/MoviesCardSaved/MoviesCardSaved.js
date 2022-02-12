import delIcon from '../../../images/del-icon.png';
import './MoviesCardSaved.css';
import picture from '../../../images/pictureOne.jpg';


const MoviesCardSaved = () => {


    return (
        <div className="MoviesCardSaved">
            <div className="MoviesCardSaved-info">
                <div className="MoviesCardSaved-container">
                    <h2 className="MoviesCardSaved-info__title">33 слова о дизайне</h2>
                    <h2 className="MoviesCardSaved-info__duration">1ч 47м</h2>
                </div>
                <div className="MoviesCardSaved-delete">
                    <img className='MoviesCardSaved-delete__img' src={delIcon} alt='Иконка удаления'></img>
                </div>
            </div>
            <img className="MoviesCardSaved-image" src={picture} alt='Фото фильма'></img>
        </div>
    )
}

export default MoviesCardSaved