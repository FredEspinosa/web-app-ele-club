// eslint-disable-next-line no-unused-vars
import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import LogoClubTopBarBig from '../../assets/images/LCLUB_LOGO_BIG.png'; // Importa la imagen como una URL 

const SplashCont = () => {
    const navigate = useNavigate();
    const [animacion, setAnimacion] = useState('animate__backInDown');

    useEffect(() => {
        setAnimacion('animate__backInDown')
    }, [])

    setTimeout(() => {
        setAnimacion('animate__backOutUp')
        setTimeout(() => {
            navigate('/bienvenida')
        }, 500);
    }, 1500);

    return (
        <div className='club_contenedor container-lg club_contenedor_splash'>
            <img className={`active animate__animated ${animacion}`} src={LogoClubTopBarBig} alt="Club Logo" />
        </div>
    )
}

export default SplashCont