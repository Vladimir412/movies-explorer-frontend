import { useHistory } from 'react-router-dom';
import './Error404.css';

const Error404 = () => {
    const history = useHistory()

    const back = () => {
        console.log('click');
        history.goBack()
    }
    

    return (
        <section className='Error404'>
            <h2 className='Error404-title'>
                404
            </h2>
            <h3 className='Error404-subtitle'>
            Страница не найдена
            </h3>
            <h2 className='Error404-button' onClick={back}>Назад</h2>
            {/* {props.return} */}
        </section>
    )
}

export default Error404