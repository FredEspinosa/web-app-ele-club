import styled from "styled-components";

export const MapWrapper = styled.div`
  position: relative;
  height: 70vh;
  width: 100%;
`;

export const FilterControlsContainer = styled.div`
  position: absolute;
  top: 10px;
  left: 10px;
  z-index: 1000;
  display: flex;
  gap: 8px;
  background-color: rgba(255, 255, 255, 0.8);
  padding: 8px;
  border-radius: 8px;
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.3);
`;

export const FilterButton = styled.button`
  padding: 8px 12px;
  border: 1px solid #ccc;
  border-radius: 6px;
  cursor: pointer;
  font-weight: 600;

  background-color: ${({ isActive }) => (isActive ? "#3388ff" : "#ffffff")};
  color: ${({ isActive }) => (isActive ? "#ffffff" : "#333333")};
`;