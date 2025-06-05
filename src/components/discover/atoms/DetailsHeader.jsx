import { ArrowLeftIcon } from "@/assets/icons";
import { StyledBackButton } from "@/styles/discover/buttons";
import { StyledDetailsHeader } from "@/styles/discover/containers";
import { StyledDetailsTitle } from "@/styles/discover/texts";
import { useNavigate } from "react-router-dom";

export default function DetailsHeader() {
  const navigate = useNavigate();

  const handleBack = () => {
    navigate(-1);
  };
  return (
    <StyledDetailsHeader>
      <StyledDetailsTitle>
        Detalles
      </StyledDetailsTitle>
      <StyledBackButton onClick={handleBack}>
        <ArrowLeftIcon />
      </StyledBackButton>
    </StyledDetailsHeader>
  )
}
