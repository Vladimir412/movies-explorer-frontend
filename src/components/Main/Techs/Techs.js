import './Techs.css';
import './Techs768.css';
import './Techs320.css';
import TitleComponent from '../TitleComponent/TitleComponent';

const Techs = (props) => {


    return (
        <div className="Techs" id={props.techs}>
            < TitleComponent title={"Технологии"} />
            <div className='Techs-component'>
                <h2 className='Techs-title'>
                    7 технологий
                </h2>
                <p className='Techs-subtitle'>
                    На курсе веб-разработки мы освоили технологии, которые применили в дипломном проекте.
                </p>
                <ul className='Techs-container'>
                    <li className='Techs-technology'>
                        <p className='Techs-technology__title'>HTML</p>
                    </li>
                    <li className='Techs-technology'>
                        <p className='Techs-technology__title'>CSS</p>
                    </li>
                    <li className='Techs-technology'>
                        <p className='Techs-technology__title'>JS</p>
                    </li>
                    <li className='Techs-technology'>
                        <p className='Techs-technology__title'>React</p>
                    </li>
                    <li className='Techs-technology'>
                        <p className='Techs-technology__title'>Git</p>
                    </li>
                    <li className='Techs-technology'>
                        <p className='Techs-technology__title'>Express.js</p>
                    </li>
                    <li className='Techs-technology'>
                        <p className='Techs-technology__title'>mongoDB</p> 
                    </li>
                </ul>
            </div>
        </div>
    )
}

export default Techs