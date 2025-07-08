import { StyledAssistantCard, StyledDetailOwnerContainer } from "@/styles/discover/containers";
import { StyledDetailOwner } from "@/styles/discover/texts";
import { Avatar, Button } from "@mui/material";
import PropTypes from "prop-types";

export default function AssistantCard({ fullName = "", photo = "", userId = "" }) {
  return (
    <StyledAssistantCard>
      <Avatar alt={fullName} src={photo} sx={{ width: 40, height: 40 }} />
      <StyledDetailOwnerContainer>
        <StyledDetailOwner>{fullName}</StyledDetailOwner>
        <Button
          sx={{
            textTransform: "none",
            color: "var(--color-primario-violeta-08)",
            fontSize: "14px",
            fontWeight: "500",
          }}
          onClick={() => console.log(userId)}
        >
          Ver perfil
        </Button>
      </StyledDetailOwnerContainer>
    </StyledAssistantCard>
  );
}

AssistantCard.propTypes = {
  fullName: PropTypes.string,
  photo: PropTypes.string,
  userId: PropTypes.string,
};
