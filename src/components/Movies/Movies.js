import Header from "../UseAllPage/Header/Header"
import SearchForm from "../SearchForm/SearchForm"
import MoviesCardList from "./MoviesCardList/MoviesCardList"
import Footer from "../UseAllPage/Footer/Footer"
import Popup from "../Popup/Popup"


const Movies = (props) => {
    

    return (
            <Header
                aboutProject={props.aboutProject}
                savedMovies={props.savedMovies}
                movies={props.movies}
                account={props.account}
                sandwich={props.sandwich}
                deactiveRegister={props.deactiveRegister}
                deactiveLogin={props.deactiveLogin}
            />
            /* <SearchForm 
                onSetGetTitleFilms={props.onSetGetTitleFilms}
            />
            <MoviesCardList 
                onHandleMovieLike={props.onHandleMovieLike}
                onLike={props.onLike}
                onAddSomeMovies={props.onAddSomeMovies}
                isLoading={props.isLoading}
                messageMovies={props.messageMovies}
                movieOnPage={props.movieOnPage}
                onHandleSetClick={props.onHandleSetClick}
                onButtonElse={props.onButtonElse}
            />
            <Footer />
            <Popup
                onClosePopup={props.onClosePopup}
                sandwichMenu={props.sandwichMenu}
                aboutProject={props.aboutProject}
                savedMovies={props.savedMovies}
                movies={props.movies}
                account={props.account}
            /> */
    )
}

export default Movies