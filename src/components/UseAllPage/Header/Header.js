// import logo from '../../../images/logo/logo.svg'
// import accountLogo from '../../../images/logo/icon-main.svg';
import './Header.css';
import './Header768.css';
import './Header320.css';
import Navigation from '../../UseAllPage/Navigation/Navigation';

const Header = (props) => {


    return (
        <div className='Header'>
            {props.aboutProject}
            {/* <img className='Header-logo' src={logo} alt='Логотип' /> */}
            < Navigation
                movies={props.movies}
                savedMovies={props.savedMovies}
                register={props.register}
                login={props.login}
                account={props.account}
                deactiveRegister={props.deactiveRegister}
                deactiveLogin={props.deactiveLogin}
                sandwich={props.sandwich}
            />
            {/* <div className='Header-films'>
                <h2>gsdfsdfsd</h2>
            </div>
            <div className='Header-account'>
            <h2 className='Header-account__title'>Аккаунт</h2>
            <div className='Header-account__box'>
            <img className='Header-account__logo' src={accountLogo} alt='Лого аккаунта' />
            </div>
            </div> */}
        </div>
    )
}

export default Header