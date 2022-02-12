import logo from '../../images/logo/logo.svg';
import { Route, Switch, Link, NavLink } from 'react-router-dom'
// import { Redirect, Route, Switch, useHistory, Link, NavLink } from 'react-router-dom'
import './App.css';
import Login from '../SetingsProfile/Login/Login';
import Register from '../SetingsProfile/Register/Register';
import Header from '../UseAllPage/Header/Header';
import Profile from '../SetingsProfile/Profile/Profile';
import SearchForm from '../Movies/SearchForm/SearchForm';
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
        {/* Для образца */}
        <Route path="/popup"> 
        <Header 
            sandwich={<button className='Navigation-control__sandwich' type='button'></button>}
            deactiveRegister={true}
            deactiveLogin={true}
          />
          <SearchForm />
          <MoviesCardList />
          <Footer />
          <Popup
            aboutProject={<Link to="/" className='Popup-container__title'>Главная</Link>}
            savedMovies={<Link to="/saved-movies" className='Popup-container__saved-movies'>Сохранённые фильмы</Link>}
            movies={<Link to="/movies" className='Popup-container__movies'>Фильмы</Link>}
            account={<Link to="/profile" className='Popup-container__account'></Link>}
          />
        </Route>
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
        </Route>
        <Route path="/movies">
          <Header 
            aboutProject={<Link to="/" className='Header-logo__movies'><img className='Header-logo' src={logo} alt="Логотип"/></Link>}
            savedMovies={<Link to="/saved-movies" className='Navigation-movies__saved'>Сохранённые фильмы</Link>}
            movies={<Link to="/movies" className='Navigation-movies__movie'>Фильмы</Link>}
            account={<Link to="/profile" className='Navigation-control__account'></Link>}
            sandwich={<Link to="/Popup" className='Navigation-control__a'><button className='Navigation-control__sandwich' type='button'></button></Link>}//Это демо
            deactiveRegister={true}
            deactiveLogin={true}
          />
          <SearchForm />
          <MoviesCardList />
          <Footer />
        </Route>
        <Route path="/saved-movies">
          <Header 
            aboutProject={<Link to="/" className='Header-logo__movies'><img className='Header-logo' src={logo} alt="Логотип"/></Link>}
            savedMovies={<Link to="/saved-movies" className='Navigation-movies__saved'>Сохранённые фильмы</Link>}
            movies={<Link to="/movies" className='Navigation-movies__movie' activeClassName='Navigation-movies_active'>Фильмы</Link>}
            account={<Link to="/profile" className='Navigation-control__account' ></Link>}
            sandwich={<button className='Navigation-control__sandwich' type='button'></button>}//будет работать как с директорией /movie. А пока как шаблон
            deactiveRegister={true}
            deactiveLogin={true}
          />
          <SearchForm />
          <MoviesCardListSaved />
          <Footer />
        </Route>
        <Route exact path='/'>
          < Header 
            aboutProject={<img className='Header-logo' src={logo} alt='Логотип' />}
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
          < Portfolio />
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
