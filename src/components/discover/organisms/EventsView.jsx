import { dateTransform } from "@/utils/functions/discover";
import { EventCard } from "../molecules";

export default function EventsView({ data }) {
  return data?.eventos?.map((info) => (
    <EventCard
      id={info.id}
      key={info.id}
      // img={info.EventImage}
      img={"https://picsum.photos/200"}
      title={info.title}
      location={info.LocationName}
      date={dateTransform(info.EventDate)}
      hour={info.EventTimeStart}
      assistants={info.eventParticipants}
      distance={info.distance}
    />
  ));
}
