import { ListItemButton } from "@mui/material";
import { StyledServiceListImage } from "@/styles/discover/images";
import { StyledServicesListInfoContainer } from "@/styles/discover/containers";
import { DiscoverInfo, ServiceRate } from "../atoms";
import { StyledServiceListTitle } from "@/styles/discover/texts";
import { ArrowRightIcon } from "@/assets/icons";
import { useGoToService } from "@/hooks/discover/useGoToService";
import { useEffect, useState } from "react";
import placeholderImage from "../../../assets/images/perfil/blank-profile-picture.png"


export default function ServiceItem({ id, title, image, amount, rate }) {
  const goToService = useGoToService(id);
  const [imageSource, setImageSource] = useState(image);

  useEffect(() => {
    if (!image) {
      setImageSource(placeholderImage);
      return;
    }
    const imageLoader = new Image();
    imageLoader.src = image;
    imageLoader.onload = () => setImageSource(image);
    imageLoader.onerror = () => {
      setImageSource(placeholderImage);
    };

    return () => {
      imageLoader.onload = null;
      imageLoader.onerror = null;
    };
  }, [image]);

  return (
    <ListItemButton
      sx={{
        padding: "8px 16px 8px 8px",
        borderRadius: "16px",
        gap: "18px",
      }}
      alignItems="center"
      onClick={goToService}
    >
      <StyledServiceListImage alt={title} src={imageSource} />
      <StyledServicesListInfoContainer>
        <StyledServiceListTitle>{title}</StyledServiceListTitle>
        <ServiceRate>{rate}</ServiceRate>
        <DiscoverInfo icon={"money"} color="var(--color-background-negro)">
          {amount}
        </DiscoverInfo>
        <ArrowRightIcon style={{ justifySelf: "end" }} />
      </StyledServicesListInfoContainer>
    </ListItemButton>
  );
}
