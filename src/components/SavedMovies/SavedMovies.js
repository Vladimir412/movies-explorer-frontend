import Header from "../UseAllPage/Header/Header";
import SearchForm from "../SearchForm/SearchForm";
import MoviesCardListSaved from "./MoviesCardListSaved/MoviesCardListSaved";
import Footer from "../UseAllPage/Footer/Footer";
import Popup from "../Popup/Popup";

const SavedMovies = (props) => {
    console.log(props.savedMoviesOnPage);

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
            />
            <SearchForm/>
            <MoviesCardListSaved
                onHandleMovieDelete={props.onHandleMovieDelete}
                savedMoviesOnPage={props.savedMoviesOnPage}
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