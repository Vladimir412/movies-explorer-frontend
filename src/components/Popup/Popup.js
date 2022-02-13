import './Popup.css';
// // import picture from '../../../images/pictureOne.jpg';
// import picture from '../../images/pictureOne.jpg';


const Popup = (props) => {


    return (
        <section className='popup'>
            <div className='popup-container'>
                <button className='popup-container__button-close'></button>
                {props.aboutProject}
                {props.movies}
                {props.savedMovies}
                {props.account}
            </div>
        </section>
    )
}

export default Popup