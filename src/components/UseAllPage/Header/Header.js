// import logo from '../../../images/logo/logo.svg'
// import accountLogo from '../../../images/logo/icon-main.svg';
import './Header.css';
import './Header768.css';
import './Header320.css';
import Navigation from '../../UseAllPage/Navigation/Navigation';

const Header = (props) => {


    return (
        <section className='Header'>
            {props.aboutProject}
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
        </section>
    )
}

export default Header