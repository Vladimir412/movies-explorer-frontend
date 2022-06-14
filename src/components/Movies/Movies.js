import Header from "../UseAllPage/Header/Header"
import SearchForm from "../SearchForm/SearchForm"
import MoviesCardList from "./MoviesCardList/MoviesCardList"
import Footer from "../UseAllPage/Footer/Footer"
import Popup from "../Popup/Popup"


const Movies = (props) => {
    
    const statePage = 'movies'


    return (
        <>
            <Header
                aboutProject={props.aboutProject}
                savedMovies={props.savedMovies}
                movies={props.movies}
                account={props.account}
                sandwich={props.sandwich}
                deactiveRegister={props.deactiveRegister}
                deactiveLogin={props.deactiveLogin}
                isLoggedIn={props.isLoggedIn}
            />
            <SearchForm 
                statePage={statePage}
                setResultShortsFilm={props.setResultShortsFilm}
                onSetGetTitleFilms={props.onSetGetTitleFilms}
            />
            <MoviesCardList 
                middleMovies={props.middleMovies}
                like={props.like}
                onHandleMovieLike={props.onHandleMovieLike}
                onLike={props.onLike}
                onAddSomeMovies={props.onAddSomeMovies}
                isLoading={props.isLoading}
                messageMovies={props.messageMovies}
                movieOnPage={props.movieOnPage}
                savedMovies={props.savedMoviesOnPage}
                onHandleSetClick={props.onHandleSetClick}
                onButtonElse={props.onButtonElse}
                closePopup={props.closePopup}
            />
            <Footer />
            <Popup
                onClosePopup={props.onClosePopup}
                sandwichMenu={props.sandwichMenu}
                aboutProject={props.aboutProjectPopup}
                savedMovies={props.savedMoviesPopup}
                movies={props.moviesPopup}
                account={props.accountPopup}
            />
            </>
    )
}

export default Movies