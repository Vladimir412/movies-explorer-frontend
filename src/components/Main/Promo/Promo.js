import './Promo.css';
import './Promo768.css';
import './Promo320.css';
import NavTab from '../NavTab/NavTab';

const Promo = (props) => {


    return (
        <div className="Promo">
            <h1 className="Promo-title">Учебный проект студента факультета Веб-разработки.</h1>
            <NavTab
            project={props.project}
            techs={props.techs}
            student={props.student}
            />
        </div>
    )
}

export default Promo