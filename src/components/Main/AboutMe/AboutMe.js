import './AboutMe.css';
import './AboutMe768.css';
import './AboutMe320.css';
import TitleComponent from '../TitleComponent/TitleComponent';
// import photoStudent from '../../../images/student.png';
import photoStudent from '../../../images/2021-11-25 23-07.PNG';


const AboutMe = (props) => {


    return (
        <div className='AboutMe' id={props.student}>
            <TitleComponent title={"Студент"} />
            <div className='AboutMe-container'>
                <div className='AboutMe-student'>
                    <h2 className='AboutMe-student__name'>Владимир</h2>
                    <h3 className='AboutMe-student__profession'>Фронтенд-разработчик, 34 года</h3>
                    <p className='AboutMe-student__about'>Я родился и живу в Москве, последние 15 лет работаю автомехаником. Два года назад решил сменить профессию, выбор пал в сферу IT.
                    Прошел курс по WEB-разработке от Яндекс.Практикум и на данный момент нахожусь в актвном поиске своей первой работы. Люблю путешествовать, учиться чему-то новому, и хочу прокачать свой английский.</p>
                    <ul className='AboutMe-student__links'>
                        <li className='AboutMe-student__link'><a href='https://ru-ru.facebook.com/' target="_blank" rel="noreferrer">Facebook</a></li>
                        <li className='AboutMe-student__link'><a href="https://github.com/Vladimir412" target="_blank" rel="noreferrer">Github</a></li>
                    </ul>
                </div>
                <img className='AboutMe-photo' src={photoStudent} alt="Фото студента"></img>
            </div>
        </div>
    )
}

export default AboutMe