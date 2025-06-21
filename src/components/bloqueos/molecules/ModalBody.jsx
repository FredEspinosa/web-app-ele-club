import PropTypes from "prop-types";

const ModalBody = ({ text, children }) => {
  return (
    <div className="modal-body">
      <p className="modal-text-with-breaks">{text}</p>
      {children}
    </div>
  );
};

ModalBody.propTypes = {
  text: PropTypes.string,
  children: PropTypes.node
};

export default ModalBody;
