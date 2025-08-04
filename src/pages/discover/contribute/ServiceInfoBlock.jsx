import React from "react";
import PropTypes from "prop-types";
import { Box, List, ListItem, ListItemIcon, ListItemText, Typography } from "@mui/material";
import { CheckIconDos } from "@/assets/icons";

const InfoSection = ({ title, content }) => (
  <Box display="flex" flexDirection="column">
    <Typography fontSize="12px" fontWeight={600}>
      {title}
    </Typography>
    <Typography fontSize="12px">{content}</Typography>
  </Box>
);

export default function ServiceInfoBlock({
  title,
  category,
  about,
  includes,
  cost,
  schedule,
  locationName,
  company,
  phoneNumber,
  email,
  webSite,
}) {
  const listItems = includes.split(",").map((item) => item.trim()) || [];
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
          justifyContent: "center",
          width: "59px",
          height: "22px",
          fontSize: "8px",
          fontWeight: 600,
          letterSpacing: ".5px",
          color: "#BC8D40",
        }}
      >
        {category}
      </Typography>

      <InfoSection title="Acerca de" content={about} />

      <Box display="flex" flexDirection="column">
        <Typography fontSize="12px" fontWeight={600}>
          {title}
        </Typography>
        <List sx={{ padding: 0, marginTop: "4px" }}>
          {listItems.map((item, index) => (
            <ListItem key={index} disablePadding sx={{ alignItems: "flex-start" }}>
              <ListItemIcon sx={{ minWidth: "24px", marginTop: "2px" }}>
                <CheckIconDos width="17px" height="12px" />
              </ListItemIcon>
              <ListItemText primary={item} primaryTypographyProps={{ fontSize: "12px" }} />
            </ListItem>
          ))}
        </List>
      </Box>
      <InfoSection title="Costo" content={cost} />
      <InfoSection title="Horarios" content={schedule} />
      <InfoSection title="Direccion" content={locationName} />
      <InfoSection title="Empresa" content={company} />
      <InfoSection title="Teléfono" content={phoneNumber} />
      <InfoSection title="Email" content={email} />
      <InfoSection title="Sitio web" content={webSite} />
    </Box>
  );
}

InfoSection.propTypes = {
  title: PropTypes.string.isRequired,
  content: PropTypes.string,
};

ServiceInfoBlock.propTypes = {
  title: PropTypes.string,
  category: PropTypes.string,
  date: PropTypes.string,
  hour: PropTypes.string,
  locationName: PropTypes.string,
  about: PropTypes.string,
  includes: PropTypes.string,
  schedule: PropTypes.string,
  company: PropTypes.string,
  cost: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  phoneNumber: PropTypes.string,
  email: PropTypes.string,
  webSite: PropTypes.string,
};
