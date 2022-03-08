import './Profile.css';
import './Profile768.css';
import './Profile320.css';
import { useContext, useEffect, useState } from 'react';
import { CurrentUserContext } from '../../../contexts/CurrentUserContext';

const Profile = (props) => {

    const currentUser = useContext(CurrentUserContext)

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
    console.log(firstStateName);
    console.log(firstStateEmail);

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
        console.log('working');
    }

    const disabledButton = (isValid !== true ? 'Profile-form__button_disabled' : 'Profile-form__button_edit')


    return (
        <section className="Profile">
            <h1 className="Profile-title">{`Привет, ${firstStateName}!`}</h1>
            {/* <h1 className="Profile-title">Привет, Виталий!</h1> */}
            <form className='Profile-form' onSubmit={handleSubmit}>
                <label className='Profile-form__container'>
                    <label className='Profile-form__title'>Имя</label>
                    <input className='Profile-form__input' value={name} onChange={handleSetName} type="name" minLength="1" maxLength="30" required/>
                    <span className='Profile-form__input-error'>{errorName}</span>
                </label>
                <label className='Profile-form__container Profile-form__container_margin-top'>
                    <label className='Profile-form__title'>E-mail</label>
                    <input className='Profile-form__input' value={email} onChange={handleSetEmail} type="email" required/>
                    <span className='Profile-form__input-error'>{errorEmail}</span>
                </label>
                <button type='submit' className={`Profile-form__button ${disabledButton}`} disabled={disabled}>Редактировать</button>
            </form>
                {/* <button type='submit' className={`Profile-buttons__button ${disabledButton}`} disabled={disabled}>Редактировать</button> */}
                <button type='button' className="Profile-button-exit-account">{props.exit}</button>
                {/* <button type='button' className="Profile-button-exit-account">Выйти из аккаунта</button> */}
        </section>
    )
}

export default Profile



// <div className="Profile-info">
//                 <div className='Profile-info__container Profile-info__container_border'>
//                     <p className="Profile-info__info">Имя</p>
//                     <p className="Profile-info__data">Виталий</p>
//                 </div>
//                 <div className='Profile-info__container'>
//                     <p className="Profile-info__info">E-mail</p>
//                     <p className="Profile-info__data">pochta@yandex.ru</p>
//                 </div>
//             </div>