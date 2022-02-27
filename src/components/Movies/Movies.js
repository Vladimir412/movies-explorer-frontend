import Header from "../UseAllPage/Header/Header"
import SearchForm from "../SearchForm/SearchForm"
import MoviesCardList from "./MoviesCardList/MoviesCardList"
import Footer from "../UseAllPage/Footer/Footer"
import Popup from "../Popup/Popup"


const Movies = (props) => {
    

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
            <SearchForm />
            <MoviesCardList />
            <Footer />
            <Popup
                aboutProject={props.aboutProjectPopup}
                savedMovies={props.savedMoviesPopup}
                movies={props.moviesPopup}
                account={props.accountPopup}
            />
        </>
    )
}

export default Movies