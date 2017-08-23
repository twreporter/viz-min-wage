import { rem } from './utils'


const fonts = {
  size: {
    xsmall: '10px',
    small: '12px',
    base: '14px',
    medium: '16px',
    large: '19px',
    xlarge: '20px',
    h1: '28px',
    subTitle: '20px',
    h2: '18px',
    h2Large: '26px',
    subTitleLarge: '30px',
    sectionTitle: '24px',
    h1Desktop: '45px',
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
  lightPrimary: 'rgba(216, 115, 65, 0.25)',
  textGrey: '#303030',
  textLightGrey: '#8f8f8f',
  textLighter: '#b5b5b5',
  textMidGrey: '#4d4d4d',
  grey: '#d6d6d6',
  black: '#393939',
  bgColor: '#efefef',
  green: '#275623',
  lightGreen: 'rgba(39, 86, 35, 0.3)',
  white: '#ffffff', // 255
  red: '#fc3434',
  dark: '#08192d',
}

const breakpoints = {
  // in rem
  iphone5: {
    min: 23,
  },
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
  iphone5: {
    max: `${rem(breakpoints.iphone5.min - remDiff)}`,
  },
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

const scaleInAnimation = {
  show: {
    opacity: 1,
    transform: 'scale(1)',
  },
  hide: {
    opacity: 0,
    transform: 'scale(0.8)',
  },
  transition: 'all 0.45s ease-in-out',
}

export {
  breakpoints,
  bps,
  colors,
  fonts,
  scaleInAnimation,
}
