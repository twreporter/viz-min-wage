const fonts = {
  size: {
    xsmall: '9px',
    small: '12px',
    base: '14px',
    medium: '16px',
    large: '18px',
    xlarge: '20px',
    h1: '28px',
    h2: '20px',
    sectionTitle: '24px',
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
  primaryColor: '#59d1c6',  // green
  textGrey: '#4a4a4a',
  black: '#393939',
  white: '#ffffff', // 255
}

const breakpoints = {
  small: {
    min: 640,
  },
  medium: {
    min: 1024,
  },
  large: {
    min: 1441,
  },
}

const bps = {
  xsmall: {
    max: `${breakpoints.small.min - 1}px`,
  },
  small: {
    min: `${breakpoints.small.min}px`,
    max: `${breakpoints.medium.min - 1}px`,
  },
  medium: {
    min: `${breakpoints.medium.min}px`,
    max: `${breakpoints.large.min - 1}px`,
  },
  large: {
    min: `${breakpoints.large.min}px`,
  },
}

export {
  bps,
  colors,
  fonts,
}
