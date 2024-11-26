import React, { useState } from 'react'

const FooterDinamico = ({textoFooter}) => {
    // const [textoFooter, setTextoFooter] = useState('');
    
  return (
    <div className='club_tipo_cuenta_footer'>
        {textoFooter}
    </div>
  )
}

export default FooterDinamico