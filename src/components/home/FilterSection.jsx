// src/components/FilterSection.js
import PropTypes from 'prop-types';
import { MdExpandMore } from 'react-icons/md'; // Usaremos un icono de react-icons

// Para instalar react-icons: npm install react-icons

function FilterSection({ title, count, isOpen, onToggle, children }) {
  return (
    <div className={`filter-section ${isOpen ? 'open' : ''}`}>
      <div className="filter-section-header" onClick={onToggle}>
        <h2>{title}</h2>
        {count > 0 && <span className="badge">{count}</span>}
        <MdExpandMore className={`chevron ${isOpen ? 'open' : ''}`} size={24} />
      </div>
      <div className="filter-section-content">
        {children}
      </div>
    </div>
  );
}

FilterSection.propTypes = {
  title: PropTypes.string.isRequired,
  count: PropTypes.number.isRequired,
  isOpen: PropTypes.bool.isRequired,
  onToggle: PropTypes.func.isRequired,
  children: PropTypes.node.isRequired,
};

export default FilterSection;