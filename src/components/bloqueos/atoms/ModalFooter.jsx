import PropTypes from 'prop-types';

const ModalFooter = ({ handleBlock, onCancel, isDisabled, forwardButton, backwardButton, style }) => {;

  return (
    <div className="modal-footer" style={style}>
      <button onClick={handleBlock} className="btn club_btn club_btn_full club_btn_borde_gris" disabled={isDisabled || false}>
        {forwardButton ? forwardButton : 'Continuar'}
      </button>
      <button onClick={onCancel} className="btn club_btn club_btn_full club_btn_borde_violeta">
        {backwardButton ? backwardButton : 'Cancelar'}
      </button>
    </div>
  );
};

ModalFooter.propTypes = {
  handleBlock: PropTypes.func.isRequired,
  onCancel: PropTypes.func.isRequired,
  isDisabled: PropTypes.bool,
  forwardButton: PropTypes.string,
  backwardButton: PropTypes.string,
  style: PropTypes.object
};

export default ModalFooter;