// eslint-disable-next-line no-unused-vars
import React from 'react'

const HeaderConfiguration = ({isBtnLeft, handleOnclick, iconAction, txtButton, nameHeader, sizeF, isBtnRear, handleOnclickBtn2, iconActionBtn2, txtButtonbtn2, bgColorBar, textColor}) => {
  return (
    <div>
      <div className={`club_configuración_barra ${bgColorBar} ${textColor}`}>
        <div className='col-12 d-flex'>
          <div className='col-3 d-flex align-items-center justify-content-start'>
          {isBtnLeft &&
            <button className={`btn d-flex align-items-center ${textColor} club_config_btn_back`}
              onClick={ handleOnclick }
            >
              <div>{iconAction}</div>
              {txtButton}
            </button>
          }
          </div>
          <div className='col-6 d-flex align-items-center justify-content-center'>
            <h1 className={`club_titulo_config ${textColor}`} style={{fontSize:`${sizeF}`}}>{nameHeader}</h1>
          </div>
          <div className='col-3 d-flex align-items-center justify-content-end'>
            {isBtnRear &&
              <button className={`btn d-flex align-items-center ${textColor} club_config_btn_back`}
                onClick={ handleOnclickBtn2 }
              >
                <div>{iconActionBtn2}</div>
                {txtButtonbtn2}
              </button>
            }
          </div>
        </div>
      </div>
    </div>
  )
}

export default HeaderConfiguration