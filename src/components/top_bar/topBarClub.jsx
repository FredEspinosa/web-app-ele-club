import { useState } from 'react';
import { IoClose, IoMenu, IoSearch } from 'react-icons/io5';
import LogoClubTopBar from '../../assets/images/Helena_LOGO.png';
import { IoIosSettings } from 'react-icons/io';
import { useNavigate } from 'react-router-dom';

export const TopBarClub = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const navigate = useNavigate();

  const toggleMenu = () => {
    // setIsMenuOpen(!isMenuOpen);
  };

  const goToSetings = () => {
    navigate('/configuracion');
  };

  const goToSection = (route) => {
    setIsMenuOpen(false); // Cierra el menú al navegar
    navigate(route);
  };

  return (
    <div className="club_top_bar">
      {/* Top Bar */}
      <div className="col-12 d-flex">
        <div className="col-4 d-flex justify-content-start">
          <button
            onClick={() => { setIsMenuOpen(true) }}
            className="club_btn_top_menu"
          >
            <IoMenu size={24} />
            {/* {isMenuOpen ? <IoClose size={24} /> : <IoMenu size={24} />} */}
          </button>
        </div>
        <div className="col-4 d-flex justify-content-center">
          <img src={LogoClubTopBar} alt="Logo Club" style={{ maxWidth: '80px' }} />
        </div>
        <div className="col-4 d-flex justify-content-end">
          {/* {isMenuOpen && (
            <button
              onClick={toggleMenu}
              className="club_btn_top_menu"
              style={{ background: 'none', border: 'none', cursor: 'pointer' }}
            >
              <IoSearch size={24} />
            </button>
          )} */}
          <button
            className="club_btn_top_menu club_btn_icon_help"
          >
            <IoIosSettings
              size={24}
              className="club_color_fuente_blanco"
              onClick={goToSetings}
            />
          </button>
        </div>
      </div>

      {/* Navbar Horizontal */}
      {isMenuOpen && (
        <nav className="club_navbar">
            <div className='club_navbar_cont'>
                <div className='col-12 d-flex justify-content-start' style={{padding:'16px 24px'}}>
                    <button
                    onClick={() => { setIsMenuOpen(false) }}
                    className="club_btn_top_menu"
                >
                    <IoClose 
                        size={24}
                        className='club_color_fuente_gris_01' 
                    />
                </button>
                </div>
                <div className='col-12'>
                    <img src={LogoClubTopBar} alt="Logo Club" style={{ maxWidth: '80px' }} />
                </div>
                <ul className="club_navbar_list club_color_fuente_gris_01">
                    <li onClick={() => goToSection('/home')}>Inicio</li>
                    <li onClick={() => goToSection('/alertas')}>Alertas</li>
                    <li onClick={() => goToSection('/chats')}>Chats</li>
                    <li onClick={() => goToSection('/alertas')}>Matches</li>
                    <li onClick={() => goToSection('/likes')}>Likes</li>
                    <li onClick={() => goToSection('/alertas')}>Amigas</li>
                    <li onClick={() => goToSection('/mi_perfil')}>Perfil</li>
                    <li onClick={() => goToSection('/configuracion')}>Ajustes</li>
                </ul>

            </div>
        </nav>
      )}
    </div>
  );
};
