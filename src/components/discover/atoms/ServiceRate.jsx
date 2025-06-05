import { StarSmallIcon } from "@/assets/icons";
import { StyledServicesListRateContainer } from "@/styles/discover/containers";
import { StyledServiceRate } from "@/styles/discover/texts";

export default function ServiceRate({ children }) {
  return (
    <StyledServicesListRateContainer>
      <StarSmallIcon />
      <StyledServiceRate>
        {children}
      </StyledServiceRate>
    </StyledServicesListRateContainer>
  )
}
