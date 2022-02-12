import './Footer.css';
import './Footer768.css';
import './Footer320.css';

const Footer = () => {


    return (
        <div className="Footer">
            <h2 className='Footer-title'>Учебный проект Яндекс.Практикум х BeatFilm.</h2>
            <div className='Footer-info'>
                <p className='Footer-date'>
                    &#169;{new Date().getFullYear()}
                </p>
                <ul className='Footer-links'>
                    <li className='Footer-link'><a href="https://practicum.yandex.ru" target="_blank" rel="noreferrer">Яндекс.Практикум</a></li>
                    <li className='Footer-link'><a href="https://github.com" target="_blank" rel="noreferrer">Github</a></li>
                    <li className='Footer-link'><a href='https://ru-ru.facebook.com' target="_blank" rel="noreferrer">Facebook</a></li>
                </ul>
            </div>
        </div>
    )
}

export default Footer