import { StyledDetailContainer, StyledDetailOwnerContainer, StyledEventDetailOrganizationContainer } from '@/styles/discover/containers'
import { StyledDetailOwner, StyledDetailOwnerLabel, StyledDetailTitle } from '@/styles/discover/texts'
import React from 'react'
import EventLocation from './EventLocation';
import { FiPhone } from 'react-icons/fi';
import { StyleCircleIcon } from '@/styles/discover/circleIcon';
import { RiMailLine } from 'react-icons/ri';
import { MdWeb } from 'react-icons/md';
import { LuClock3 } from 'react-icons/lu';

export default function ContactInformation({ data }) {
  console.log("data info contact");

  return (
    <div>
      <StyledDetailTitle $size={16}>Información de contacto</StyledDetailTitle>
      <StyledEventDetailOrganizationContainer>
        <StyleCircleIcon>
          <FiPhone size={18} />
        </StyleCircleIcon>
        <StyledDetailOwnerContainer>
          <StyledDetailOwnerLabel>Teléfono</StyledDetailOwnerLabel>
          <StyledDetailOwner >{data?.ServicePhoneNumber}</StyledDetailOwner>
        </StyledDetailOwnerContainer>
      </StyledEventDetailOrganizationContainer>
      <StyledEventDetailOrganizationContainer>
        <StyleCircleIcon>
          <RiMailLine size={18} />
        </StyleCircleIcon>
        <StyledDetailOwnerContainer>
          <StyledDetailOwnerLabel>E-Mail</StyledDetailOwnerLabel>
          <StyledDetailOwner >{data?.ServiceEmail}</StyledDetailOwner>
        </StyledDetailOwnerContainer>
      </StyledEventDetailOrganizationContainer>
      <StyledEventDetailOrganizationContainer>
        <StyleCircleIcon>
          <MdWeb size={18} />
        </StyleCircleIcon>
        <StyledDetailOwnerContainer>
          <StyledDetailOwnerLabel>Sitio web</StyledDetailOwnerLabel>
          <StyledDetailOwner >{data?.ServiceWebSite}</StyledDetailOwner>
        </StyledDetailOwnerContainer>
      </StyledEventDetailOrganizationContainer>
      <StyledEventDetailOrganizationContainer>
        <StyleCircleIcon>
          <LuClock3 size={18} />
        </StyleCircleIcon>
        <StyledDetailOwnerContainer>
          <StyledDetailOwnerLabel>Horarios</StyledDetailOwnerLabel>
          <StyledDetailOwner >{data?.ServiceSchedule}</StyledDetailOwner>
        </StyledDetailOwnerContainer>
      </StyledEventDetailOrganizationContainer>
      <div style={{paddingTop:'16px', marginTop:'16px'}}>
      <EventLocation address={data.ServiceLocationName} mapLocation={data.mapLocation} />

      </div>
    </div>
  )
}

