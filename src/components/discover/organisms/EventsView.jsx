import { dateTransform } from "@/utils/functions/discover";
import { EventCard } from "../molecules";

export default function EventsView({ data }) {
  return data?.eventos?.map((info) => (
    <EventCard
      id={info.id}
      key={info.id}
      img={info.EventImage}
      title={info.EventTitle}
      location={info.LocationName}
      date={dateTransform(info.EventDate)}
      hour={info.EventTimeStart}
      assistants={info.EventParticipants?.length || 1}
      distance={info.distance}
    />
  ));
}
