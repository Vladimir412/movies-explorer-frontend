import './Portfolio.css';
import './Portfolio768.css';
import './Portfolio320.css';
import arrowLogo from '../../../images/logo/arrow.svg';

const Portfolio = (props)=> {


    return (
        <section className="Portfolio">
            <h2 className="Portfolio-title">Портфолио</h2>
            <div className="Portfolio-container">
                {props.static}
                <img className="Portfolio-container__logo" src={arrowLogo} alt="Лого"></img>
            </div>
            <div className="Portfolio-container ">
                {props.adaptive}
                <img className="Portfolio-container__logo" src={arrowLogo} alt="Лого"></img>
            </div>
            <div className="Portfolio-container Portfolio-container_without-line">
                {props.singleApp}
                <img className="Portfolio-container__logo" src={arrowLogo} alt="Лого"></img>
            </div>
        </section>
    )
}

export default Portfolio;