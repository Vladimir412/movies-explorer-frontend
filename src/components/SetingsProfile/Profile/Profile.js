import './Profile.css';
import './Profile768.css';
import './Profile320.css';

const Profile = (props) => {

    return (
        <section className="Profile">
            <h1 className="Profile-title">Привет, Виталий!</h1>
            <div className="Profile-info">
                <div className='Profile-info__container Profile-info__container_border'>
                    <p className="Profile-info__info">Имя</p>
                    <p className="Profile-info__data">Виталий</p>
                </div>
                <div className='Profile-info__container'>
                    <p className="Profile-info__info">E-mail</p>
                    <p className="Profile-info__data">pochta@yandex.ru</p>
                </div>
            </div>
            <div className='Profile-buttons'>
                <button type='button' className="Profile-buttons__button Profile-buttons__button_edit">Редактировать</button>
                <button type='button' className="Profile-buttons__button Profile-buttons__button_exit-account">{props.exit}</button>
            </div>
        </section>
    )
}

export default Profile