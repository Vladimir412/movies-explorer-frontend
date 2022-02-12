import './Navigation.css';
import './Navigation768.css';
import './Navigation320.css';

const Navigation = (props) => {

    const deactiveRegisterive = (props.deactiveRegister ? 'Navigation-control_deactive' : 'Navigation-control__register')
    const deactiveLogin = (props.deactiveLogin ? 'Navigation-control_deactive' : 'Navigation-control__login')

    return (
        <><div className='Navigation-movies'>
                {props.movies}
                {props.savedMovies}
        </div>
        <div className='Navigation-control'>
            <h2 className={deactiveRegisterive}>
            {/* <h2 className='Navigation-control__register'> */}
                {props.register}
            </h2>
            <div className={deactiveLogin}>
            {/* <div className='Navigation-control__login'> */}
                {props.login}
            </div>
            {/* <div className='Navigation-control__account'> */}
                {props.account}
                {props.sandwich}
            {/* </div> */}
        </div>
        </>
    )
}

export default Navigation