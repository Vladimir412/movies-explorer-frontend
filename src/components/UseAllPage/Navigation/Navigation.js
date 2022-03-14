import './Navigation.css';
import './Navigation768.css';
import './Navigation320.css';

const Navigation = (props) => {

    const statusCheck = (login, position) => {
        if (login && position) {
            return 'Navigation-movies Navigation-movies_position'
        } else if (login) {
            return 'Navigation-movies'
        } else {
            return 'Navigation-movies_deactive'
        }
    }

    const deactiveRegisterive = (props.isLoggedIn ? 'Navigation-control_deactive' : 'Navigation-control__register')
    const deactiveLogin = (props.isLoggedIn ? 'Navigation-control_deactive' : 'Navigation-control__login')
    const stateMovies = statusCheck(props.isLoggedIn, props.position)
    const stateAccount = (props.isLoggedIn ? 'Navigation-control__account_active' : 'Navigation-control__account_deactive')

    return (
        <>  <nav className={stateMovies}>
        {/* <>  <nav className='Navigation-movies'> */}
                {props.movies}
                {props.savedMovies}
            </nav>
            <nav className='Navigation-control'>
                <h2 className={deactiveRegisterive}>
                    {props.register}
                </h2>
                <div className={deactiveLogin}>
                    {props.login}
                </div>
                <div className={stateAccount}>
                    {props.account}
                    {props.sandwich}
                </div>
            </nav>
        </>
    )
}

export default Navigation