import React, { useEffect, useMemo, useState } from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
import { Card, CardContent, CardMedia, Typography, Box } from "@mui/material";
import { DetailsButton, DiscoverInfo } from "../atoms";
import { StyledCardContainer, StyledDetailsEventContainer, StyledEventCardWithBg } from "../../../styles/discover/containers";
import { StyledDiscoverRegularText } from "../../../styles/discover/texts";
import { useGoToEvent } from "@/hooks/discover/useGoToEvent";
// import placeholderImage from "../../../assets/images/Helena_LOGO.png"
import placeholderImage from "../../../assets/images/perfil/blank-profile-picture.png";

const CardContentOnBg = styled(Box)({
  position: "relative",
  zIndex: 2,
  padding: "16px",
});

function EventCard({ img, title, location, date, hour, assistants, distance, id, fullWidth = false }) {
  const [imageSource, setImageSource] = useState(img);
  const goToEvent = useGoToEvent(id);

  useEffect(() => {
    if (!img) {
      setImageSource(placeholderImage);
      return;
    }

    let timeoutId = null;
    const loadImagePromise = new Promise((resolve, reject) => {
      const imageLoader = new Image();
      imageLoader.src = img;
      imageLoader.onload = () => resolve(img);
      imageLoader.onerror = () => reject(new Error(`Error al cargar la imagen: ${img}`));
    });

    const timeoutPromise = new Promise((_, reject) => {
      timeoutId = setTimeout(() => {
        reject(new Error("Tiempo de carga de imagen agotado"));
      }, 1000);
    });

    Promise.race([loadImagePromise, timeoutPromise])
      .then((resolvedImage) => {
        clearTimeout(timeoutId);
        setImageSource(resolvedImage);
      })
      .catch((error) => {
        console.error(error.message);
        setImageSource(placeholderImage);
      });

    return () => {
      if (timeoutId) {
        clearTimeout(timeoutId);
      }
    };
  }, [img]);

  if (distance) {
    return (
      <StyledEventCardWithBg image={imageSource} onClick={goToEvent}>
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
        width: fullWidth ? "100%" : "250px",
        minWidth: fullWidth ? "100%" : "250px",
        borderRadius: "16px",
        height: fullWidth ? "210px" : "199px",
      }}
    >
      <StyledCardContainer {...cardOptions}>
        <CardMedia
          component="img"
          height="100"
          image={imageSource || placeholderImage}
          alt={title}
          onError={() => setImageSource(placeholderImage)}
        />
        <CardContent
          sx={{
            padding: "16px",
            background: "var(--color-background-blanco)",
            display: "flex",
            flexDirection: "column",
            alignItems: "start",
            gap: "3px",
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
            {typeof assistants === "number" && <DiscoverInfo icon={"user"}>{assistants}</DiscoverInfo>}
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
  assistants: PropTypes.number,
  distance: PropTypes.string,
  id: PropTypes.string,
  fullWidth: PropTypes.bool,
};

const MemoizedEventCard = React.memo(EventCard, (prevProps, nextProps) => {
  return prevProps.id === nextProps.id;
});

export default MemoizedEventCard;
