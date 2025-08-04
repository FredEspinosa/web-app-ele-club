import React from "react";
import PropTypes from "prop-types";

export default function CrownIcon({ width = 34, height = 34, ...props }) {
  return (
    <svg width={width} height={height} viewBox="0 0 30 28" fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
      <path
        d="M0.840332 24.9173H29.1737V27.7507H0.840332V24.9173ZM0.840332 5.08398L7.92367 10.0423L15.007 0.833984L22.0904 10.0423L29.1737 5.08398V22.084H0.840332V5.08398ZM3.67367 10.5258V19.2507H26.3404V10.5258L21.4961 13.9168L15.007 5.48099L8.51791 13.9168L3.67367 10.5258Z"
        fill="#BC8D40"
      />
    </svg>
  );
}

CrownIcon.propTypes = {
  width: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  height: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
};
