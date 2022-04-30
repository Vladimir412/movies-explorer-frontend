import logo from '../../images/logo/logo.svg';
import { useState, useEffect } from 'react';

import { Route, Switch, useHistory, Link, NavLink, useLocation } from 'react-router-dom'
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
const location = useLocation()
const [currentUser, setCurrentUser] = useState({})

//состояние прелоадера
const [isLoading, setIsLoading] = useState(false);

//состояние авторизация
const [isLoggedIn, setIsLoggedIn] = useState(false)
const handleIsLoggedIn = () => {
  setIsLoggedIn(true)
}

//запись адреса текущей страници
useEffect(() => {
  localStorage.setItem('pageView', location.pathname)
}, [location])

//проверка аторизации при обновление состояния
useEffect(() => {
  tokenCheck()
}, [isLoggedIn])

//проверка авторизации
const tokenCheck = () => {
  if (localStorage.getItem('jwt')) {
    MainApi.getInfoAboutUser()
    .then(data => setCurrentUser(data))
    .then((data) => {
      handleIsLoggedIn(true)
      // history.push(localStorage.getItem('pageView'))
    })
    .catch(err => console.log(err))
      // handleIsLoggedIn(true)
      // history.push(localStorage.getItem('pageView'))

    // history.push('/movies')
    // history.goBack()
  }
}

useEffect(() => {
  history.push(localStorage.getItem('pageView'))
}, [currentUser])

//получение данных о пользователе
// useEffect(() => {
//   if (localStorage.getItem('jwt')) {
//     MainApi.getInfoAboutUser()
//     .then(data => setCurrentUser(data))
//     .catch(err => console.log(err))
//   }
// }, [isLoggedIn])

useEffect(() => {
  if (localStorage.getItem('jwt') && localStorage.getItem('movies') !== null) {
        setMiddleMovies(JSON.parse(localStorage.getItem('movies')))
  }
}, [])

//редактирование профиля
const refreshInfoAboutUser = (name, email) => {
  MainApi.editInfoAboutUser(name, email)
  .then((data) => setCurrentUser(data))
  .catch(err => console.log(err))
}

const [messageErrorRegister, setMessageErrorRegister] = useState('')

//регистрация пользователя
const handleRegister = (name, email, password) => {
  setMessageErrorRegister('')
  MainApi.signup(name, email, password)
  .then(data => {
    if (data === 'Переданный email уже используется другим пользователем!') {
      return setMessageErrorRegister(data)
    }
    MainApi.signin(data.email, password)
    .then(data => {
      console.log(data)
      if (data) {
      localStorage.setItem('jwt', data.token)
      handleIsLoggedIn(true)
      history.push('/movies')
      }
    })
  })
  .catch(err => console.log(err))
}

const [messageErrorLogin, setMessageErrorLogin] = useState('')

//авторизация
const handleLogin = (email, password) => {
  setMessageErrorLogin('')
  MainApi.signin(email, password)
  .then(res => {
    if (res === 'Неверный email или пароль!') {
      return setMessageErrorLogin(res)
    }
      localStorage.setItem('jwt', res.token)
      handleIsLoggedIn(true)
      history.push('/movies')
  })
  .catch(err => err)
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
      const arrFilms = data.map(i => {
        let obj = i
        i.like = false
        return obj
      })
      setCards(arrFilms)
    })
    .catch(() => {
      setMessageMovies('Во время запроса произошла ошибка. Возможно, проблема с соединением или сервер недоступен. Подождите немного и попробуйте ещё раз')
    })
  }
}, [isLoggedIn])

//найденные фильмы
const [movieOnPage, setMovieOnPage] = useState(null)

//стостояние кнопки "еще"
const [buttonElse, setButtonElse] = useState(false)

//состояние для отрисовки лайков при нажатие на кнопку еще
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
        localStorage.setItem('movieOnPage', JSON.stringify(arr))
        setMovieOnPage(arr)
    } else {
      localStorage.setItem('movieOnPage', JSON.stringify(array))
      setMovieOnPage(array)
    }
}

