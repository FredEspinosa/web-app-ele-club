import List from "@mui/material/List";
import { MotionSlider } from "@/components/shared/molecules";
import React, { useMemo } from "react";
import { EventCard, ServiceItem } from "@/components/discover/molecules";
import { TitleSection } from "../atoms";
import { BellIcon, CalendarIcon } from "@/assets/icons";
import { dateTransform } from "@/utils/functions/discover";

export default function AllView({ data }) {
    console.log({data});
    
  const EventTitle = useMemo(() => {
    return <TitleSection icon={<CalendarIcon />}>Próximos eventos...</TitleSection>;
  }, []);

  const ServiceTitle = useMemo(() => {
    return (
      <TitleSection fill="--color-background-bell-icon" icon={<BellIcon />}>
        Servicios populares
      </TitleSection>
    );
  }, []);

  const firstEvent = data?.evento?.[1];

  return (
    <>
      <>
        {firstEvent && (
          <EventCard
            id={firstEvent.id}
            key={firstEvent.id}
            img={firstEvent.offerImage}
            title={firstEvent.offerTitle}
            location={firstEvent.offerLocationName}
            date={dateTransform(firstEvent.offerDate)}
            hour={firstEvent.offerTimeStart}
            distance="1.2 km de distancia"
          />
        )}
      </>

      <MotionSlider title={EventTitle}>
        {data?.evento?.map((info) => (
          <EventCard
            id={info.id}
            key={info.id}
            img={info.offerImage}
            title={info.offerTitle}
            location={info.offerLocationName}
            date={dateTransform(info.offerDate)}
            hour={info.offerTimeStart}
          />
        ))}
      </MotionSlider>
      {ServiceTitle}
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
    </>
  );
}
