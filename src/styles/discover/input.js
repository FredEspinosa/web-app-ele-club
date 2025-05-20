import styled from '@emotion/styled';

export const StyledSearchInnput = styled.input`
  width: 100%;
  height: 100%;
  background-color: var(--color-background-blanco);
  border: none;
  padding: 12px 16px 12px 48px;
  border-radius: 3.40282e38px;
  font-size: 14px;
    font-weight: 400;
  &::placeholder {
    color: var(--color-neutral-gris-03);
    font-size: 14px;
    font-weight: 400;
  }
  &:focus-visible {
    outline: none;
  }
`;

export const StyledSerachIconContainer = styled.div`
  position: absolute;
  top: 50%;
  left: 16px;
  transform: translateY(-50%);
`