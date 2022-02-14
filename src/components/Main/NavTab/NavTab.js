import './NavTab.css';
import './NavTab768.css';
import './NavTab320.css';

const NavTab = (props) => {


    return (
        <ul className='NavTab'>
            <li className='NavTab-links'>{props.project}</li>
            <li className='NavTab-links'>{props.techs}</li>
            <li className='NavTab-links'>{props.student}</li>
        </ul>
    )
}

export default NavTab