import React from 'react'

const NavBienvenida = ({handleClick}) => {
  return (
    <div className='club_bienvenida_nav'>
        <button className='btn club_btn' onClick={handleClick}>Omitir</button>
    </div>
  )
}

export default NavBienvenida