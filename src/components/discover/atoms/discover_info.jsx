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

const available_icons = {
  location: <LocationInfoIcon />,
  calendar: <CalendarInfoIcon />,
  clock: <ClockInfoIcon />,
  user: <UserInfoIcon />,
  money: <MoneyInfoIcon />

}

function DiscoverInfo({ icon, color, children }) {
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