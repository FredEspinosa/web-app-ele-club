import PropTypes from 'prop-types';
import { StyledTitleSectionContainer } from "@/styles/discover/containers";
import { StyledSectionTitle } from "@/styles/discover/texts";
import React from "react";

function TitleSection({ icon = null, fill = null, children }) {
  return (
    <StyledTitleSectionContainer $fill={fill}>
      {icon}
      <StyledSectionTitle>
        {children}
      </StyledSectionTitle>
    </StyledTitleSectionContainer>
  )
}


TitleSection.propTypes = {
  icon: PropTypes.node | null,
  fill: PropTypes.string | null,
  children: PropTypes.node
};

const MemoizedTitleSection = React.memo(TitleSection, (prevProps, nextProps) => {
  return (
    prevProps.icon === nextProps.icon &&
    prevProps.fill === nextProps.fill &&
    prevProps.children === nextProps.children
  );
});

export default MemoizedTitleSection;