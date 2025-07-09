import PropTypes from "prop-types";
import { StyledButton } from "@/styles/discover/buttons";

export default function Button({
  bgColorType,
  textColorType,
  variant,
  shape,
  padding,
  type = "button",
  onClick = () => {},
  icon = null,
  fontSize,
  size = "fit",
  children,
  isFloating = false,
  top,
  right,
  bottom,
  left,
}) {
  const floatingProps = {};

  // Lógica para el posicionamiento flotante
  if (isFloating) {
    floatingProps.$isFloating = true;

    // Si es flotante pero no se especifica ninguna posición,
    // se coloca abajo a la derecha por defecto.
    if (!top && !right && !bottom && !left) {
      floatingProps.$right = "24px";
      floatingProps.$bottom = "124px";
    } else {
      floatingProps.$top = top || '';
      floatingProps.$right = right || '';
      floatingProps.$bottom = bottom || '';
      floatingProps.$left = left || '';
    }
  }
  return (
    <StyledButton
      type={type}
      $bgColorType={bgColorType}
      $textColorType={textColorType}
      $variant={variant}
      $shape={shape}
      $padding={padding}
      $fontSize={fontSize}
      $size={size}
      onClick={onClick}
      {...floatingProps}
    >
      {icon}
      {children}
    </StyledButton>
  );
}

Button.propTypes = {
  bgColorType: PropTypes.string,
  textColorType: PropTypes.string,
  variant: PropTypes.oneOf(["solid", "outlined"]),
  shape: PropTypes.oneOf(["normal", "pill"]),
  padding: PropTypes.string,
  type: PropTypes.oneOf(["button", "submit", "reset"]),
  onClick: PropTypes.func,
  icon: PropTypes.node,
  children: PropTypes.node.isRequired,
  fontSize: PropTypes.string,
  size: PropTypes.string,
  isFloating: PropTypes.bool,
  top: PropTypes.string,
  right: PropTypes.string,
  bottom: PropTypes.string,
  left: PropTypes.string,
};
