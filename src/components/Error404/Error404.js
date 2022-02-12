import './Error404.css';

const Error404 = (props) => {
    

    return (
        <section className='Error404'>
            <h2 className='Error404-title'>
                404
            </h2>
            <h3 className='Error404-subtitle'>
            Страница не найдена
            </h3>
            {props.return}
        </section>
    )
}

export default Error404