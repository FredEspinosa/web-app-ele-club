import List from "@mui/material/List";
import { MotionSlider } from "@/components/shared/molecules";
import React, { useMemo } from "react";
import { EventCard, ServiceItem } from "@/components/discover/molecules";
import { TitleSection } from "../atoms";
import { BellIcon, CalendarIcon } from "@/assets/icons";
import { dateTransform } from "@/utils/functions/discover";

export default function AllView({ data }) {
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

  const firstEvent = data?.eventos?.[1];

  return (
    <>
      <>
        {firstEvent && (
          <EventCard
            id={firstEvent.id}
            key={firstEvent.id}
            img={firstEvent.EventImage}
            title={firstEvent.EventTitle}
            location={firstEvent.LocationName}
            date={dateTransform(firstEvent.EventDate)}
            hour={firstEvent.EventTimeStart}
            distance="1.2 km de distancia"
          />
        )}
      </>

      <MotionSlider title={EventTitle}>
        {data?.eventos?.map((info) => (
          <EventCard
            id={info.id}
            key={info.id}
            img={info.EventImage}
            title={info.EventTitle}
            location={info.LocationName}
            date={dateTransform(info.EventDate)}
            hour={info.EventTimeStart}
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
        {data?.servicios?.map((info) => (
          <ServiceItem
            key={info.id}
            id={info.id}
            title={info.ServiceTitle}
            image={info.ServiceImage}
            amount={info.ServicePrice}
            rate={info.reviews.average || 4.8}
          />
        ))}
      </List>
    </>
  );
}
