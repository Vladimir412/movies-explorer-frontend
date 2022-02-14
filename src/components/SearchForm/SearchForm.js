import './SearchForm.css';
import './SearchForm768.css';
import './SearchForm320.css';

const SearchForm = () => {


    return (
        <section className="SearchForm">
            <form className='SearchForm-form'>
                <input className="SearchForm-form__input" type="text" placeholder="Фильм" mixLength="2" maxLength="100" required/>
                <button className='SearchForm-form__button' type='submit'>Найти</button>
            </form>
            <label className="label">
                <input className="label__checkbox" type="checkbox" id="checkbox" />
                <span className="label__fake"></span>
                <span className="label__name">Короткометражки</span>
            </label>
        </section>
    )
}

export default SearchForm