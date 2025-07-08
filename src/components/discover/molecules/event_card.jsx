import React, { useMemo } from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
import { Card, CardContent, CardMedia, Typography, Box } from "@mui/material";
import CalendarTodayIcon from "@mui/icons-material/CalendarToday";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import { DetailsButton, DiscoverInfo } from "../atoms";
import { StyledCardContainer, StyledDetailsEventContainer, StyledEventCardWithBg } from "../../../styles/discover/containers";
import { StyledDiscoverRegularText } from "../../../styles/discover/texts";
import { useGoToEvent } from "@/hooks/discover/useGoToEvent";

const CardContentOnBg = styled(Box)({
  position: "relative",
  zIndex: 2,
  padding: "16px",
});

function EventCard({ img, title, location, date, hour, assistants, distance, id }) {
  const goToEvent = useGoToEvent(id);

  if (distance) {
    return (
      <StyledEventCardWithBg image={img} onClick={goToEvent}>
        <CardContentOnBg>
          <Box sx={{ display: "flex", gap: 2, mb: 1, flexWrap: "wrap" }}>
            <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
              <DiscoverInfo icon={"calendar"} color="fff">
                {`${date}, ${hour}`}
              </DiscoverInfo>
            </Box>
            <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
              <DiscoverInfo icon={"location"} color="fff">
                {location}
              </DiscoverInfo>
            </Box>
          </Box>
          <Typography variant="h5" component="h2" fontWeight="bold" noWrap>
            {title}
          </Typography>
          <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", mt: 1.5 }}>
            <StyledDiscoverRegularText $color="var(--color-gris-descubre)">{distance}</StyledDiscoverRegularText>
            <DetailsButton
              component="button"
              onClick={(e) => {
                e.stopPropagation();
                goToEvent();
              }}
              sx={{ color: "#F93E6E", fontWeight: "bold", textDecoration: "none" }}
            >
              Detalles &gt;
            </DetailsButton>
          </Box>
        </CardContentOnBg>
      </StyledEventCardWithBg>
    );
  }

  const cardOptions = useMemo(
    () => ({
      as: "button",
      onClick: goToEvent,
    }),
    [goToEvent]
  );

  return (
    <Card
      sx={{
        width: "250px",
        minWidth: "250px",
        borderRadius: "16px",
        height: "199px",
      }}
    >
      <StyledCardContainer {...cardOptions}>
        <CardMedia component="img" height="100" image={img} alt={title} />
        <CardContent
          sx={{
            padding: "18px",
            background: "var(--color-background-blanco)",
            display: "flex",
            flexDirection: "column",
            alignItems: "start",
            gap: "10px",
            overflow: "hidden",
          }}
        >
          <p
            style={{
              fontSize: 16,
              fontWeight: 700,
              letterSpacing: 0,
              whiteSpace: "nowrap",
              overflow: "hidden",
              textOverflow: "ellipsis",
              display: "block",
              maxWidth: "100%",
            }}
          >
            {title}
          </p>
          <DiscoverInfo icon={"location"} color="var(--color-gris-descubre)">
            {location}
          </DiscoverInfo>
          <StyledDetailsEventContainer>
            <DiscoverInfo icon={"calendar"}>{date}</DiscoverInfo>
            {hour && <DiscoverInfo icon={"clock"}>{hour}</DiscoverInfo>}
            {assistants && <DiscoverInfo icon={"user"}>{assistants}</DiscoverInfo>}
          </StyledDetailsEventContainer>
        </CardContent>
      </StyledCardContainer>
    </Card>
  );
}

EventCard.propTypes = {
  img: PropTypes.string,
  title: PropTypes.string,
  location: PropTypes.string,
  date: PropTypes.string,
  hour: PropTypes.string,
  assistants: PropTypes.string,
  distance: PropTypes.string,
  id: PropTypes.string,
};

const MemoizedEventCard = React.memo(EventCard, (prevProps, nextProps) => {
  return prevProps.id === nextProps.id;
});

export default MemoizedEventCard;
