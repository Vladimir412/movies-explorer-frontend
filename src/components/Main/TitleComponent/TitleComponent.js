import './TitleComponent.css';
import './TitleComponent768.css';
import './TitleComponent320.css';

const TitleComponent = (props) => {

    return (
        <section className="TitleComponent">
            <h2 className="TitleComponent__title">{props.title}</h2>
        </section>
    )
}

export default TitleComponent