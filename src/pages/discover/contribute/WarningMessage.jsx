import React from "react";
import styled from "styled-components";
import { AlertIcon } from "@/assets/icons";
import PropTypes from "prop-types";

const WarningBox = styled.div`
  background-color: #fff7e6;
  border: 2px solid #d9a441;
  color: #5B450F;
  border-radius: 18px;
  padding: 16px;
  margin-top: 10px;
  display: flex;
  align-items: flex-start;
  gap: 8px;
`;

const IconWrapper = styled.div`
  min-width: 20px;
  height: auto;
`;

const TextContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
`;

const WarningTitle = styled.div`
  font-size: 16px;
  font-weight: 700;
`;

const WarningText = styled.p`
  margin: 0;
  line-height: 1.5;
  font-size: 12px;
  font-weight: 400;
`;

export default function WarningMessage({ title, children }) {
  return (
    <WarningBox>
      <IconWrapper>
        <AlertIcon />
      </IconWrapper>
      <TextContainer>
        {title && <WarningTitle>{title}</WarningTitle>}
        <WarningText>{children}</WarningText>
      </TextContainer>
    </WarningBox>
  );
}

WarningMessage.propTypes = {
  title: PropTypes.string,
  children: PropTypes.node.isRequired,
};
