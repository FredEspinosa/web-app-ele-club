import styled from "@emotion/styled";
import { fontMixin } from "../globals/mixins";

export const StyledDiscoverRegularText = styled.p`
  ${({ $color }) =>
    fontMixin({
      fontSize: "12px",
      color: $color ?? "var(--color-background-negro)",
    })}
  opacity: ${({ $opacity }) => $opacity ?? "1"};
  font-weight: 400;
  text-align: start;
`;

export const StyledDetailsTitle = styled.h1`
  font-weight: 800;
  font-size: 14px;
  line-height: 100%;
  text-align: center;
  color: var(--color-titulo-pagina);
`;

export const StyledSectionTitle = styled.h5`
  font-weight: 600;
  font-size: 18px;
  line-height: 100%;
  color: var(--color-titulo-pagina);
  margin: 0;
`;

export const StyledServiceRate = styled.p`
  font-weight: 400;
  font-size: 12px;
  vertical-align: middle;
  line-height: normal;
  color: var(--color-titulo-pagina);
  margin: 0;
  opacity: ${({ $opacity }) => $opacity ?? "1"};
`;

export const StyledServiceListTitle = styled.h5`
  font-weight: 700;
  font-size: 16px;
  line-height: normal;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  display: block;
  max-width: 100%;
  margin: 0;
`;

export const TitleContainer = styled.div`
  display: flex;
  justify-content: space-between;
`;

export const StyledDetailTitle = styled.p`
  font-weight: 700;
  font-size: ${({ $size }) => ($size ? `${$size}px` : "24px")};
  line-height: 150%;
  vertical-align: middle;
  height: 17px;
  display: flex;
  align-items: center;
`;

export const StyledDetailOwner = styled.p`
  font-weight: 700;
  font-size: 14px;
  line-height: 150%;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  display: block;
  margin: 0;
`;

export const StyledDetailOwnerLabel = styled.p`
  font-weight: 400;
  font-size: 12px;
  vertical-align: middle;
  color: var(--color-neutral-gris-02);
`;

export const StyledAboutText = styled.p`
  font-weight: 400;
  font-size: 14px;
  vertical-align: middle;
  color: var(--color-neutral-gris-02);
  margin-top: 16px
`;

export const StyledDetailsDistance = styled.p`
  font-weight: 400;
  font-size: 14px;
  text-align: right;
  vertical-align: middle;
  line-height: normal;
  color: var(--color-neutral-gris-02);
`;

export const StyledNoReviewsContent = styled.div`
  background: rgba(255, 248, 237, 1);
  width: 341px;
  height: 258px;
  opacity: 1;
  gap: 16px;
  border-radius: 16px;
  padding-top: 24px;
  padding-right: 16px;
  padding-bottom: 24px;
  padding-left: 16px;
  border-width: 1px;
  border-style: dashed;
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  border-color: var(--color-primario-oro);
  margin: auto;
  align-items: stretch;
`;

export const StyleIconNoReview = styled.div `
  width: 68px;
  height: 68px;
  angle: 0 deg;
  opacity: 1;
  gap: 10px;
  border-radius: 34px;
  padding: 15px;
  background: rgba(255, 255, 255, 1);
  display:flex;
  justify-content: center;
  align-items: center;
`;

export const StyleTitleNoReview = styled.p `
  display: flex;
  justify-content: center;
  font-weight: 500;
  font-style: Medium;
  text-align: center;
  vertical-align: middle;
  font-size: 17px;
  justify-content: center;
  flex-wrap: wrap;
`; 

export const StyleSubTitleNoReview = styled.p `
  font-weight: 400;
  font-style: Regular;
  font-size: 12px;
  leading-trim: CAP_HEIGHT;
  line-height: 150%;
  letter-spacing: 0%;
  text-align: center;
  vertical-align: middle;

`;
