import PropTypes from 'prop-types';
import { StyledButton } from '@/styles/discover/buttons'

export default function Button({
  bgColorType,
  textColorType,
  variant,
  shape,
  padding,
  type = 'button',
  onClick = () => {},
  icon = null,
  fontSize,
  size = 'fit',
  children
}) {
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
    >
      {icon}
      {children}
    </StyledButton>
  )
}

Button.propTypes = {
  bgColorType: PropTypes.string,
  textColorType: PropTypes.string,
  variant: PropTypes.oneOf(['solid', 'outlined']),
  shape: PropTypes.oneOf(['normal', 'pill']),
  padding: PropTypes.string,
  type: PropTypes.oneOf(['button', 'submit', 'reset']),
  onClick: PropTypes.func,
  icon: PropTypes.node,
  children: PropTypes.node.isRequired,
  fontSize: PropTypes.string
};