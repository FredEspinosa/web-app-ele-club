import { css } from '@emotion/react';

// Mixin Flex Container
export const flex = ({
  display = 'flex',
  justifyContent = 'center',
  alignItems = 'center',
  flexDirection = 'column',
  flexWrap,
  alignContent,
  gap
}) => `
  display: ${display};
  justify-content: ${justifyContent};
  align-items: ${alignItems};
  flex-direction: ${flexDirection};
  ${flexWrap ? `flex-wrap: ${flexWrap};` : ''}
  ${alignContent ? `align-content: ${alignContent};` : ''}
  ${gap ? `gap: ${gap};` : ''}
`;

// Mixin Flex Item
export const flexItem = ({
  flexGrow,
  flexShrink,
  flexBasis,
  flex,
  order,
  alignSelf
}) => `
  ${flexGrow ? `flex-grow: ${flexGrow};` : ''};
  ${flexShrink ? `flex-shrink: ${flexShrink};` : ''};
  ${flexBasis ? `${flexBasis};` : ''};
  ${flex ? `flex: ${flex};` : ''};
  ${order ? `order: ${order};` : ''};
  ${alignSelf ? `align-self: ${alignSelf};` : ''};
`;

// Mixin Grid Container
export const grid = ({
  display = 'grid',
  gridTemplateColumns,
  gridTemplateRows,
  gridTemplateAreas,
  gridAutoColumns,
  gridAutoRows,
  gridAutoFlow,
  justifyItems,
  alignItems,
  justifyContent,
  alignContent,
  gap,
  columnGap,
  rowGap
}) => `
  display: ${display};
  ${gridTemplateColumns ? `grid-template-columns: ${gridTemplateColumns};` : ''}
  ${gridTemplateRows ? `grid-template-rows: ${gridTemplateRows};` : ''}
  ${gridTemplateAreas ? `grid-template-areas: ${gridTemplateAreas};` : ''}
  ${gridAutoColumns ? `grid-auto-columns: ${gridAutoColumns};` : ''}
  ${gridAutoRows ? `grid-auto-rows: ${gridAutoRows};` : ''}
  ${gridAutoFlow ? `grid-auto-flow: ${gridAutoFlow};` : ''}
  ${justifyItems ? `justify-items: ${justifyItems};` : ''}
  ${alignItems ? `align-items: ${alignItems};` : ''}
  ${justifyContent ? `justify-content: ${justifyContent};` : ''}
  ${alignContent ? `align-content: ${alignContent};` : ''}
  ${gap ? `gap: ${gap};` : ''}
  ${columnGap ? `column-gap: ${columnGap};` : ''}
  ${rowGap ? `row-gap: ${rowGap};` : ''}
`;

// Mixin Grid Item
export const gridItem = ({
  gridColumn,
  gridRow,
  gridArea,
  justifySelf,
  alignSelf,
  gridColumnStart,
  gridColumnEnd,
  gridRowStart,
  gridRowEnd
}) => `
  ${gridColumn ? `grid-column: ${gridColumn};` : ''}
  ${gridRow ? `grid-row: ${gridRow};` : ''}
  ${gridArea ? `grid-area: ${gridArea};` : ''}
  ${justifySelf ? `justify-self: ${justifySelf};` : ''}
  ${alignSelf ? `align-self: ${alignSelf};` : ''}
  ${gridColumnStart ? `grid-column-start: ${gridColumnStart};` : ''}
  ${gridColumnEnd ? `grid-column-end: ${gridColumnEnd};` : ''}
  ${gridRowStart ? `grid-row-start: ${gridRowStart};` : ''}
  ${gridRowEnd ? `grid-row-end: ${gridRowEnd};` : ''}
`;

// Breakpoints
const breakpoints = {
  desktop3x: 1920,
  desktop1x: 1600,
  desktop: 1280,
  tabletXL: 1133,
  tabletL: 1024,
  tabletMd: 896,
  tablet: 744,  
  mobileXL: 648,
  mobile: 576,
  mobileMd: 430,
  mobileXs: 320
};

// Media queries generator
export const media = Object.keys(breakpoints).reduce((acc, label) => {
  acc[label] = (...args) => css`
    @media (max-width: ${breakpoints[label]}px) {
      ${css(...args)}
    }
  `;
  return acc;
}, {});

// Font mixin
export const fontMixin = (props) => css`
  ${props.fontFamily ? `font-family: ${props.fontFamily};` : ''}
  font-size: ${props.fontSize ? `${props.fontSize}` : '16px'};
  font-weight: ${props.fontWeight ? `${props.fontWeight};` : 'normal'};
  line-height: ${props.lineHeight ? `${props.lineHeight};` : '100%'};
  ${props.letterSpacing ? `letter-spacing: ${props.letterSpacing};` : ''}
  ${props.textAlign ? `text-align: ${props.textAlign};` : ''}
  ${props.color ? `color: ${props.color};` : ''}
  ${props.textTransform ? `text-transform: ${props.textTransform};` : ''}
  ${props.fontStyle ? `font-style: ${props.fontStyle};` : ''}
`;