//поиск короткометражек
const searhFilm = (films, typeOfFilms) => {
   return films.filter(i => {
    const { country, director, duration, year, description, thumbnail, nameRU, nameEN, id} = i
    const trailer = i.trailerLink
    const image = i.image.url
    if (i.nameRU.includes(typeOfFilms) && i.duration <= 40 && i.duration > 0) {
      setMessageMovies('')
      return { country, director, duration, year, description, image, trailer, thumbnail, nameRU, nameEN, movieId: id, id, key: id }
    }
  })
}

const filterShortFilms = (films, typeOfFilms) => {
  setMiddleMovies(() => {
    return searhFilm(films, typeOfFilms)
  })
}

//отфильтровываем фильмы по названию
useEffect(() => {
  if (getTitleFilms !== '') {
    setMessageMovies('')
    if (resultShortsFilm) {
      setIsLoading(true)
      setTimeout(() => {
        setIsLoading(false)
        return filterShortFilms(cards, getTitleFilms)
      }, 1000)
      return
    }
    setIsLoading(true)
    setTimeout(() => {
      setMiddleMovies(cards.filter(item => {
        const { country, director, duration, year, description, thumbnail, nameRU, nameEN, id} = item
        const trailer = item.trailerLink
        const image = item.image.url
        const lowerNameCase = item.nameRU.toLowerCase()
        const lowerTitleCase = getTitleFilms.toLocaleLowerCase()
        if (lowerNameCase.includes(lowerTitleCase)) {
          return { country, director, duration, year, description, image, trailer, thumbnail, nameRU, nameEN, movieId: id, id, key: id }
        }
      }))

    setIsLoading(false)
  }, 1000)
  }
}, [getTitleFilms, resultShortsFilm])

//записывает найденные фильмы в хранилище
useEffect(() => {
  localStorage.setItem('movies', JSON.stringify(middleMovies))
}, [middleMovies])

//если фильмы не найдены
useEffect(() => {
  if (middleMovies.length === 0 && getTitleFilms.length > 0) {
    setMessageMovies('Ничего не найдено')
  }
  
}, [middleMovies])

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

const [resultShortsSavedFilm, setResultShortsSavedFilm] = useState(false)

const [messageSavedMovies, setMessageSavedMovies] = useState('')

//получение сохраненных фильмов
useEffect(() => {
  if (localStorage.getItem('jwt')) {
    MainApi.getMovies()
    .then(movies => {
      localStorage.setItem('savedMovies', JSON.stringify(movies.data))
      setMiddleSavedMovies(movies.data)
  })
    .catch(err => console.log(err))
  }
}, [isLoggedIn])

//поиск сохраненных фильмов по названию
useEffect(() => {
  if (getTitleSavedFilms !== '') {
    setMessageSavedMovies('')
    if (resultShortsSavedFilm) {
      setIsLoading(true)
      setTimeout(() => {
        setIsLoading(false)
        return setMiddleSavedMovies(searhFilm(middleSavedMovies, getTitleSavedFilms))
      }, 1000)
      return
    }
    setIsLoading(true)
    setTimeout(() => {
    setMiddleSavedMovies(JSON.parse(localStorage.getItem('savedMovies')).filter(i => {
      const lowerNameCase = i.nameRU.toLowerCase()
      const lowerTitleCase = getTitleSavedFilms.toLocaleLowerCase()
        if (lowerNameCase.includes(lowerTitleCase)) {
          const { country, director, duration, year, description, thumbnail, nameRU, nameEN, id} = i
          const trailer = i.trailerLink
          const image = i.image.url
          return { country, director, duration, year, description, image, trailer, thumbnail, nameRU, nameEN, movieId: id, id, key: id } 
        }
      })
    )
    setIsLoading(false)
  }, 1000)
}
}, [getTitleSavedFilms, resultShortsSavedFilm])

useEffect(() => {
  if (middleSavedMovies.length === 0 && getTitleSavedFilms.length > 0) {
    setMessageSavedMovies('Ничего не найдено')
    setIsLoading(false)
  }
}, [middleSavedMovies])

