import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
import { Box, Typography, Radio, List, ListItem, ListItemIcon, ListItemText } from "@mui/material";
import { CircleStarIcon, DiscoverBellIcon, DiscoverCalendarIcon, YellowCircleIcon } from "@/assets/icons";

const PlanCard = styled(Box)`
  background-color: #fffbe1;
  border-radius: 8px;
  padding: 32px 15px;
  width: 280px;
  height: 660px;
  border: 1px solid #fee055;
  transition: border-color 0.3s ease;
  display: flex;
  flex-direction: column;
  gap: 16px;
`;

export default function PayPlanCard({ basicPlanList }) {
  return (
    <Box display={"flex"} flexDirection={"column"} gap={"18px"}>
      <PlanCard>
        <Box textAlign="center" display={"flex"} flexDirection="column" alignItems="center" gap={2}>
          <YellowCircleIcon />
          <Typography variant="h5" fontWeight="bold">
            Premium
          </Typography>
          <Typography fontSize={'34px'}>$230.00</Typography>
        </Box>

        <Box
          display="flex"
          alignItems="center"
          sx={{ borderRadius: "8px", padding: "8px", backgroundColor: "#fff", boxShadow: "-4px 0px #9747FF" }}
        >
          <ListItemIcon sx={{ minWidth: "25px" }}>
            <DiscoverCalendarIcon />
          </ListItemIcon>
          <ListItemText
            primary="Eventos"
            sx={{ display: "flex", alignItems: "center", justifyContent: "space-between", textAlign: "right", margin: "2px 0px" }}
            secondary={
              <>
                <Typography component="span" sx={{ color: "#BC8D40" }}>
                  Ilimitado
                </Typography>
              </>
            }
          />
        </Box>
        <Box
          display="flex"
          alignItems="center"
          sx={{ borderRadius: "8px", padding: "8px", backgroundColor: "#fff", boxShadow: "-4px 0px #F69E23" }}
        >
          <ListItemIcon sx={{ minWidth: "25px" }}>
            <DiscoverBellIcon />
          </ListItemIcon>
          <ListItemText
            primary="Servicios"
            sx={{ display: "flex", alignItems: "center", justifyContent: "space-between", textAlign: "right", margin: "2px 0px" }}
            secondary={
              <>
                <Typography component="span" sx={{ color: "#BC8D40" }}>
                  Ilimitado
                </Typography>
              </>
            }
          />
        </Box>

        <Box display={"flex"} flexDirection={"column"} gap={"22px"}>
          <Typography sx={{ fontWeight: "600" }}>Incluye:</Typography>
          <List>
            {basicPlanList.map((item, index) => (
              <ListItem key={index} sx={{ display: "flex", gap: "8px" }}>
                <ListItemIcon sx={{ minWidth: "25px" }}>{item.icon}</ListItemIcon>
                <ListItemText primary={item.text} primaryTypographyProps={{ lineHeight: 1 }} />
              </ListItem>
            ))}
          </List>
        </Box>
      </PlanCard>
    </Box>
  );
}

PayPlanCard.propTypes = {
  basicPlanList: PropTypes.array.isRequired,
};
