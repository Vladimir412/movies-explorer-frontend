import './Login.css';
import './Login768.css';
import './Login320.css';
import { useState, useEffect } from 'react'

const Login = (props) => {

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [errorEmail, setErrorEmail] = useState('');
    const [errorPassword, setErrorPassword] = useState('');
    const [validEmail, setValidEmail] = useState(false)
    const [validPassword, setValidPassword] = useState(false)
    const [isValid, setIsValid] = useState(false);
    const [disabled, setDisabled] = useState(true)
    const regEmail = /^[^ ]+@[^ ]+\.[a-z]{2,3}$/

    const checkEmail = (email) => {
        return email.match(regEmail) === null ? false : true
    }

    const handleSetEmail = (e) => {
        setEmail(e.target.value)
        setErrorEmail(checkEmail(e.target.value) === false ? 'Введите корректный Email' : '')
        setValidEmail(checkEmail(e.target.value))
        // setValidEmail(e.target.checkValidity())
    }

    const handleSetPassword = (e) => {
        setPassword(e.target.value)
        setErrorPassword(e.target.validationMessage)
        setValidPassword(e.target.checkValidity())
    }

    useEffect(() => {
        if (validEmail && validPassword) {
            setIsValid(true)
            setDisabled(false)
        } else {
            setIsValid(false)
            setDisabled(true)
        }
    }, [validEmail, validPassword])

    const handleSubmit = (e) => {
        e.preventDefault();
        props.onHandleLogin(email, password)
        setEmail('');
        setPassword('');
        setValidEmail(false);
        setValidPassword(false);
        setDisabled(true)
    }

    const buttonLogin = (isValid !== true ? 'Login-form__button_disabled' : 'Login-form__button')


    return (
        <section className='Login'>
            <div className='Login-container'>
                {props.aboutProject}
                <h1 className='Login-title'>Рады видеть!</h1>
                <form className='Login-form' onSubmit={handleSubmit}>
                    <label className='Login-form__title'>
                        E-mail
                    </label>
                    <input className='Login-form__input' type="email" value={email} onChange={handleSetEmail} required></input>
                    <span className='Login-form__error'>{errorEmail}</span>
                    <label className='Login-form__title Login-form__title_margin-top'>
                        Пароль
                    </label>
                    <input className='Login-form__input' type="password" value={password} onChange={handleSetPassword} minLength="8" required></input>
                    <span className='Login-form__error'>{errorPassword}</span>
                    <span className='Login-form_error-server'>{props.messageErrorLogin}</span>
                    <button className={buttonLogin} type='submit' disabled={disabled}>
                        Войти
                    </button>
                </form>
            </div>
            <div className='Login-question'>Ещё не зарегистрированы? {props.signup}</div>
        </section>
    )
}

export default Login