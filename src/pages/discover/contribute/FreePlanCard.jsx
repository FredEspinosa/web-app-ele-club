import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
import { Box, Typography, Radio, List, ListItem, ListItemIcon, ListItemText } from "@mui/material";
import { CircleStarIcon, DiscoverBellIcon } from "@/assets/icons";

const PlanCard = styled(Box)`
  background-color: #ebf3fe;
  border-radius: 8px;
  padding: 32px 15px;
  width: 280px;
  border: 1px solid #bedbfd;
  transition: border-color 0.3s ease;
  display: flex;
  flex-direction: column;
  gap: 16px;
`;

export default function FreePlanCard({ planList, selectedSubPlan, setSelectedSubPlan, OFFERS_TYPE_IDS }) {
  return (
    <Box display={"flex"} flexDirection={"column"} gap={"18px"}>
      <PlanCard>
        <Box textAlign="center" display={"flex"} flexDirection="column" alignItems="center" gap={2}>
          <CircleStarIcon />
          <Typography variant="h5" fontWeight="bold">
            Básico
          </Typography>
          <Typography>Gratuito</Typography>
        </Box>
        <Box display={"flex"} flexDirection={"column"} gap={"22px"}>
          <Typography sx={{ fontWeight: "600" }}>Incluye:</Typography>
          <List>
            {planList.map((item, index) => (
              <ListItem key={index} sx={{ display: "flex", gap: "8px" }}>
                <ListItemIcon sx={{ minWidth: "25px" }}>{item.icon}</ListItemIcon>
                <ListItemText primary={item.text} primaryTypographyProps={{ lineHeight: 1 }} />
              </ListItem>
            ))}
          </List>
        </Box>
      </PlanCard>

      <Typography textAlign={"center"} variant="h5" fontWeight="bold">
        Contrata un:
      </Typography>

      <Box
        display="flex"
        alignItems="center"
        sx={{ borderRadius: "8px", padding: "8px", backgroundColor: "#fff", boxShadow: "-4px 0px #9747FF" }}
      >
        <Radio
          id={OFFERS_TYPE_IDS.EVENTO}
          checked={selectedSubPlan === OFFERS_TYPE_IDS.EVENTO}
          onChange={() => setSelectedSubPlan(OFFERS_TYPE_IDS.EVENTO)}
          sx={{ color: "#CC9669", "&.Mui-checked": { color: "#CC9669" } }}
        />
        <ListItemText
          primary="Evento"
          sx={{ display: "flex", alignItems: "center", justifyContent: "space-between", textAlign: "right", margin: "2px 0px" }}
          secondary={
            <>
              <Typography component="span" sx={{ color: "#BC8D40" }}>
                $50.00
              </Typography>
              <Typography component="span" display="block" fontSize={"14px"}>
                costo unitario
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
        <Radio
          id={OFFERS_TYPE_IDS.SERVICIO}
          checked={selectedSubPlan === OFFERS_TYPE_IDS.SERVICIO}
          onChange={() => setSelectedSubPlan(OFFERS_TYPE_IDS.SERVICIO)}
          sx={{ color: "#CC9669", "&.Mui-checked": { color: "#CC9669" } }}
        />
        <ListItemIcon sx={{ minWidth: "25px" }}>
          <DiscoverBellIcon />
        </ListItemIcon>
        <ListItemText
          primary="Servicio"
          sx={{ display: "flex", alignItems: "center", justifyContent: "space-between", textAlign: "right", margin: "2px 0px" }}
          secondary={
            <>
              <Typography component="span" sx={{ color: "#BC8D40" }}>
                $150.00
              </Typography>
              <Typography component="span" display="block" fontSize={"14px"}>
                costo unitario
              </Typography>
            </>
          }
        />
      </Box>
    </Box>
  );
}

FreePlanCard.propTypes = {
  planList: PropTypes.array.isRequired,
  selectedSubPlan: PropTypes.string.isRequired,
  setSelectedSubPlan: PropTypes.func.isRequired,
  OFFERS_TYPE_IDS: PropTypes.object.isRequired,
};
