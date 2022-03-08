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
                deactiveRegister={props.deactiveRegister}
                deactiveLogin={props.deactiveLogin}
            />
            <Profile 
                exit={props.exit}

            />
            <Popup 
                sandwichMenu={props.sandwichMenu}
                onClosePopup={props.onClosePopup}
                aboutProjectPopup={props.aboutProjectPopup}
                savedMoviesPopup={props.savedMoviesPopup}
                moviesPopup={props.moviesPopup}
                accountPopup={props.accountPopup}
            />
        </>
    )
}

export default ProfilePage