//добовление удаление фильма со страницы movies
const handleMovieLike = (card) => {
  let newMovie
  const { director, duration, year, description, trailer = card.trailerLink, thumbnail = 'o_O', movieId = card.id, nameRU } = card;
  const nameEN = (card.nameEN === '' ? '*******' : card.nameEN)
  const country = (card.country === null ? '*** *****' : card.country)
  const image = `https://api.nomoreparties.co/${card.image.url}`;
  newMovie = middleSavedMovies.some(element => {
    return element.movieId === card.id
  });
  
    if (middleSavedMovies.length === 0 || newMovie === false) {
      return MainApi.createMovie(country, director, duration, year, description, image, trailer, thumbnail, movieId, nameRU, nameEN)
        .then(savedMovie => {
          setMiddleSavedMovies([...middleSavedMovies, savedMovie.data])
        })
        .then(() => {
            setMovieOnPage((movieOnPage) => {
              return movieOnPage.map(i => i.id === card.id ? {...i, like: true} : i)
            })
        })
        .catch(err => console.log(err))
    }
    if (newMovie) {
      let movieForDelete = middleSavedMovies.find(i => i.movieId === card.id)
       MainApi.deleteMovie(movieForDelete._id)
       .then(res => setMiddleSavedMovies((middleSavedMovies) => {
           return middleSavedMovies.filter(j => j.movieId !== card.id)
          }
          ))
        .then(() => setMovieOnPage((movieOnPage) => {
          return movieOnPage.map(i => i.id === card.id ? {...i, like: false} : i)
        }))
        .catch(err => console.log(err))  
    }
}

//отрисовка лайков
const likeForFilms = () => {
  if (middleSavedMovies.length !== 0) {
    middleSavedMovies.forEach(i => {
      setMovieOnPage((movieOnPage) => {
        return movieOnPage.map(j => j.id === i.movieId ? {...j, like: true} : j)
    })
  })
  }
}

//эффект отрисовка лайков
useEffect(() => {
  likeForFilms()
}, [savedMovies, middleSavedMovies, middleMovies, buttonElse, fakemovies, cards])


//удаление карточки находятсь на странице saved-movies
const handleMovieDelete = (card) => {
  MainApi.deleteMovie(card._id)
  .then(() => {
    setMiddleSavedMovies((middleSavedMovies) => {
      return middleSavedMovies.filter(i => i._id !== card._id)
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
  setIsLoggedIn(false);
  setMiddleMovies([])
  setGetTitleFilms('')
  localStorage.clear()
  history.push('/')
}

  return (
    <div className="App">
      <CurrentUserContext.Provider value={currentUser}>
      <Switch>
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
        <Route path='/signup'>
          < Register
            messageErrorRegister={messageErrorRegister}
            onHandleRegister={handleRegister}
            aboutProject={<Link to="/" className='Register-logo'><img className='Register-logo__img' src={logo} alt="Логотип"/></Link>}
            signin={<Link to="/signin" className='Register-question__signin'>Войти</Link>}
          />
        </Route>
        <Route path='/signin'>
          < Login 
            messageErrorLogin={messageErrorLogin}
            onHandleLogin={handleLogin}
            aboutProject={<Link to="/" className='Login-logo'><img className='Login-logo' src={logo} alt="Логотип"/></Link>}
            signup={<Link to="/signup" className='Login-question__signin'>Регистрация</Link>}
          />
        </Route>
        <ProtectedRoute path="/profile"
          component={ProfilePage}
          onRefreshInfoAboutUser={refreshInfoAboutUser}
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
          messageSavedMovies={messageSavedMovies}
          middleSavedMovies={middleSavedMovies}
          setResultShortsSavedFilm={setResultShortsSavedFilm}
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
          isLoading={isLoading}
        />
        {/* <Route exact path='/'>
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
        </Route> */}
        <Route path='*'>
          <Error404
            // return={<Link to="/" className='Error404-button' >Назад</Link>}
          />
        </Route>
      </Switch>
      </CurrentUserContext.Provider>
    </div>
  );
}

export default App;
