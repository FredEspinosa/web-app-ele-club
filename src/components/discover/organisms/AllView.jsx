import List from '@mui/material/List';
import { MotionSlider } from '@/components/shared/molecules'
import React, { useMemo } from 'react'
import { EventCard, ServiceItem } from '@/components/discover/molecules';
import { TitleSection } from '../atoms';
import { BellIcon, CalendarIcon } from '@/assets/icons';

export default function AllView({ data }) {
  const EventTitle = useMemo(() => {
    return <TitleSection icon={<CalendarIcon />}>
      Próximos eventos...
    </TitleSection>
  }, []);

  const ServiceTitle = useMemo(() => {
    return <TitleSection fill='--color-background-bell-icon' icon={<BellIcon />}>
      Servicios populares
    </TitleSection>
  }, []);

  return (
    <>
      <MotionSlider title={EventTitle}>
        {data?.eventos?.map((info) => (
          <EventCard
            id={info.id}
            key={info.id}
            img={info.images[0]}
            title={info.title}
            location={info.location[0].toString()}
            date={info.date}
          />
        ))}
      </MotionSlider>
      {ServiceTitle}
      <List
        sx={{
          width: '100%',
          bgcolor: 'var(--color-background-blanco)',
          borderRadius: '16px',
          padding: '0',
          display: 'grid',
          gap: '16px'
        }}
    >
      {data?.servicios?.map((info) => (
        <ServiceItem 
          key={info.id}
          id={info.id}
          title={info.title}
          image={info.images[0]}
          amount={info.amount}
          rate={info.rate}
        />
      ))}
    </List>
    </>
  )
}
