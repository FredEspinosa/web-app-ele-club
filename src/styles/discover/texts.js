import styled from '@emotion/styled';
import { fontMixin } from '../globals/mixins';

export const StyledDiscoverRegularText = styled.p`
  ${({ $color }) =>
    fontMixin({
      fontSize: '12px',
      color: $color ?? 'var(-color-background-negro)',
    })}
  opacity: ${({ $opacity }) => $opacity ?? '1'};
`;

export const StyledDetailsTitle = styled.h1`
  font-weight: 800;
  font-size: 14px;
  line-height: 100%;
  text-align: center;
  color: var(--color-titulo-pagina);
`;

export const StyledSectionTitle = styled.h5`
  font-weight: 600;
  font-size: 18px;
  line-height: 100%;
  color: var(--color-titulo-pagina);
  margin: 0;
`;

export const StyledServiceRate = styled.p`
  font-weight: 400;
  font-size: 12px;
  vertical-align: middle;
  line-height: normal;
  color: var(--color-titulo-pagina);
  margin: 0;
  opacity: ${({ $opacity }) => $opacity ?? '1'};
`;

export const StyledServiceListTitle = styled.h5`
  font-weight: 700;
  font-size: 16px;
  line-height: normal;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  display: block;
  max-width: 100%;
  margin: 0;
`;

export const StyledDetailTitle = styled.p`
  font-weight: 700;
  font-size: ${({ $size }) => ($size ? `${$size}px` : '24px')};
  line-height: 150%;
  vertical-align: middle;
`;

export const StyledDetailOwner = styled.p`
  font-weight: 700;
  font-size: 14px;
  line-height: 150%;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  display: block;
  margin: 0;
`;

export const StyledDetailOwnerLabel = styled.p`
  font-weight: 400;
  font-size: 12px;
  vertical-align: middle;
  color: var(--color-neutral-gris-02);
`;

export const StyledAboutText = styled.p`
  font-weight: 400;
  font-size: 14px;
  vertical-align: middle;
  color: var(--color-neutral-gris-02);
`