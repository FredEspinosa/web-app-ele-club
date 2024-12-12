// eslint-disable-next-line no-unused-vars
import React, { useState } from 'react'

const FooterDinamico = ({ textoFooter, redirectLink }) => {
    
  return (
    <div className='club_tipo_cuenta_footer' >
      {redirectLink ? (
        <a
          className="club_links"
          href="https://helenaapp.com/terms/"
          target="_blank"
          rel="noopener noreferrer"
        >
          {textoFooter}
        </a>
      ) : (
        textoFooter // Renderiza solo el texto si redirectLink es true
      )}
    </div>
  )
}

export default FooterDinamico