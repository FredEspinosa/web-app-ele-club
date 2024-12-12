// eslint-disable-next-line no-unused-vars
import React from "react";

const NavBarDinamicButtons = ({ buttonsList, onButtonClick, activeButton, colBtns }) => {
  const handleButtonClick = (evento) => {
    if (onButtonClick) onButtonClick(evento); // Notificar al componente padre
  };

  return (
    <div style={{ marginTop: "50px" }}>
      <div className="col-12 club_nav_btn_dynamic">
        <div className="col-12 d-flex flex-wrap justify-content-center">
          {buttonsList.map((item, idx) => (
            <button
              key={idx}
              className={`btn club_nav_btn_dynamic_btn ${
                activeButton === item.evento ? "active" : ""
              } ${colBtns} d-flex justify-content-center align-items-center`}
              onClick={() => handleButtonClick(item.evento)}
            >
              <span>{item.texto}</span>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default NavBarDinamicButtons;
