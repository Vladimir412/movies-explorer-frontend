import './AboutProject.css';
import './AboutProject768.css';
import './AboutProject320.css';
import TitleComponent from '../TitleComponent/TitleComponent';



const AboutProject = (props) => {


    return (
        <div className='AboutProject' id={props.aboutProject}>
            < TitleComponent title={"О проекте"} />
            <div className='AboutProject-info'>
                <h2 className='AboutProject-info__title AboutProject-info__title_first-row'>Дипломный проект включал 5 этапов</h2>
                <h2 className='AboutProject-info__title AboutProject-info__title_third-row'>На выполнение диплома ушло 5 недель</h2>
                <p className='AboutProject-info__subtitle AboutProject-info__subtitle_second-row'>Составление плана, работу над бэкендом, вёрстку, добавление функциональности и финальные доработки.</p>
                <p className='AboutProject-info__subtitle AboutProject-info__subtitle_fourth-row'>У каждого этапа был мягкий и жёсткий дедлайн, которые нужно было соблюдать, чтобы успешно защититься.</p>
            </div>
            <div className='AboutProject-plan'>
                <p className='AboutProject-plan__first-week'>1 неделя</p>
                <p className='AboutProject-plan__other-week'>4 недели</p>
                <p className='AboutProject-plan__front'>Front-end</p>
                <p className='AboutProject-plan__back'>Back-end</p>
            </div>
        </div>
    )
}

export default AboutProject