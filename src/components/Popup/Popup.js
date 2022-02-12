import './Popup.css';
// // import picture from '../../../images/pictureOne.jpg';
// import picture from '../../images/pictureOne.jpg';


const Popup = (props) => {


    return (
                       <section className='Popup'>
                               <div className='Popup-container'>
                                   <button className='Popup-container__button-close'></button>
                                   {props.aboutProject}
                                   {props.movies}
                                   {props.savedMovies}
                                   {props.account}
                               </div>
                       </section>
                        // <div className='Menu-container'></div>
    )
}

export default Popup