import styled from '@emotion/styled';
import { flex, grid } from '../globals/mixins';

export const StyledPageContainer = styled.main`
  width: 100vw;
  min-height: 100vh;
  ${grid({
    alignItems: 'flex-start',
    gridAutoRows: 'max-content',
    rowGap: '21px'
  })}
  background-color: var(--color-neutral-gris-05);
  padding: 20px;
`;

export const StyledEventInfoContainer = styled.div`
  ${flex({
    flexDirection: 'row',
    gap: '4px',
  })}
`;

export const StyledDetailsEventContainer = styled.div`
  ${({ $justify, $align }) =>
    flex({
      flexDirection: 'row',
      gap: '16px',
      justifyContent: $justify ?? 'center',
      alignItems: $align ?? 'center',
    })}
  ${({ $padding }) => $padding ? `padding: ${$padding};` : ''}
  ${({ $width }) => $width ? `width: ${$width};` : ''}
`;

export const StyledCategoryContainer = styled.div`
  ${grid({
    gridTemplateColumns: 'repeat(3, 1fr)',
    columnGap: '9px'
  })}
  place-items: center;
`;


export const StyledTopFiltersContainer = styled.div`
  ${grid({
    gridTemplateColumns: '1fr 115px',
    columnGap: '9px',
    alignItems: 'stretch'
  })}
`;

export const StyledRelativeContainer = styled.div`
  position: relative;
`;

export const StyledCardContainer = styled.div`
  ${grid({})}
  padding: 0;
  border: none;
`;

export const StyledLayoutDetailsDiscover = styled.main`
  ${grid({})}
`;

export const StyledDetailsHeader = styled.header`
  ${grid({})}
  position: relative;
  padding: 24.5px 46px;
  background-color: var(--color-background-blanco);
`;

export const StyledTitleSectionContainer = styled.div`
  ${flex({
    flexDirection: 'row',
    justifyContent: 'flex-start',
    gap: '10px'
  })}
  fill: var(${({ $fill }) => $fill ?? '--color-background-calendar-icon'});
`;

export const StyledServicesListInfoContainer = styled.div`
  ${grid({
    gridTemplateColumns: '1fr 38px',
    gridTemplateRows: 'repeat(2, 1fr)',
    justifyItems: 'start',
    rowGap: '8px'
  })}
  width: 100%;
`;

export const StyledServicesListRateContainer = styled.div`
  ${grid({
    gridTemplateColumns: 'repeat(2, 1fr)',
    columnGap: '4.3px'
  })}
`;