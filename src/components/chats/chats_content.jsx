// eslint-disable-next-line no-unused-vars
import React from 'react'
import { BsChatSquareDotsFill } from 'react-icons/bs'

const ChatsContent = ({handleOnClick}) => {
  return (
    <div>
        <div className="col-12 text-start club_onboarding_info d-flex align-items-center">
            <div className="d-flex flex-wrap align-items-center justify-content-center w-100">
                <div className="club_content">
                    <div className="club_icon-container">
                        <div>
                            <BsChatSquareDotsFill className='club_icon_card_no_notifications' size={85} />
                        </div>
                    </div>
                    <h2 className="club_message-title">No tienes chats todavía</h2>
                    <p className="club_message-description">
                        Ve a inicio para likear perfiles - una vez que te regresen el like se volverá match y podrás chatear aquí!
                    </p>
                    <button className="club_action-button" onClick={handleOnClick}>Ir a Inicio</button>
                </div>
            </div>
        </div>
    </div>
  )
}

export default ChatsContent