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
                {/* <h2 className="Portfolio-container__title">{props.static}</h2> */}
                <img className="Portfolio-container__logo" src={arrowLogo} alt="Лого"></img>
            </div>
            <div className="Portfolio-container ">
                {props.adaptive}
                {/* <h2 className="Portfolio-container__title">{props.adaptive}</h2> */}
                <img className="Portfolio-container__logo" src={arrowLogo} alt="Лого"></img>
            </div>
            <div className="Portfolio-container Portfolio-container_without-line">
                {props.singleApp}
                {/* <h2 className="Portfolio-container__title">{props.singleApp}</h2> */}
                <img className="Portfolio-container__logo" src={arrowLogo} alt="Лого"></img>
            </div>
        </section>
    )
}

export default Portfolio;