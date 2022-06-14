import Header from "../UseAllPage/Header/Header";
import SearchForm from "../SearchForm/SearchForm";
import MoviesCardListSaved from "./MoviesCardListSaved/MoviesCardListSaved";
import Footer from "../UseAllPage/Footer/Footer";
import Popup from "../Popup/Popup";

const SavedMovies = (props) => {

    const statePage = 'saved-movies'

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
                setResultShortsSavedFilm={props.setResultShortsSavedFilm}
                setGetTitleSavedFilms={props.setGetTitleSavedFilms}
            />
            <MoviesCardListSaved
                messageSavedMovies={props.messageSavedMovies}
                middleSavedMovies={props.middleSavedMovies}
                onHandleMovieDelete={props.onHandleMovieDelete}
                savedMoviesOnPage={props.savedMoviesOnPage}
                closePopup={props.closePopup}
                isLoading={props.isLoading}
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

export default SavedMovies