import { useState } from 'react'
import { IoClose, IoMenu, IoSearch } from 'react-icons/io5'
import LogoClubTopBar from '../../assets/images/LCLUB_LOGO.png'; // Importa la imagen como una URL

export const TopBarClub = () => {

const [isMenuOpen, setIsMenuOpen] = useState(false);

const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
}

  return (
    <div className='club_top_bar'>
        <div className='col-12 d-flex'>
            <div className='col-4 d-flex justify-content-start'>
                <button onClick={toggleMenu} className='club_btn_top_menu' style={{ background: 'none', border: 'none', cursor: 'pointer' }}>
                    {isMenuOpen ? <IoClose size={24} /> : <IoMenu size={24} />}  {/* Intercambia entre los íconos */}
                </button>
            </div>
            <div className='col-4 d-flex justify-content-center'>
                <img src={LogoClubTopBar} alt="Logo Club" />
            </div>
            <div className='col-4 d-flex justify-content-end'>
                {(isMenuOpen &&
                    <button onClick={toggleMenu} className='club_btn_top_menu' style={{ background: 'none', border: 'none', cursor: 'pointer' }}>
                        <IoSearch size={24} />
                    </button>
                )}
                <button onClick={toggleMenu} className='club_btn_top_menu club_btn_icon_help' style={{ background: 'none', border: 'none', cursor: 'pointer' }}>
                    <span className='club_icon_help'></span>
                </button>
            </div>
        </div>
    </div>
  )
}
