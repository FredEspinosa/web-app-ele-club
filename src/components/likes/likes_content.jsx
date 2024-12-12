// eslint-disable-next-line no-unused-vars
import React from 'react'
import { IoHeartCircleOutline } from 'react-icons/io5'

const LikesContent = ({ handleOnClick }) => {
  return (
    <div>
        <div className="col-12 text-start club_onboarding_info d-flex align-items-center">
            <div className="d-flex flex-wrap align-items-center justify-content-center w-100">
                <div className="club_content">
                    <div className="club_icon-container">
                        <div>
                            <IoHeartCircleOutline className='club_icon_card_no_notifications' size={85} />
                        </div>
                    </div>
                    <h2 className="club_message-title">No tienes nuevos Likes</h2>
                    <p className="club_message-description">
                        Cada vez que alguien te de like podrás verlo aquí, lo puedes borrar o regresarle el like para que se vuelva Match!
                    </p>
                    <button className="club_action-button" onClick={handleOnClick}>Ir a Inicio</button>
                </div>
            </div>
        </div>
    </div>
  )
}

export default LikesContent