import List from "@mui/material/List";
import React from "react";
import { ServiceItem } from "../molecules";

export default function ServiceView({ data }) {
  return (
    <List
      sx={{
        width: "100%",
        bgcolor: "var(--color-background-blanco)",
        borderRadius: "16px",
        padding: "0",
        display: "grid",
        gap: "16px",
      }}
    >
      {data?.servicios?.map((info) => (
        <ServiceItem
          key={info.id}
          id={info.id}
          title={info.ServiceTitle}
          image={info.ServiceImage}
          amount={info.ServiceCost || info.ServicePrice}
          rate={info.reviews?.average || 4.8}
        />
      ))}
    </List>
  );
}
