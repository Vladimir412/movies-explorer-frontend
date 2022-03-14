import Profile from "../Profile/Profile";
import Header from "../../UseAllPage/Header/Header";
import Popup from "../../Popup/Popup";

const ProfilePage = (props) => {


    return (
        <>
            <Header 
                aboutProject={props.aboutProject}
                savedMovies={props.savedMovies}
                movies={props.movies}
                account={props.account}
                sandwich={props.sandwich}
                // deactiveRegister={props.deactiveRegister}
                // deactiveLogin={props.deactiveLogin}
                isLoggedIn={props.isLoggedIn}
            />
            <Profile 
                exit={props.exit}
                closePopup={props.closePopup}
            />
            <Popup 
                sandwichMenu={props.sandwichMenu}
                onClosePopup={props.onClosePopup}
                aboutProject={props.aboutProjectPopup}
                savedMovies={props.savedMoviesPopup}
                movies={props.moviesPopup}
                account={props.accountPopup}
            />
        </>
    )
}

export default ProfilePage