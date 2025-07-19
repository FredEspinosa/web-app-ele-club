import { dateTransform } from "@/utils/functions/discover";
import { EventCard } from "../molecules";

export default function EventsView({ data }) {
  return data?.evento?.map((info) => (
    <EventCard
      fullWidth
      id={info.id}
      key={info.id}
      img={info.offerImage}
      title={info.offerTitle}
      location={info.offerLocationName || '--'}
      date={dateTransform(info.offerDate)}
      hour={info.offerTimeStart}
      assistants={info.participantCount}
      distance={info.distance}
    />
  ));
}
