import styled from '@emotion/styled';
import { flex, grid } from '../globals/mixins';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Box, Tab, Tabs, Paper } from '@mui/material';

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
    columnGap: '9px',
    justifyContent: 'stretch',
    alignItems: 'stretch'
  })}
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
  width: 100%;
  overflow: hidden;
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

export const StyledSwiper = styled(Swiper)`
  width: 100%;
  height: 100%;
  min-height: 207px;
  max-height: 207px;
  & span.swiper-pagination-bullet.swiper-pagination-bullet-active{
    background-color: var(--color-neutral-gris-04);
  }
  & span.swiper-pagination-bullet {
    background-color: var(--color-neutral-gris-02);
  }
`;

export const StyledSwiperSlide = styled(SwiperSlide)`
  padding: 0;
`;

export const StyledDetailContainer = styled.div`
  width: 100vw;
  ${grid({
    alignItems: 'flex-start',
    gridAutoRows: 'max-content',
    rowGap: '20px'
  })}
  background-color: var(--color-background-blanco);
  padding: 20px;
`;

export const StyledEventDetailOrganizationContainer = styled.div`
  width: 100%;
  ${grid({
    gridTemplateColumns: '40px 1fr 136px',
    columnGap: '23px',
    alignItems: 'center'
  })}
`;

export const StyledDetailOwnerContainer = styled.div`
  overflow: hidden;
`;

export const StyledTabsContainer = styled(Box)`
  width: 100%;
`;

export const StyledTabs = styled(Tabs)`
  background-color: var(--color-neutral-gris-07);
  width: 100%;
  border-radius: 16px;
  padding: 4px;
`;

export const StyledTabItem = styled(Tab)`
  text-transform: none;
  font-weight: 700;
  font-size: 12px;
  text-align: center;
  color: ${({ selected }) => selected ? 'var(--color-background-blanco) !important' : 'var(--color-tab-details) !important'};
  background-color: ${({ selected }) => selected ? 'var(--color-primario-oro) !important' : 'transparent !important'};
  border-radius: 12px;
  padding: 8px 20.33px;
  min-height: auto;
`;

export const StyledAssistantCard = styled.div`
  ${flex({
    flexDirection: 'row',
    gap: '8px'
  })}
  border: 1px solid var(--color-neutral-gris-06);
  padding: 16px 8px;
  border-radius: 16px;
  box-shadow: none;
`;

export const StyledAssistantsContainer = styled.div`
  ${grid({
    gridTemplateColumns: 'calc(50% - 8px) calc(50% - 8px)',
    columnGap: '16px',
    rowGap: '16px'
  })}
  overflow-x: hidden;
  width: 100%;
`;