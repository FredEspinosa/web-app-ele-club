import PropTypes from 'prop-types';
import { StyledAboutText, StyledDetailTitle } from '@/styles/discover/texts';

export default function AboutDetails({ about = [] }) {
  return (
    <>
      <StyledDetailTitle $size={16}>Acerca del evento</StyledDetailTitle>
      {about.map((item, index) => (
        <StyledAboutText key={`about-event-details-${index}`}>
          {item}
        </StyledAboutText>
      ))}
    </>
  );
}

AboutDetails.propTypes = {
  about: PropTypes.arrayOf(PropTypes.string)
}