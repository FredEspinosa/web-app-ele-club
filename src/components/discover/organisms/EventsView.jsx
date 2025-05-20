import { EventCard } from '../molecules'

export default function EventsView({ data }) {
  return (
    data?.eventos?.map((info) => (
      <EventCard
        id={info.id}
        key={info.id}
        img={info.images[0]}
        title={info.title}
        location={info.location[0].toString()}
        date={info.date}
        hour={info.start}
        assistants={info.assistants}
        distance={info.distance}
      />
    ))
  )
}
