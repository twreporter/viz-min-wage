import { rem } from './utils'


const fonts = {
  size: {
    xsmall: '9px',
    small: '12px',
    base: '14px',
    medium: '16px',
    large: '18px',
    xlarge: '20px',
    h1: '28px',
    h2: '18px',
    h2Large: '24px',
    sectionTitle: '24px',
    h1Desktop: '42px',
    largeNum: '70px',
  },
  weight: {
    extraLight: '100',
    light: '200',
    normal: '300',
    regular: '400',
    medium: '500',
    bold: '700',
    heavy: '900',
  },
}

const colors = {
  primaryColor: '#d87341',  // orange
  textGrey: '#303030',
  textLightGrey: '#8f8f8f',
  grey: '#d6d6d6',
  black: '#393939',
  white: '#ffffff', // 255
  red: '#fc3434',
  dark: '#08192d',
}

const breakpoints = {
  // in rem
  small: {
    min: 40,
  },
  medium: {
    min: 64,
  },
  large: {
    min: 75,
  },
}

const remDiff = 0.0625

const bps = {
  xsmall: {
    max: `${rem(breakpoints.small.min - remDiff)}`,
  },
  small: {
    min: `${rem(breakpoints.small.min)}`,
    max: `${rem(breakpoints.medium.min - remDiff)})`,
  },
  medium: {
    min: `${rem(breakpoints.medium.min)})`,
    max: `${rem(breakpoints.large.min - remDiff)}`,
  },
  large: {
    min: `${rem(breakpoints.large.min)}`,
  },
}

export {
  breakpoints,
  bps,
  colors,
  fonts,
}
