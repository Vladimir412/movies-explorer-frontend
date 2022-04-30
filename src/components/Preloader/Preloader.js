import React from 'react'
import './Preloader.css'

const Preloader = (props) => {

    const isLoad = (props.isLoading ? 'preloader preloader__open' : 'preloader')

    return (
        <div className={isLoad}>
            <div className="preloader__container">
                <span className="preloader__round"></span>
            </div>
        </div>
    )
};

export default Preloader
