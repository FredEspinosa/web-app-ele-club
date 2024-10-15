// eslint-disable-next-line no-unused-vars
import React from 'react'

// eslint-disable-next-line react/prop-types
const BarraDeProgreso = ({ totalSteps, currentStep }) => {

    const steps = Array.from({ length: totalSteps }, (_, index) => index + 1);

  return (
    <div>
        <div className="club_cont_barra">
            <span>Completa tu perfil</span>
            <div className="club_barra_progreso">
                {steps.map((step) => (
                    <div
                        key={step}
                        className={`club_progreso ${step <= currentStep ? 'active' : ''}`}
                    ></div>
                ))}
            </div>
        </div>
    </div>
  )
}

export default BarraDeProgreso