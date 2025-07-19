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
      {data?.servicio?.map((info) => (
        <ServiceItem
          key={info.id}
          id={info.id}
          title={info.offerTitle}
          image={info.offerImage}
          amount={info.offerCost || info.offerPrice}
          rate={info.reviewRate}
        />
      ))}
    </List>
  );
}
