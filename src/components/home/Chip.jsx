import PropTypes from "prop-types";

function Chip({ label, isSelected, onSelect }) {
  return (
    <button className={`chip ${isSelected ? "selected" : ""}`} onClick={onSelect}>
      {label}
    </button>
  );
}


Chip.propTypes = {
  label: PropTypes.string.isRequired,
  isSelected: PropTypes.bool.isRequired,
  onSelect: PropTypes.func.isRequired,
};

export default Chip;
