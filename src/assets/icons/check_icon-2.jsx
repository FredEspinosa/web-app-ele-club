import PropTypes from "prop-types";

export default function CheckIconDos({ width = "24px", height = "24px" }) {
  return (
    <svg width={width} height={height} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <mask id="mask0_2086_470" style={{ maskType: "alpha" }} maskUnits="userSpaceOnUse" x="0" y="4" width="24" height="18">
        <path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M23.5078 4.60173C24.1712 5.27821 24.1615 6.36522 23.486 7.02962L9.19445 21.0875L0.513052 12.5481C-0.162395 11.8837 -0.172173 10.7967 0.491213 10.1202C1.1546 9.44368 2.23994 9.43389 2.91539 10.0983L9.19445 16.2747L21.0837 4.57986C21.7591 3.91545 22.8445 3.92525 23.5078 4.60173Z"
          fill="#006FFD"
        />
      </mask>
      <g mask="url(#mask0_2086_470)">
        <rect x="0.000488281" width="23.9991" height="23.9994" fill="#007D00" />
      </g>
    </svg>
  );
}

CheckIconDos.propTypes = {
  width: PropTypes.string,
  height: PropTypes.string,
};
