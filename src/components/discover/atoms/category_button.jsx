import PropTypes from 'prop-types';
import {
  AllCategoryIcon,
  BellIcon,
  CalendarIcon,
  HeartIcon,
} from '../../../assets/icons';
import { StyledCategoryButton } from '../../../styles/discover/buttons';

const available_categories = {
  all: {
    text: 'Todos',
    icon: <AllCategoryIcon />,
  },
  'Evento': {
    text: 'Eventos',
    icon: <CalendarIcon />,
  },
  'Servicio': {
    text: 'Servicios',
    icon: <BellIcon />,
  },
  'Teams': {
    text: 'Teams',
    icon: <HeartIcon />,
  },
};

const CategoryButton = ({ action, category, active }) => {
  return (
    <StyledCategoryButton type='button' onClick={action} $active={active}>
      {available_categories[category]?.icon ?? null}
      {available_categories[category]?.text ?? ''}
    </StyledCategoryButton>
  );
};

CategoryButton.propTypes = {
  action: PropTypes.func,
  category: PropTypes.string,
  active: PropTypes.bool,
};

export default CategoryButton;
