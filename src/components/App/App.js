import logo from '../../images/logo/logo.svg';
import { Route, Switch, Link, NavLink } from 'react-router-dom'
// import { Redirect, Route, Switch, useHistory, Link, NavLink } from 'react-router-dom'
import './App.css';
import Login from '../SetingsProfile/Login/Login';
import Register from '../SetingsProfile/Register/Register';
import Header from '../UseAllPage/Header/Header';
import Profile from '../SetingsProfile/Profile/Profile';
import SearchForm from '../SearchForm/SearchForm';
// import MoviesCard from '../SavedMovies/MoviesCard/MoviesCard';
import MoviesCardListSaved from '../SavedMovies/MoviesCardListSaved/MoviesCardListSaved';
import MoviesCardList from '../Movies/MoviesCardList/MoviesCardList';
import Footer from '../UseAllPage/Footer/Footer';
import Promo from '../Main/Promo/Promo';
import AboutProject from '../Main/AboutProject/AboutProject';
import Techs from '../Main/Techs/Techs';
import AboutMe from '../Main/AboutMe/AboutMe';
import Portfolio from '../Main/Portfolio/Portfolio';
import Error404 from '../Error404/Error404';
import Popup from '../Popup/Popup';

function App() {
  return (
    <div className="App">
      <Switch>
        <Route path='/signup'>
          < Register
            aboutProject={<Link to="/" className='Register-logo'><img className='Register-logo__img' src={logo} alt="Логотип"/></Link>}
            signin={<Link to="/signin" className='Register-question__signin'>Войти</Link>}
          />
        </Route>
        <Route path='/signin'>
          < Login 
            aboutProject={<Link to="/" className='Login-logo'><img className='Login-logo' src={logo} alt="Логотип"/></Link>}
            signup={<Link to="/signup" className='Login-question__signin'>Регистрация</Link>}
          />
        </Route>
        <Route path="/profile">
          <Header 
            aboutProject={<Link to="/" className='Header-logo__movies'><img className='Header-logo' src={logo} alt="Логотип"/></Link>}
            savedMovies={<Link to="/saved-movies" className='Navigation-movies__saved'>Сохранённые фильмы</Link>}
            movies={<Link to="/movies" className='Navigation-movies__movie'>Фильмы</Link>}
            account={<Link to="/profile" className='Navigation-control__account'></Link>}
            sandwich={<button className='Navigation-control__sandwich' type='button'></button>}
            deactiveRegister={true}
            deactiveLogin={true}
          />
          <Profile
            exit={<Link to='/' className='Profile-buttons__button_exit-account'>Выйти из аккаунта</Link>}
          />
          <Popup 
            aboutProject={<Link to="/" className='popup-container__title'>Главная</Link>}
            savedMovies={<Link to="/saved-movies" className='popup-container__saved-movies'>Сохранённые фильмы</Link>}
            movies={<Link to="/movies" className='popup-container__movies'>Фильмы</Link>}
            account={<Link to="/profile" className='popup-container__account'></Link>}
          />
        </Route>
        <Route path="/movies">
          <Header 
            aboutProject={<Link to="/" className='Header-logo__movies'><img className='Header-logo' src={logo} alt="Логотип"/></Link>}
            savedMovies={<Link to="/saved-movies" className='Navigation-movies__saved'>Сохранённые фильмы</Link>}
            movies={<Link to="/movies" className='Navigation-movies__movie'>Фильмы</Link>}
            account={<Link to="/profile" className='Navigation-control__account'></Link>}
            sandwich={<button className='Navigation-control__sandwich' type='button'></button>}
            deactiveRegister={true}
            deactiveLogin={true}
          />
          <SearchForm />
          <MoviesCardList />
          <Footer />
          <Popup 
            aboutProject={<Link to="/" className='popup-container__title'>Главная</Link>}
            savedMovies={<Link to="/saved-movies" className='popup-container__saved-movies'>Сохранённые фильмы</Link>}
            movies={<Link to="/movies" className='popup-container__movies'>Фильмы</Link>}
            account={<Link to="/profile" className='popup-container__account'></Link>}
          />
        </Route>
        <Route path="/saved-movies">
          <Header 
            aboutProject={<Link to="/" className='Header-logo__movies'><img className='Header-logo' src={logo} alt="Логотип"/></Link>}
            savedMovies={<Link to="/saved-movies" className='Navigation-movies__saved'>Сохранённые фильмы</Link>}
            movies={<Link to="/movies" className='Navigation-movies__movie' activeClassName='Navigation-movies_active'>Фильмы</Link>}
            account={<Link to="/profile" className='Navigation-control__account' ></Link>}
            sandwich={<button className='Navigation-control__sandwich' type='button'></button>}
            deactiveRegister={true}
            deactiveLogin={true}
          />
          <SearchForm />
          <MoviesCardListSaved />
          <Footer />
          <Popup 
            aboutProject={<Link to="/" className='popup-container__title'>Главная</Link>}
            savedMovies={<Link to="/saved-movies" className='popup-container__saved-movies'>Сохранённые фильмы</Link>}
            movies={<Link to="/movies" className='popup-container__movies'>Фильмы</Link>}
            account={<Link to="/profile" className='popup-container__account'></Link>}
          />
        </Route>
        <Route exact path='/'>
          < Header 
            aboutProject={<img className='Header-logo Header-logo_deactive' src={logo} alt='Логотип' />}
            register={<Link to="/signup" className='Navigation-control__register'>Регистрация</Link>}
            login={<NavLink to="/signin" className='Navigation-control__text'>Войти</NavLink>}
          />
          < Promo
            project={<a href='#about-project' className='NavTab-link'>О проекте</a>}
            techs={<a href='#technologies' className='NavTab-link'>Технологии</a>}
            student={<a href='#student' className='NavTab-link'>Студент</a>}
          />
          <AboutProject
            aboutProject={"about-project"}
          />
          < Techs
            techs={"technologies"}
          />
          <AboutMe
            student={"student"}
          />
          < Portfolio
            static={<a className="Portfolio-container__title" href='https://github.com/Vladimir412/how-to-learn' target="_blank" rel="noreferrer">Статичный сайт</a>}
            adaptive={<a className="Portfolio-container__title" href='https://github.com/Vladimir412/russian-travel' target="_blank" rel="noreferrer">Адаптивный сайт</a>}
            singleApp={<a className="Portfolio-container__title" href='https://github.com/Vladimir412/react-mesto-api-full' target="_blank" rel="noreferrer">Одностраничное приложение</a>}
          />
          < Footer />
        </Route>
        <Route path='/error'>
          <Error404
            return={<Link to="/" className='Error404-button' >Назад</Link>}
          />
        </Route>
      </Switch>
    </div>
  );
}

export default App;
