import './Login.css';
import './Login768.css';
import './Login320.css';

const Login = (props) => {


    return (
        <div className='Login'>
            <div className='Login-container'>
                {props.aboutProject}
                {/* <img className='Login-logo' src={logo} alt="Логотип" onClick={props.start}/> */}
                <h1 className='Login-title'>Рады видеть!</h1>
                <form className='Login-form'>
                    <label className='Login-form__title'>
                        E-mail
                    </label>
                    <input className='Login-form__input' type="email"></input>
                    <span></span>
                    <label className='Login-form__title'>
                        Пароль
                    </label>
                    <input className='Login-form__input' type="password"></input>
                    <span></span>
                    <button className='Login-form__button' type='submit'>
                        Войти
                    </button>
                </form>
            </div>
            <div className='Login-question'>Ещё не зарегистрированы? {props.signup}</div>
        </div>
    )
}

export default Login