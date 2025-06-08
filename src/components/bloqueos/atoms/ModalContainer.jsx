import PropTypes from "prop-types";
import '../../../assets/styles/BlockUserModal.css';

const ModalContainer = ({ width, height, borderRadius, top, left, children }) => {
  const contentStyle = {
    width: width ? `${width}px` : '100%',
    height: height ? `${height}px` : '608px',
    borderRadius: borderRadius ? `${borderRadius}px` : '16px 16px 0px 0px',
    top: top ? `${top}px` : '245px',
    ...(left ? {left: `${left}px`} : '')
  }
  return (
    <div className="modal-overlay">
      <div id="modalContainer" className="modal-content" style={contentStyle}>
        {children}
      </div>
    </div>
  );
};

ModalContainer.propTypes = {
  width: PropTypes.number,
  height: PropTypes.number,
  borderRadius: PropTypes.number,
  top: PropTypes.number,
  left: PropTypes.number,
  children: PropTypes.node.isRequired
};

export default ModalContainer;