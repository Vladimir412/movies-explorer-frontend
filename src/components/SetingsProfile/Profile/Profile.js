import './Profile.css';
import './Profile768.css';
import './Profile320.css';
import { useContext, useEffect, useState } from 'react';
import { CurrentUserContext } from '../../../contexts/CurrentUserContext';

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

    useEffect(() => {
        setName(currentUser.user.name)
        setEmail(currentUser.user.email)
        setFirstStateName(currentUser.user.name)
        setFirstStateEmail(currentUser.user.email)
    }, [currentUser])

    const handleSetName = (e) => {
        setName(e.target.value)
        setErrorName(e.target.validationMessage)
        setValidName(e.target.checkValidity())
    }

    const handleSetEmail = (e) => {
        setEmail(e.target.value)
        setErrorEmail(e.target.validationMessage)
        setValidEmail(e.target.checkValidity())
    }

    useEffect(() => {
        if (validName && validEmail && firstStateName !== name && firstStateEmail !== email) {
            setDisabled(false)
            setIsValid(true)
        } else {
            setDisabled(true)
            setIsValid(false)
        }
    })

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
                    <input className='Profile-form__input' value={name} onChange={handleSetName} type="name" minLength="1" maxLength="30" required/>
                </label>
                <span className='Profile-form__input-error'>{errorName}</span>
                <label className='Profile-form__container Profile-form__container_margin-top'>
                    <label className='Profile-form__title'>E-mail</label>
                    <input className='Profile-form__input' value={email} onChange={handleSetEmail} type="email" required/>
                </label>
                <span className='Profile-form__input-error'>{errorEmail}</span>

                <button type='submit' className={`Profile-form__button ${disabledButton}`} disabled={disabled}>Редактировать</button>
            </form>
                <button type='button' className="Profile-button-exit-account">{props.exit}</button>
        </section>
    )
}

export default Profile
