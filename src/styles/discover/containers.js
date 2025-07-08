import styled from "@emotion/styled";
import { flex, grid } from "../globals/mixins";
import { Swiper, SwiperSlide } from "swiper/react";
import { Box, Tab, Tabs, Paper, Card } from "@mui/material";

export const StyledPageContainer = styled.main`
  width: 100vw;
  min-height: 100vh;
  ${grid({
    alignItems: "flex-start",
    gridAutoRows: "max-content",
    rowGap: "21px",
  })}
  background-color: var(--color-neutral-gris-05);
  padding: 70px 20px 150px 20px;
`;

export const StyledEventInfoContainer = styled.div`
  ${grid({
    gridTemplateColumns: "17px 1fr",
    gap: "4px",
    alignItems: "center",
  })}
`;

export const StyledDetailsEventContainer = styled.div`
  ${({ $justify, $align }) =>
    flex({
      flexDirection: "row",
      gap: "16px",
      justifyContent: $justify ?? "center",
      alignItems: $align ?? "center",
    })}
  ${({ $padding }) => ($padding ? `padding: ${$padding};` : "")}
  ${({ $width }) => ($width ? `width: ${$width};` : "")}
`;

export const StyledCategoryContainer = styled.div`
  ${grid({
    gridTemplateColumns: "repeat(3, 1fr)",
    columnGap: "9px",
    justifyContent: "stretch",
    alignItems: "stretch",
  })}
`;

export const StyledTopFiltersContainer = styled.div`
  ${grid({
    gridTemplateColumns: "1fr 115px",
    columnGap: "9px",
    alignItems: "stretch",
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
    flexDirection: "row",
    justifyContent: "flex-start",
    gap: "10px",
  })}
  fill: var(${({ $fill }) => $fill ?? "--color-background-calendar-icon"});
`;

export const StyledServicesListInfoContainer = styled.div`
  ${grid({
    gridTemplateColumns: "1fr 38px",
    gridTemplateRows: "repeat(2, 1fr)",
    justifyItems: "start",
    rowGap: "8px",
  })}
  width: 100%;
`;

export const StyledServicesListRateContainer = styled.div`
  ${grid({
    gridTemplateColumns: "repeat(2, 1fr)",
    columnGap: "4.3px",
  })}
`;

export const StyledSwiper = styled.div`
  width: 100%;
  height: 100%;
  min-height: 207px;
  max-height: 207px;
  & span.swiper-pagination-bullet.swiper-pagination-bullet-active {
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
    alignItems: "flex-start",
    gridAutoRows: "max-content",
    rowGap: "16px",
  })}
  background-color: var(--color-background-blanco);
  padding: 20px 20px 90px 20px;
`;

export const StyledEventDetailOrganizationContainer = styled.div`
  width: 100%;
  ${grid({
    gridTemplateColumns: "40px 1fr 136px",
    columnGap: "23px",
    alignItems: "center",
  })}
`;

export const StyledDetailOwnerContainer = styled.div`
  overflow: hidden;
`;

export const StyledTabsContainer = styled(Box)`
  width: 100%;
  & .MuiTabs-root {
    min-height: 0 !important;
  }
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
  color: ${({ selected }) => (selected ? "var(--color-background-blanco) !important" : "var(--color-tab-details) !important")};
  background-color: ${({ selected }) => (selected ? "var(--color-primario-oro) !important" : "transparent !important")};
  border-radius: 12px;
  padding: 8px 20.33px;
  min-height: auto;
`;

export const StyledAssistantCard = styled.div`
  ${flex({
    flexDirection: "row",
    gap: "8px",
  })}
  border: 1px solid var(--color-neutral-gris-06);
  padding: 16px 8px;
  border-radius: 16px;
  box-shadow: none;
  max-width: 162px;
`;

export const StyledAssistantsContainer = styled.div`
  ${grid({
    gridTemplateColumns: "calc(50% - 8px) calc(50% - 8px)",
    columnGap: "16px",
    rowGap: "16px",
  })}
  overflow-x: hidden;
  width: 100%;
`;

export const StyledDetailsActions = styled(Paper)`
  ${grid({
    gridTemplateColumns: "repeat(2, 1fr)",
    gap: "12px",
  })}
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  padding: 17px 19px;
  z-index: 9998;
  box-shadow: 0px -2px 4px 0px rgba(0, 0, 0, 0.25);
`;

export const StyledDetailsDirectioncontainer = styled.div`
  ${flex({
    flexDirection: "row",
    justifyContent: "space-between",
  })}
  margin: 16px 0px;
`;

export const StyledButtonHowToGoContainer = styled.div`
  margin-top: 16px;
`;

export const StyledDetailsRateContainer = styled.div`
  ${flex({
    flexDirection: "row",
    justifyContent: "flex-start",
    gap: "5px",
  })}
`;

export const StyledEventCardWithBg = styled(Card)(({ image }) => ({
  position: "relative",
  height: "240px",
  width: "100%",
  borderRadius: "16px",
  color: "#FFFFFF",
  backgroundImage: `url(${image})`,
  backgroundSize: "cover",
  backgroundPosition: "center",
  display: "flex",
  flexDirection: "column",
  justifyContent: "flex-end",
  cursor: "pointer",
  overflow: "hidden",
  "&::before": {
    content: '""',
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    background: "linear-gradient(180deg, rgba(0,0,0,0.1) 0%, rgba(0,0,0,0.85) 100%)",
    zIndex: 1,
  },
}));

export const SubFiltersContainer = styled.div`
  display: flex;
  height: 28px;
  gap: 4px;
  overflow-x: auto;
  -ms-overflow-style: none; // IE y Edge
  scrollbar-width: none; // Firefox
  &::-webkit-scrollbar {
    display: none; // Chrome, Safari y Opera
  }
`;

export const SubFilterButton = styled.button`
  display: flex;
  padding: 6px 8px;
  border-radius: 12px;
  height: 28px;
  width: auto;
  justify-content: center;
  align-items: center;
  font-size: 14px;
  cursor: pointer;
  white-space: nowrap;
  border: none;
  background-color: ${({ isActive }) => (isActive ? "#BC8D40" : "#FFF")};
  color: ${({ isActive }) => (isActive ? "#FFFFFF" : "#BC8D40")};
`;
