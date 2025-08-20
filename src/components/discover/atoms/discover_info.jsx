import PropTypes from 'prop-types';
import { 
  CalendarInfoIcon,
  ClockInfoIcon,
  LocationInfoIcon,
  UserInfoIcon,
  MoneyInfoIcon
} from "../../../assets/icons";
import { StyledEventInfoContainer } from "../../../styles/discover/containers";
import { StyledDiscoverRegularText } from "../../../styles/discover/texts";

function DiscoverInfo({ icon, color, colorFill, children }) {

  const available_icons = {
  location: <LocationInfoIcon fillColor={colorFill} />,
  calendar: <CalendarInfoIcon fillColor={colorFill} />,
  clock: <ClockInfoIcon fillColor={colorFill} />,
  user: <UserInfoIcon fillColor={colorFill} />,
  money: <MoneyInfoIcon fillColor={colorFill} />
}

  return (
    <StyledEventInfoContainer>
      {available_icons[icon]}
      <StyledDiscoverRegularText $color={color}>
        {children}
      </StyledDiscoverRegularText>
    </StyledEventInfoContainer>
  )
}

DiscoverInfo.propTypes = {
  icon: PropTypes.string,
  color: PropTypes.string,
  children: PropTypes.node
}

export default DiscoverInfo;