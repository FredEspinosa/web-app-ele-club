import React from "react";
import PropTypes from "prop-types";
import { Box, Typography } from "@mui/material";
import { DiscoverInfo } from "@/components/discover/atoms";

const InfoSection = ({ title, content }) => (
  <Box display="flex" flexDirection="column">
    <Typography fontSize="12px" fontWeight={600}>
      {title}
    </Typography>
    <Typography fontSize="12px">{content}</Typography>
  </Box>
);

export default function EventInfoBlock({ title, category, date, hour, about, locationName, company, cost }) {
  return (
    <Box display="flex" flexDirection="column" gap={2} padding="0px 18px 18px">
      <Typography variant="span" fontSize={"16px"} fontWeight={700}>
        {title}
      </Typography>

      <Typography
        component="span"
        sx={{
          display: "flex",
          alignItems: "center",
          width: "59px",
          height: "22px",
          fontSize: "10px",
          fontWeight: 600,
          letterSpacing: ".5px",
          color: "#BC8D40",
        }}
      >
        {category}
      </Typography>

      <Box display="flex" gap={2} flexWrap="wrap">
        <DiscoverInfo icon="calendar">{date}</DiscoverInfo>
        <DiscoverInfo icon="clock">{hour}</DiscoverInfo>
        <DiscoverInfo icon="location">{locationName}</DiscoverInfo>
      </Box>

      <InfoSection title="Acerca de" content={about} />
      <InfoSection title="Dirección" content={locationName} />
      <InfoSection title="Organizado por" content={company} />
      <InfoSection title="Costo" content={`${cost}`} />
    </Box>
  );
}

InfoSection.propTypes = {
  title: PropTypes.string.isRequired,
  content: PropTypes.string,
};

EventInfoBlock.propTypes = {
  title: PropTypes.string,
  category: PropTypes.string,
  date: PropTypes.string,
  hour: PropTypes.string,
  locationName: PropTypes.string,
  about: PropTypes.string,
  company: PropTypes.string,
  cost: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
};
