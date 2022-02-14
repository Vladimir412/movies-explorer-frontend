import './MoviesCardListSaved.css'
import './MoviesCardListSaved768.css'
import './MoviesCardListSaved320.css'
// import MoviesCardSaved from "../MoviesCardSaved/MoviesCardSaved";
// import delIcon from '../../../images/del-icon.png';
import '../MoviesCardSaved/MoviesCardSaved.css';
import picture from '../../../images/pictureOne.jpg';

const MoviesCardListSaved = () => {


    return (
        <section className="MoviesCardListSaved">
            <div className='MoviesCardListSaved-container'>
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
                    {/* <div className="MoviesCard">
                        <div className="MoviesCard-info">
                            <div className="MoviesCard-container">
                                <h2 className="MoviesCard-info__title">33 слова о дизайне</h2>
                                <h2 className="MoviesCard-info__duration">1ч 47м</h2>
                            </div>
                            <button className="MoviesCard-delete">
                            </button>
                        </div>
                        <img className="MoviesCard-image" src={picture} alt='Фото фильма'></img>
                    </div> */}
            </div>
        </section>
    )
}

export default MoviesCardListSaved