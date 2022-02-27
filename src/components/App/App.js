import logo from '../../images/logo/logo.svg';
// import { Route, Switch, Link, NavLink } from 'react-router-dom'
import { useState, useEffect } from 'react';

import { Redirect, Route, Switch, useHistory, Link, NavLink } from 'react-router-dom'
import './App.css';
import Login from '../SetingsProfile/Login/Login';
import Register from '../SetingsProfile/Register/Register';
import Header from '../UseAllPage/Header/Header';
import Profile from '../SetingsProfile/Profile/Profile';
import SearchForm from '../SearchForm/SearchForm';
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
import * as MainApi from '../../utils/Main';
import * as MovieasApi from '../../utils/MoviesApi';
import {ProtectedRoute} from '../ProtectedRoute/ProtectedRoute';
import Movies from '../Movies/Movies';
import { CurrentUserContext } from '../../contexts/CurrentUserContext';

function App() {

const history = useHistory();
const [currentUser, setCurrentUser] = useState({})

//состояние прелоадера
const [isLoading, setIsLoading] = useState(false);
const handleSetIsLoading = () => {
  setIsLoading(true)
}

//состояние авторизация
const [isLoggedIn, setIsLoggedIn] = useState(false)
const handleIsLoggedIn = () => {
  setIsLoggedIn(true)
}

// const [clickSubmit, setClickSubmit] = useState(false)
//     const handleSetClickSubmit = () => {
//         setClickSubmit(true)
//     }

//проверка авторизации
const tokenCheck = () => {
  if (localStorage.getItem('jwt')) {
    handleIsLoggedIn(true)
    history.push('/movies')
  }
}

//получение данных о пользователе
useEffect(() => {
  MainApi.getInfoAboutUser()
  .then(data => setCurrentUser(data))
}, [isLoggedIn])

//проверка аторизации при обновление состояния
useEffect(() => {
  tokenCheck()
}, [isLoggedIn])

//регистрация пользователя
const handleRegister = (name, email, password) => {
  console.log(name);
  console.log(email);
  console.log(password);
  // MainApi.signup(name, email, password)
  // .then()
}

//аутентификация
const handleLogin = (email, password) => {
  console.log(email);
  console.log(password);
  MainApi.signin(email, password)
  .then(res => {
    console.log(res);
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


//получение фильмов когда пользователь авторизован
useEffect(() => {
  setIsLoading(true)
  MovieasApi.getMovies()
  .then((data) => {
    setCards(data)
  })
  .catch(setMessageMovies('Во время запроса произошла ошибка. Возможно, проблема с соединением или сервер недоступен. Подождите немного и попробуйте ещё раз'))
  .finally(() => setIsLoading(false))
}, [isLoggedIn, middleMovies])


//найденные фильмы
const [movieOnPage, setMovieOnPage] = useState([])

//стостояние кнопки "еще"
const [buttonElse, setButtonElse] = useState(false)

//состояние кнопки еще
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

console.log(movieOnPage);

//отфильтровываем фильмы по названию
useEffect(() => {
  const notFound = cards.filter(i => i.nameRU.includes(getTitleFilms))
  console.log(notFound);
  if (notFound.length === 0) {
    setMessageMovies('Ничего не найдено')
  }
  setMiddleMovies(cards.filter(item => {
    const { country, director, duration, year, description, thumbnail, nameRU, nameEN, id} = item
    const trailer = item.trailerLink
    const image = item.image.url
    if (item.nameRU.includes(getTitleFilms)) {
      return {
        country,
        director,
        duration,
        year,
        description,
        image,
        trailer,
        thumbnail,
        nameRU,
        nameEN,
        movieId: id,
        id,
        key: id,
        // key: item.id,
        // id: item.id,
        // nameRU: item.nameRU,
        // image: item.image.url,
        // link: item.trailerLink,
        // duration: item.duration,
      }
    }
  }))
}, [getTitleFilms])

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

const [click, setClick] = useState(false)
const handleSetClick = (e) => {
    setClick(true)
}

const addSomeMovies = (step) => {
  const addElements = middleMovies.slice(movieOnPage.length, movieOnPage.length + step)
  const middle = [...movieOnPage, ...addElements]
  setMovieOnPage(middle)
  stateButtonElse(step)    
}

//состояние лайка
const [like, setLike] = useState(false)

//состояние сохраненных фильмов
const [savedMovies, setSavedMovies] = useState([])
console.log(savedMovies);

//получаем данные о сохраненных фильмах
useEffect(() => {
  console.log(isLoggedIn);
  console.log('gg');
  MainApi.getMovies()
  .then(movies => setSavedMovies(movies))
  .catch(err => console.log(err))
}, [])
// console.log(savedMovies);

const handleMovieLike = (card) => {
  console.log(typeof card.image.url);
  const {
    country,
    director,
    duration,
    year,
    description,
    // image = card.image.url.toString(),
    trailer = card.trailerLink,
    thumbnail = 'o_O',
    movieId = card.id,
    nameRU,
    nameEN,
  } = card;
  // const trailer = card.trailerLink
  // const image = card.image.url
  const image = `https://api.nomoreparties.co/${card.image.url}`
  MainApi.getMovies()
  .then(movies => {
    const arr = movies.data
    console.log(arr);
    arr.forEach(i => {
      if (i.id !== card.id) {
        setLike(true)
        MainApi.createMovie(
          country,
          director,
          duration,
          year,
          description,
          image,
          trailer,
          thumbnail,
          movieId,
          nameRU,
          nameEN,
        )
      }
      if (i.id === card.id) {
        setLike(false)
        MainApi.deleteMovie(card.id)
        .then(res => console.log(res))
      }
    })
  })
  .then(savedMovie => setSavedMovies(...savedMovies, savedMovie))
  .catch(err => console.log(err))
}

const [del, setDel] = useState(null)
const handleSetDel = (card) => {
  setDel(card)
}

const handleMovieDelete = () => {

  console.log(del);
  // console.log(card);
  // MainApi.deleteMovie(id)
  // .then(res => console.log(res))
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
            exit={<Link to='/' className='Profile-button-exit-account_text'>Выйти из аккаунта</Link>}
          />
          <Popup 
            sandwichMenu={sandwichMenu}
            onClosePopup={closePopup}
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
            sandwich={<button className='Navigation-control__sandwich' onClick={handleSetIsMenuOpen} type='button'></button>}
            deactiveRegister={true}
            deactiveLogin={true}
            />
            <SearchForm
              // handleSetClick={handleSetClickSubmit}
              onSetGetTitleFilms={setGetTitleFilms}
            />
            <MoviesCardList
              onHandleMovieLike={handleMovieLike}
              onLike={like}
              onAddSomeMovies= {addSomeMovies}
              isLoading={isLoading}
              // cards={cards}
              messageMovies={messageMovies}
              movieOnPage={movieOnPage}
              onHandleSetClick={handleSetClick}
              onButtonElse={buttonElse}
            />
            <Footer />
            <Popup
            onClosePopup={closePopup}
            sandwichMenu={sandwichMenu}
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
            movies={<Link to="/movies" className='Navigation-movies__movie'>Фильмы</Link>}
            account={<Link to="/profile" className='Navigation-control__account' ></Link>}
            sandwich={<button className='Navigation-control__sandwich' type='button' onClick={handleSetIsMenuOpen}></button>}
            deactiveRegister={true}
            deactiveLogin={true}
          />
          <SearchForm />
          <MoviesCardListSaved
            onHandleMovieDelete={handleSetDel}
            savedMovies={savedMovies}
          />
          <Footer />
          <Popup 
            onClosePopup={closePopup}
            sandwichMenu={sandwichMenu}
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
      </CurrentUserContext.Provider>
    </div>
  );
}

export default App;
