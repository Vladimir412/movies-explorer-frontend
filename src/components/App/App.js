import logo from '../../images/logo/logo.svg';
import { useState, useEffect } from 'react';

import { Route, Switch, useHistory, Link, NavLink } from 'react-router-dom'
import './App.css';
import Login from '../SetingsProfile/Login/Login';
import Register from '../SetingsProfile/Register/Register';
import Header from '../UseAllPage/Header/Header';
import Footer from '../UseAllPage/Footer/Footer';
import Promo from '../Main/Promo/Promo';
import AboutProject from '../Main/AboutProject/AboutProject';
import Techs from '../Main/Techs/Techs';
import AboutMe from '../Main/AboutMe/AboutMe';
import Portfolio from '../Main/Portfolio/Portfolio';
import Error404 from '../Error404/Error404';
import * as MainApi from '../../utils/Main';
import * as MovieasApi from '../../utils/MoviesApi';
import {ProtectedRoute} from '../ProtectedRoute/ProtectedRoute';
import Movies from '../Movies/Movies';
import SavedMovies from '../SavedMovies/SavedMovies';
import ProfilePage from '../SetingsProfile/ProfilePage/ProfilePage';
import { CurrentUserContext } from '../../contexts/CurrentUserContext';
import Popup from '../Popup/Popup';

