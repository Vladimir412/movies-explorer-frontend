import './Register.css';
import './Register768.css';
import './Register320.css';
import { useEffect, useState } from 'react';



const Register = (props) => {

    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [errorName, setErrorName] = useState('');
    const [errorEmail, setErrorEmail] = useState('');
    const [errorPassword, setErrorPassword] = useState('');
    const [validName, setValidName] = useState(false)
    const [validEmail, setValidEmail] = useState(false)
    const [validPassword, setValidPassword] = useState(false)
    const [isValid, setIsValid] = useState(false);
    const [disabled, setDisabled] = useState(true)
    const regEmail = /^[^ ]+@[^ ]+\.[a-z]{2,3}$/

    const checkEmail = (email) => {
        return email.match(regEmail) === null ? false : true
    }

    const handleSetName = (e) => {
        setName(e.target.value)
        setErrorName(e.target.validationMessage)
        setValidName(e.target.checkValidity())
    }

    const handleSetEmail = (e) => {
        setEmail(e.target.value)
        setErrorEmail(checkEmail(e.target.value) === false ? 'Введите корректный Email' : '')
        // setErrorEmail(e.target.validationMessage)
        setValidEmail(checkEmail(e.target.value))
        // setValidEmail(e.target.checkValidity())
    }

    const handleSetPassword = (e) => {
        setPassword(e.target.value)
        setErrorPassword(e.target.validationMessage)
        setValidPassword(e.target.checkValidity())
    }

    useEffect(() => {
        if (validName && validEmail && validPassword) {
            setIsValid(true)
            setDisabled(false)
        } else {
            setIsValid(false)
            setDisabled(true)
        }
    }, [validName, validEmail, validPassword])

    const buttonSignUp = (isValid !== true ? 'Register-form__button_disabled' : 'Register-form__button')

    const handleSubmit = (e) => {
        e.preventDefault()
        props.onHandleRegister(name, email, password)
        setName('')
        setEmail('')
        setPassword('')
        setDisabled(true)
        setIsValid(false)
        setValidName(false)
        setValidEmail(false)
        setValidPassword(false)
    }

    return (
        <section className='Register'>
            <div className='Register-container'>
                {props.aboutProject}
                <h1 className='Register-title'>Добро пожаловать!</h1>
                <form className='Register-form' onSubmit={handleSubmit}>
                    <label className='Register-form__title'>
                        Имя
                    </label>
                    <input className='Register-form__input' value={name} onChange={handleSetName} minLength="2" required></input>
                    <span className='Register-form__error' >{errorName}</span>
                    <label className='Register-form__title Register-form__title_margin-top'>
                        E-mail
                    </label>
                    <input className='Register-form__input' type="email" value={email} onChange={handleSetEmail} required></input>
                    <span className='Register-form__error' >{errorEmail}</span>
                    <label className='Register-form__title Register-form__title_margin-top'>
                        Пароль
                    </label>
                    <input className='Register-form__input' type="password" value={password} onChange={handleSetPassword} minLength="8" required></input>
                    <span className='Register-form__error'>{errorPassword}</span>
                    <span className='Register-form_error-server'>{props.messageErrorRegister}</span>
                    <button className={buttonSignUp} type='submit' disabled={disabled}>
                        Зарегистрироваться
                    </button>
                </form>
            </div>
            <div className='Register-question'>Уже зарегистрированы? {props.signin}</div>
        </section>
    )
}

export default Register