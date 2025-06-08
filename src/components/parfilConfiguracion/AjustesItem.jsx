import PropTypes from "prop-types";
import { useNavigate } from "react-router-dom";
import { IoIosArrowForward } from 'react-icons/io'

function AjustesItem({route, itemText}) {
  const navigate = useNavigate();

  const goToSection = (route) => {
    navigate(route);
  };

  return (
    <>
      <div className="club_contenedor_settings club_contenedor_bg_borde_gris">
        <div className="d-flex col-12 align-items-center" onClick={() => goToSection(route)}>
          <div className="col-11">
            <p className="club_config_parrafo">{itemText}</p>
          </div>
          <div className="col-1 d-flex justify-content-center">
            <button className="btn club_btn_padding_0 club_config_btn_arrow">
              <IoIosArrowForward size={20} />
            </button>
          </div>
        </div>
      </div>
    </>
  );
}

AjustesItem.propTypes = {
  route: PropTypes.string.isRequired,
  itemText: PropTypes.string.isRequired,
};

export default AjustesItem;
