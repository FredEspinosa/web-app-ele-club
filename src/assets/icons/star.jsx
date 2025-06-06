import PropTypes from 'prop-types';

const Star = ({ filledPercentage = 0 }) => (
  <svg
    width="21"
    height="20"
    viewBox="0 0 21 20"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <defs>
      <linearGradient id={`grad-${filledPercentage}`}>
        <stop offset={`${filledPercentage}%`} stopColor="#FFC107" />
        <stop offset={`${filledPercentage}%`} stopColor="#E0E0E0" />
      </linearGradient>
    </defs>
    <path
      d="M10.5 1.5L13.16 7.26L19.5 8.27L14.5 12.97L15.82 19.23L10.5 16L5.18 19.23L6.5 12.97L1.5 8.27L7.84 7.26L10.5 1.5Z"
      fill={`url(#grad-${filledPercentage})`}
    />
  </svg>
);

Star.propTypes = {
  filledPercentage: PropTypes.number
}

export default Star;