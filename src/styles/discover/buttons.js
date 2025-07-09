import styled from "@emotion/styled";
import { flex, fontMixin, grid } from "../globals/mixins";

export const StyledCategoryButton = styled.button`
  ${flex({
    flexDirection: "row",
    gap: "6px",
  })}
  padding: 16px 10px;
  border-radius: 16px;
  border: solid 2px var(${({ $active }) => ($active ? "--color-primario-violeta-08" : "--color-background-blanco")});
  color: var(${({ $active }) => ($active ? "--color-primario-violeta-08" : "--color-neutral-gris-01")});
  fill: var(${({ $active }) => ($active ? "--color-primario-violeta-08" : "--color-neutral-gris-01")});
  background-color: var(--color-background-blanco);
  font-weight: 500;
  box-shadow: 0px 4px 11px 0px rgba(151, 151, 151, 0.25);
  font-size: 14px;
`;

export const StyledDetailsButton = styled.button`
  ${fontMixin({
    fontWeight: "500",
    fontSize: "14px",
  })}
  ${flex({
    flexDirection: "row",
    gap: "8px",
  })}
  color: var(--color-primario-violeta-08);
  background-color: transparent;
  border: none;
  padding: 0;
`;

const availableSizeButton = {
  fit: "fit-content",
  full: "100%",
};

const getButtonSize = (size) => {
  if (!Object.keys(availableSizeButton).includes(size)) return size;
  return availableSizeButton[size];
};

export const StyledButton = styled.button`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  column-gap: 13px;
  line-height: normal;
  font-size: ${({ $fontSize }) => ($fontSize ? $fontSize : "16px")};
  background-color: ${({ $bgColorType }) => ($bgColorType ? `var(--color-${$bgColorType})` : "var(--color-primario-violeta-08)")};
  color: ${({ $textColorType }) => ($textColorType ? `var(--color-${$textColorType})` : "var(--color-background-blanco)")};

  border-radius: ${({ $shape }) => ($shape === "pill" ? "3.40282e38px" : "16px")};
  border: 1px solid ${({ $bgColorType }) => ($bgColorType ? `var(--color-${$bgColorType})` : "var(--color-primario-violeta-08)")};

  padding: ${({ $padding }) => $padding ?? "13px 24px"};
  ${({ $variant, $bgColorType, $textColorType }) =>
    $variant === "outlined" &&
    `
      background-color: ${$textColorType ? `var(--color-${$textColorType})` : "transparent"};
      border: 1px solid ${$bgColorType ? `var(--color-${$bgColorType})` : "var(--color-primario-violeta-08)"};
      color: ${$bgColorType ? `var(--color-${$bgColorType})` : "var(--color-primario-violeta-08)"};
    `}
  width: ${({ $size }) => getButtonSize($size)};

  ${({ $isFloating, $top, $right, $bottom, $left }) =>
    $isFloating &&
    `
      position: fixed;
      z-index: 1050;
      ${$top && `top: ${$top};`}
      ${$right && `right: ${$right};`}
      ${$bottom && `bottom: ${$bottom};`}
      ${$left && `left: ${$left};`}
    `}
`;

export const StyledBackButton = styled.button`
  ${grid({})}
  background: transparent;
  border: none;
  position: absolute;
  left: 24px;
  top: 50%;
  transform: translateY(-50%);
  padding: 0;
  margin: 0;
`;
