import {
  StyledAssistantsContainer,
} from '@/styles/discover/containers';
import {
  StyledAboutText,
  StyledDetailTitle,
  TitleContainer,
} from '@/styles/discover/texts';
import PropTypes from 'prop-types';
import { AssistantCard } from '../atoms';

export default function EventAssistants({assistants = []}) {
  return (
    <>
      <TitleContainer>
        <StyledDetailTitle $size={14}>Personas que asistirán</StyledDetailTitle>
        <StyledAboutText>{assistants?.length} asistentes</StyledAboutText>
      </TitleContainer>
      <StyledAssistantsContainer>
        {assistants.map((assistant, index) => (
          <AssistantCard
            key={`event-assistant-${assistant.fullName}-${index}`}
            {...assistant}
          />
        ))}
      </StyledAssistantsContainer>
    </>
  );
}

EventAssistants.propTypes = {
  fullName: PropTypes.string,
  photo: PropTypes.string,
  userId: PropTypes.string,
};
