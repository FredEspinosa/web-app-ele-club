import PropTypes from 'prop-types';
import { StarIcon } from "../../../assets/icons";

const StarRating = ({ value }) => {
  const stars = [];

  for (let i = 0; i < 5; i++) {
    const filled = Math.max(0, Math.min(100, (value - i) * 100));
    stars.push(<StarIcon key={i} filledPercentage={filled} />);
  }

  return <div style={{ display: "flex", gap: 4 }}>{stars}</div>;
};

StarRating.propTypes = {
  value: PropTypes.number
}

export default StarRating;