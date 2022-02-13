import './Register.css';
import './Register768.css';
import './Register320.css';


const Register = (props) => {



    return (
        <section className='Register'>
            <div className='Register-container'>
                {props.aboutProject}
                <h1 className='Register-title'>Добро пожаловать!</h1>
                <form className='Register-form'>
                    <label className='Register-form__title'>
                        Имя
                    </label>
                    <input className='Register-form__input'></input>
                    <span></span>
                    <label className='Register-form__title Register-form__title_margin-top'>
                        E-mail
                    </label>
                    <input className='Register-form__input' type="email"></input>
                    <span></span>
                    <label className='Register-form__title Register-form__title_margin-top'>
                        Пароль
                    </label>
                    <input className='Register-form__input' type="password"></input>
                    <span className='Register-form__error'>Что-то пошло не так...</span>
                    <button className='Register-form__button' type='submit'>
                        Зарегистрироваться
                    </button>
                </form>
            </div>
            <div className='Register-question'>Уже зарегистрированы? {props.signin}</div>
        </section>
    )
}

export default Register