import { SearchIcon } from '@/assets/icons';
import { StyledRelativeContainer } from '@/styles/discover/containers';
import { StyledSearchInnput, StyledSerachIconContainer } from '@/styles/discover/input'
import PropTypes from 'prop-types';

export default function SearchInput({
  id = 'search',
  name = 'search',
  value = '',
  onChange = () => {},
  placeholder = 'Buscar'
}) {
  return (
    <StyledRelativeContainer>
      <StyledSearchInnput 
        type='text' 
        data-test-id={`discover-test-${id}`}
        onChange={(e) => onChange(name, e.target.value)}
        id={id}
        value={value}
        placeholder={placeholder}
      />
      <StyledSerachIconContainer>
        <SearchIcon />
      </StyledSerachIconContainer>
    </StyledRelativeContainer>
  );
}

SearchInput.propTypes = {
  id: PropTypes.string,
  name: PropTypes.string,
  value: PropTypes.string,
  onChange: PropTypes.func,
  placeholder: PropTypes.string,
};
