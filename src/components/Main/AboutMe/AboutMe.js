import './AboutMe.css';
import './AboutMe768.css';
import './AboutMe320.css';
import TitleComponent from '../TitleComponent/TitleComponent';
import photoStudent from '../../../images/student.png';


const AboutMe = (props) => {


    return (
        <div className='AboutMe' id={props.student}>
            <TitleComponent title={"Студент"} />
            <div className='AboutMe-container'>
                <div className='AboutMe-student'>
                    <h2 className='AboutMe-student__name'>Виталий</h2>
                    <h3 className='AboutMe-student__profession'>Фронтенд-разработчик, 30 лет</h3>
                    <p className='AboutMe-student__about'>Я родился и живу в Саратове, закончил факультет экономики СГУ. У меня есть жена
                    и дочь. Я люблю слушать музыку, а ещё увлекаюсь бегом. Недавно начал кодить. С 2015 года работал в компании «СКБ Контур». После того, как прошёл курс по веб-разработке, начал заниматься фриланс-заказами и ушёл с постоянной работы.</p>
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