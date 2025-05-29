import {
  StyledAssistantsContainer,
} from '@/styles/discover/containers';
import {
  StyledAboutText,
  StyledDetailTitle,
} from '@/styles/discover/texts';
import PropTypes from 'prop-types';
import { AssistantCard } from '../atoms';
import useSWR from 'swr';
import { fetcher } from '@/services/api';

export default function EventAssistants() {
  const { data, error, isLoading } = useSWR(`/api/assistants`, fetcher);
  if (isLoading) return <div>Loading</div>;
  if (error) return <div>Error</div>;

  return (
    <>
      <div>
        <StyledDetailTitle $size={16}>Personas que asistirán</StyledDetailTitle>
        <StyledAboutText>{`120 asistentes`}</StyledAboutText>
      </div>
      <StyledAssistantsContainer>
        {data.map((assistants, index) => (
          <AssistantCard
            key={`event-assistant-${assistants.name}-${index}`}
            {...assistants}
          />
        ))}
      </StyledAssistantsContainer>
    </>
  );
}

EventAssistants.propTypes = {
  name: PropTypes.string,
  profileImage: PropTypes.string,
  profileLink: PropTypes.string,
};
