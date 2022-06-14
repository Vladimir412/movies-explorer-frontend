import './Profile.css';
import './Profile768.css';
import './Profile320.css';
import { useContext, useEffect, useState } from 'react';
import { CurrentUserContext } from '../../../contexts/CurrentUserContext';
import isEmail from 'validator/lib/isEmail';


const Profile = (props) => {

    const currentUser = useContext(CurrentUserContext)

    useEffect(() => {
        props.closePopup()
    }, [])

    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [firstStateName, setFirstStateName] =useState('')
    const [firstStateEmail, setFirstStateEmail] =useState('')
    const [errorName, setErrorName] = useState('');
    const [errorEmail, setErrorEmail] = useState('');
    const [validName, setValidName] = useState(false)
    const [validEmail, setValidEmail] = useState(false)
    const [isValid, setIsValid] = useState(false);
    const [disabled, setDisabled] = useState(true)
    const regEmail = /^[^ ]+@[^ ]+\.[a-z]{2,3}$/
    const regName = /^[a-zA-Zа-яА-ЯёЁ]{2,20}/gi
    // const regEmail = /^([a-z])+\@([a-z])+\.([a-z]{2,4})$/

    const checkName = (name) => {
        return name.match(regName) === null ? false : true
    }

    const checkEmail = (email) => {
        return email.match(regEmail) === null ? false : true
    }

    useEffect(() => {
        setName(currentUser.user.name)
        setEmail(currentUser.user.email)
        setFirstStateName(currentUser.user.name)
        setFirstStateEmail(currentUser.user.email)
    }, [currentUser])

    const handleSetName = (e) => {
        setName(e.target.value)
        setErrorName(checkName(e.target.value) === false ? 'Имя должно состоять из кирилицы и латиницы' : '')
        setValidName(checkName(e.target.value))
        // setValidName(e.target.value.match(regName) === null ? false : true)
        // setValidName(e.target.checkValidity())
    }

    const handleSetEmail = (e) => {
        setEmail(e.target.value)
        setErrorEmail(checkEmail(e.target.value) === false ? 'Введите корректный Email' : '')
        setValidEmail(checkEmail(e.target.value))
        // setValidEmail(e.target.value.match(regEmail) === null ? false : true)
        // setValidEmail(e.target.checkValidity())
    }

    useEffect(() => {
        if ((validName && checkEmail(email) && firstStateName !== name) || (validEmail && checkName(name) && firstStateEmail !== email)) {
            setDisabled(false)
            setIsValid(true)
        } else {
            setDisabled(true)
            setIsValid(false)
        }
    },[name, email])

    const handleSubmit = (e) => {
        e.preventDefault()
        props.refreshInfoAboutUse(name, email)
    }

    const disabledButton = (isValid !== true ? 'Profile-form__button_disabled' : 'Profile-form__button_edit')


    return (
        <section className="Profile">
            <h1 className="Profile-title">{`Привет, ${firstStateName}!`}</h1>
            <form className='Profile-form' onSubmit={handleSubmit}>
                <label className='Profile-form__container'>
                    <label className='Profile-form__title'>Имя</label>
                    <input className='Profile-form__input' value={name} onChange={handleSetName} type="name" minLength="1" maxLength="30" />
                </label>
                <span className='Profile-form__input-error'>{errorName}</span>
                <label className='Profile-form__container Profile-form__container_margin-top'>
                    <label className='Profile-form__title'>E-mail</label>
                    <input className='Profile-form__input' value={email} onChange={handleSetEmail} type="email" />
                </label>
                <span className='Profile-form__input-error'>{errorEmail}</span>

                <button type='submit' className={`Profile-form__button ${disabledButton}`} disabled={disabled}>Редактировать</button>
            </form>
                <button type='button' className="Profile-button-exit-account">{props.exit}</button>
        </section>
    )
}

export default Profile
