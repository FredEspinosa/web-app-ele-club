import styled from "styled-components";

export const ImagePreviewContainer = styled.div`
  position: relative;
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  overflow: hidden;
  border-radius: 8px;
`;
export const ImagePreview = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
`;
export const RemoveImageButton = styled.button`
  position: absolute;
  top: 8px;
  right: 8px;
  background-color: rgba(0, 0, 0, 0.8);
  color: white;
  border: none;
  border-radius: 50%;
  width: 30px;
  height: 30px;
  cursor: pointer;
  display: flex;
  justify-content: center;
  align-items: center;
  font-weight: bold;
  font-size: 16px;
  transition: background-color 0.2s ease-in-out;
  &:hover {
    background-color: rgba(255, 0, 0, 0.7);
  }
`;