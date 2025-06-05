import PropTypes from 'prop-types';
import { ArrowRightIcon } from '../../../assets/icons';
import { StyledDetailsButton } from '../../../styles/discover/buttons';

function DetailsButton({ action }) {
  return (
    <StyledDetailsButton onClick={action}>
      Detalles <ArrowRightIcon />
    </StyledDetailsButton>
  );
}

DetailsButton.propTypes = {
  action: PropTypes.func,
};

export default DetailsButton;