function App() {

const history = useHistory();
const [currentUser, setCurrentUser] = useState({})

//состояние прелоадера
const [isLoading, setIsLoading] = useState(false);

//состояние авторизация
const [isLoggedIn, setIsLoggedIn] = useState(false)
const handleIsLoggedIn = () => {
  setIsLoggedIn(true)
}

//проверка аторизации при обновление состояния
useEffect(() => {
  tokenCheck()
}, [isLoggedIn])

//проверка авторизации
const tokenCheck = () => {
  if (localStorage.getItem('jwt')) {
    handleIsLoggedIn(true)
    history.push('/movies')
  }
}

//получение данных о пользователе
useEffect(() => {
  if (localStorage.getItem('jwt')) {
    MainApi.getInfoAboutUser()
    .then(data => setCurrentUser(data))
    .catch(err => console.log(err))
  }
}, [isLoggedIn])

//регистрация пользователя
const handleRegister = (name, email, password) => {
  console.log(name);
  console.log(email);
  console.log(password);
  // MainApi.signup(name, email, password)
  // .then()
}

//авторизация
const handleLogin = (email, password) => {
  console.log(email);
  console.log(password);
  MainApi.signin(email, password)
  .then(res => {
    localStorage.setItem('jwt', res.token)
    handleIsLoggedIn(true)
    history.push('/movies')
  })

  .catch(err => console.log(err))
}

//массив всех фильмов
const [cards, setCards] = useState([])

const [middleMovies, setMiddleMovies] = useState([])

//ошибки при поиске фильмов
const [messageMovies, setMessageMovies] = useState('')

//название фильма
const [getTitleFilms, setGetTitleFilms] = useState('')

const [resultShortsFilm, setResultShortsFilm] = useState(false)

//получение фильмов когда пользователь авторизован
useEffect(() => {
  if (localStorage.getItem('jwt')) {
    MovieasApi.getMovies()
    .then((data) => {
      setCards(() => {
        return data.map(i => {
          let obj = i
          obj.like = false
          return obj
        })
      })
    })
    .catch(() => {
      setMessageMovies('Во время запроса произошла ошибка. Возможно, проблема с соединением или сервер недоступен. Подождите немного и попробуйте ещё раз')
    })
  }
}, [isLoggedIn])

//найденные фильмы
const [movieOnPage, setMovieOnPage] = useState([])

//стостояние кнопки "еще"
const [buttonElse, setButtonElse] = useState(false)

const [fakemovies, setFakeMovies] = useState([])

//настройка кнопки еще
const stateButtonElse = (quantity) => {
  if (middleMovies.length > movieOnPage.length) {
    setButtonElse(true)
  } 
  if (middleMovies.length <= movieOnPage.length + quantity) {
    setButtonElse(false)
  }
}

//добовляем фильмы для первоночальной отрисовки
const showMovie = (array, number) => {
  let arr = []
    if (array.length > number) {
      setButtonElse(true)
        arr = array.slice(0, number)
        setMovieOnPage(arr)
    } else {
      setMovieOnPage(array)
    }
}
// console.log(resultShortsFilm);

const searhFilm = (films) => {
  return films.filter(i => {
    const { country, director, duration, year, description, thumbnail, nameRU, nameEN, id} = i
    const trailer = i.trailerLink
    const image = i.image.url
    if (i.nameRU.includes(getTitleFilms) && i.duration <= 40 && i.duration > 0) {
      setMessageMovies('')
      return { country, director, duration, year, description, image, trailer, thumbnail, nameRU, nameEN, movieId: id, id, key: id }
    }
  })
}

const filterShortFilms = (films) => {
  setMiddleMovies(() => {
    return searhFilm(films)
  })
}

//отфильтровываем фильмы по названию
useEffect(() => {
  if (getTitleFilms !== '') {
  console.log(getTitleFilms);
  setIsLoading(true)
  setMessageMovies('')
  if (resultShortsFilm) {
      return filterShortFilms(cards)
  }
  setMiddleMovies(cards.filter(item => {
    const { country, director, duration, year, description, thumbnail, nameRU, nameEN, id} = item
    const trailer = item.trailerLink
    const image = item.image.url
    if (item.nameRU.includes(getTitleFilms)) {
      return { country, director, duration, year, description, image, trailer, thumbnail, nameRU, nameEN, movieId: id, id, key: id }
    }
  }))
  return () => {
    setIsLoading(false)
  }
}}, [getTitleFilms, resultShortsFilm])

useEffect(() => {
  if (movieOnPage.length === 0 && getTitleFilms.length > 0) {
    setMessageMovies('Ничего не найдено')
  }
}, [movieOnPage])



//отрисовка фильмов
useEffect(() => {
  if (window.innerWidth >= 1280) {
      showMovie(middleMovies, 12)
  }
  if (window.innerWidth >= 768 && window.innerWidth < 1280) {
     showMovie(middleMovies, 8)
  }
  if (window.innerWidth >= 320 && window.innerWidth < 768) {
      showMovie(middleMovies, 5)
  }
  return () => {
    setIsLoading(false)
  }
}, [middleMovies])

//добавление фильмов на нажатие кнопки "еще"
const addSomeMovies = (step) => {
  const addElements = middleMovies.slice(movieOnPage.length, movieOnPage.length + step)
  const middle = [...movieOnPage, ...addElements]
  setMovieOnPage(middle)
  setFakeMovies(middle)
  stateButtonElse(step)    
}

//состояние сохраненных фильмов
const [savedMovies, setSavedMovies] = useState([])

const [middleSavedMovies, setMiddleSavedMovies] = useState([])

const [getTitleSavedFilms, setGetTitleSavedFilms] = useState('')

//получение сохраненных фильмов
useEffect(() => {
  if (localStorage.getItem('jwt')) {
    MainApi.getMovies()
    .then(movies => setSavedMovies(movies))
    .catch(err => console.log(err))
  }
}, [isLoggedIn])

useEffect(() => {
  if (getTitleSavedFilms !== '') {
  console.log(getTitleSavedFilms);
}}, [getTitleSavedFilms])

//добовление удаление фильма со страницы movies
const handleMovieLike = (card) => {
  let newMovie
  const { director, duration, year, description, trailer = card.trailerLink, thumbnail = 'o_O', movieId = card.id, nameRU } = card;
  const nameEN = (card.nameEN === '' ? '*******' : card.nameEN)
  const country = (card.country === null ? '*** *****' : card.country)
  const image = `https://api.nomoreparties.co/${card.image.url}`;
  newMovie = (savedMovies.data || savedMovies).some(element => {
    return element.movieId === card.id
  });
  
    if ((savedMovies.data || savedMovies).length === 0 || newMovie === false) {
      return MainApi.createMovie(country, director, duration, year, description, image, trailer, thumbnail, movieId, nameRU, nameEN)
        .then(savedMovie => {
          setSavedMovies([...(savedMovies.data || savedMovies), savedMovie.data])
        })
        .catch(err => console.log(err))
    }
    if (newMovie) {
      let movieForDelete = (savedMovies.data || savedMovies).find(i => i.movieId === card.id)
       MainApi.deleteMovie(movieForDelete._id)
       .then(res => setSavedMovies((savedMovies) => {
           return (savedMovies.data || savedMovies).filter(j => j.movieId !== card.id)
          }
          ))
        .then(() => setMovieOnPage((movieOnPage) => {
          return movieOnPage.map(i => i.id === card.id ? {...i, like: false} : i)
        }))
        .catch(err => console.log(err))  
    }
}

const likeForFilms = () => {
  if (savedMovies.length !== 0) {
    (savedMovies.data || savedMovies).forEach(i => {
      setMovieOnPage((movieOnPage) => {
        return movieOnPage.map(j => j.id === i.movieId ? {...j, like: true} : j)
    })
  })
  }
}

//отрисовка лайков
useEffect(() => {
  likeForFilms()
}, [savedMovies, middleMovies, buttonElse, fakemovies])

//удаление карточки находятсь на странице saved-movies
const handleMovieDelete = (card) => {
  MainApi.deleteMovie(card._id)
  .then(() => {
    setSavedMovies((savedMovies) => {
      console.log(savedMovies);
      return (savedMovies.data || savedMovies).filter(i => i._id !== card._id)
    })
  })
  .catch(err => console.log(err))
}

 //состояние popup
const [isMenuOpen, setIsMenuOpen] = useState(false)
const handleSetIsMenuOpen = () => {
  setIsMenuOpen(true)
}

//закрытие popup
const closePopup = () => {
  setIsMenuOpen(false)
}

//закрытие popup на Esc
useEffect(() => {
  const closeOnEscape = (e) => {
    if (e.key === 'Escape') {
      closePopup()
    }
  }
  document.addEventListener('keydown', closeOnEscape);
    
  return () => {
    document.removeEventListener('keydown', closeOnEscape)
  }
    
}, [])

//классы для состояния popup меню
const sandwichMenu = (isMenuOpen ? 'popup__open' : 'popup')

//выход из аккаунта
const loginOut = () => {
  localStorage.removeItem('jwt');
  setIsLoggedIn(false);
  history.push('/')
}


  return (
    <div className="App">
      <CurrentUserContext.Provider value={currentUser}>
      <Switch>
        <Route path='/signup'>
          < Register
            onHandleRegister={handleRegister}
            aboutProject={<Link to="/" className='Register-logo'><img className='Register-logo__img' src={logo} alt="Логотип"/></Link>}
            signin={<Link to="/signin" className='Register-question__signin'>Войти</Link>}
          />
        </Route>
        <Route path='/signin'>
          < Login 
            onHandleLogin={handleLogin}
            aboutProject={<Link to="/" className='Login-logo'><img className='Login-logo' src={logo} alt="Логотип"/></Link>}
            signup={<Link to="/signup" className='Login-question__signin'>Регистрация</Link>}
          />
        </Route>
        <ProtectedRoute path="/profile"
          component={ProfilePage}
          aboutProject={<Link to="/" className='Header-logo__movies'><img className='Header-logo' src={logo} alt="Логотип"/></Link>}
          savedMovies={<Link to="/saved-movies" className='Navigation-movies__saved'>Сохранённые фильмы</Link>}
          movies={<Link to="/movies" className='Navigation-movies__movie'>Фильмы</Link>}
          account={<Link to="/profile" className='Navigation-control__account Navigation-control__account_active'></Link>}
          deactiveRegister={true}
          deactiveLogin={true}
          exit={<Link to='/' onClick={loginOut} className='Profile-button-exit-account_text'>Выйти из аккаунта</Link>}
          sandwich={<button className='Navigation-control__sandwich' onClick={handleSetIsMenuOpen} type='button'></button>}
          sandwichMenu={sandwichMenu}
          onClosePopup={closePopup}
          closePopup={closePopup}
          aboutProjectPopup={<Link to="/" className='popup-container__title'>Главная</Link>}
          savedMoviesPopup={<Link to="/saved-movies" className='popup-container__saved-movies'>Сохранённые фильмы</Link>}
          moviesPopup={<Link to="/movies" className='popup-container__movies'>Фильмы</Link>}
          accountPopup={<Link to="/profile" className='popup-container__account'></Link>}
          isLoggedIn={isLoggedIn}

        />
        <ProtectedRoute path="/movies"
          component={Movies}
          setResultShortsFilm={setResultShortsFilm}
          aboutProject={<Link to="/" className='Header-logo__movies'><img className='Header-logo' src={logo} alt="Логотип"/></Link>}
          savedMovies={<Link to="/saved-movies" className='Navigation-movies__saved'>Сохранённые фильмы</Link>}
          movies={<Link to="/movies" className='Navigation-movies__movie'>Фильмы</Link>}
          account={<Link to="/profile" className='Navigation-control__account Navigation-control__account_active'></Link>}
          sandwich={<button className='Navigation-control__sandwich' onClick={handleSetIsMenuOpen} type='button'></button>}
          deactiveRegister={true}
          deactiveLogin={true}
          onSetGetTitleFilms={setGetTitleFilms}
          onHandleMovieLike={handleMovieLike}
          onAddSomeMovies= {addSomeMovies}
          savedMoviesOnPage={savedMovies}
          isLoading={isLoading}
          messageMovies={messageMovies}
          movieOnPage={movieOnPage}
          middleMovies={middleMovies}
          onButtonElse={buttonElse}
          onClosePopup={closePopup}
          sandwichMenu={sandwichMenu}
          aboutProjectPopup={<Link to="/" className='popup-container__title'>Главная</Link>}
          savedMoviesPopup={<Link to="/saved-movies" className='popup-container__saved-movies'>Сохранённые фильмы</Link>}
          moviesPopup={<Link to="/movies" className='popup-container__movies'>Фильмы</Link>}
          accountPopup={<Link to="/profile" className='popup-container__account'></Link>}
          isLoggedIn={isLoggedIn}
          closePopup={closePopup}
              />
        <ProtectedRoute path="/saved-movies"
          component={SavedMovies}
          setGetTitleSavedFilms={setGetTitleSavedFilms}
          aboutProject={<Link to="/" className='Header-logo__movies'><img className='Header-logo' src={logo} alt="Логотип"/></Link>}
          savedMovies={<Link to="/saved-movies" className='Navigation-movies__saved'>Сохранённые фильмы</Link>}
          movies={<Link to="/movies" className='Navigation-movies__movie'>Фильмы</Link>}
          account={<Link to="/profile" className='Navigation-control__account Navigation-control__account_active' ></Link>}
          sandwich={<button className='Navigation-control__sandwich' type='button' onClick={handleSetIsMenuOpen}></button>}
          deactiveRegister={true}
          deactiveLogin={true}
          onHandleMovieDelete={handleMovieDelete}
          savedMoviesOnPage={savedMovies}
          onClosePopup={closePopup}
          sandwichMenu={sandwichMenu}
          aboutProjectPopup={<Link to="/" className='popup-container__title'>Главная</Link>}
          savedMoviesPopup={<Link to="/saved-movies" className='popup-container__saved-movies'>Сохранённые фильмы</Link>}
          moviesPopup={<Link to="/movies" className='popup-container__movies'>Фильмы</Link>}
          accountPopup={<Link to="/profile" className='popup-container__account'></Link>}
          isLoggedIn={isLoggedIn}
          closePopup={closePopup}
        />
        <Route exact path='/'>
          < Header 
            position={true}
            sandwich={<button className='Navigation-control__sandwich' type='button' onClick={handleSetIsMenuOpen}></button>}
            // sandwich={<button className='Navigation-control__sandwich' type='button'></button>}
            account={<Link to="/profile" className='Navigation-control__account Navigation-control__account_active' ></Link>}
            savedMovies={<Link to="/saved-movies" className='Navigation-movies__saved'>Сохранённые фильмы</Link>}
            movies={<Link to="/movies" className='Navigation-movies__movie'>Фильмы</Link>}
            isLoggedIn={isLoggedIn}
            aboutProject={<img className='Header-logo Header-logo_deactive' src={logo} alt='Логотип' />}
            register={<Link to="/signup" className='Navigation-control__register'>Регистрация</Link>}
            login={<NavLink to="/signin" className='Navigation-control__text'>Войти</NavLink>}
          />
          < Promo
            closePopup={closePopup}
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
          <Popup
              sandwichMenu={sandwichMenu}
              onClosePopup={closePopup}
              aboutProject={<Link to="/" className='popup-container__title'>Главная</Link>}
              savedMovies={<Link to="/saved-movies" className='popup-container__saved-movies'>Сохранённые фильмы</Link>}
              movies={<Link to="/movies" className='popup-container__movies'>Фильмы</Link>}
              account={<Link to="/profile" className='popup-container__account'></Link>}
          />
        </Route>
        <Route path='/error'>
          <Error404
            return={<Link to="/" className='Error404-button' >Назад</Link>}
          />
        </Route>
      </Switch>
      </CurrentUserContext.Provider>
    </div>
  );
}

export default App;
