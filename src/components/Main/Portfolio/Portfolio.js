import './Portfolio.css';
import './Portfolio768.css';
import './Portfolio320.css';
import arrowLogo from '../../../images/logo/arrow.svg';

const Portfolio = ()=> {


    return (
        <section className="Portfolio">
            <h2 className="Portfolio-title">Портфолио</h2>
            <div className="Portfolio-container">
                <h2 className="Portfolio-container__title">Статичный сайт</h2>
                <img className="Portfolio-container__logo" src={arrowLogo} alt="Лого"></img>
            </div>
            <div className="Portfolio-container ">
                <h2 className="Portfolio-container__title">Адаптивный сайт</h2>
                <img className="Portfolio-container__logo" src={arrowLogo} alt="Лого"></img>
            </div>
            <div className="Portfolio-container Portfolio-container_without-line">
                <h2 className="Portfolio-container__title">Одностраничное приложение</h2>
                <img className="Portfolio-container__logo" src={arrowLogo} alt="Лого"></img>
            </div>
        </section>
    )
}

export default Portfolio;