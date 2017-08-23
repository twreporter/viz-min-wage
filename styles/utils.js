import { assign, reduce } from 'lodash'

import { bps } from './common-variables'
import { css } from 'styled-components'

const _ = {
  assign,
  reduce,
}

const rem = value => `${value}rem`

export const mq = (mqSettingsObj) => {
  const mqString = _.reduce(mqSettingsObj, (result, value, key) => {
    switch (key) {
      case 'mediaType':
        return `${value} ${result}`
      default:
        return `${result} and (${key}: ${value})`
    }
  })
  return (...cssCode) => css`
    @media ${mqString} {
      ${css(...cssCode)}
    }
  `
}

export const screen = {
  iphone5: (...cssCode) => mq({
    mediaType: 'only screen',
    'max-width': bps.iphone5.max,
  })(...cssCode),
  mobile: (...cssCode) => mq({
    mediaType: 'only screen',
    'max-width': bps.xsmall.max,
  })(...cssCode),
  largeThanMobile: (...cssCode) => mq({
    mediaType: 'only screen',
    'min-width': bps.small.min,
  })(...cssCode),
  tablet: (...cssCode) => mq({
    mediaType: 'only screen',
    'min-width': bps.small.min,
    'max-width': bps.small.max,
  })(...cssCode),
  desktop: (...cssCode) => mq({
    mediaType: 'only screen',
    'min-width': bps.medium.min,
  })(...cssCode),
  hd: (...cssCode) => mq({
    mediaType: 'only screen',
    'min-width': bps.large.min,
  })(...cssCode),
}

const truncateText = (lineHeight, maxLines, bgColor) => `
  /* hide text if it more than N lines  */
  overflow: hidden;
  /* for set '...' in absolute position */
  position: relative;
  /* use this value to count block height */
  line-height: ${lineHeight};
  /* max-height = line-height (1.5) * lines max number (3) */
  max-height: (${lineHeight} * ${maxLines}) * 1em;
  /* fix problem when last visible word doesn't adjoin right side  */
  text-align: justify;
  /* place for '…' */
  margin-right: -1em;
  padding-right: 1em;
  &::before {
    /* points in the end */
    content: '…';
    /* absolute position */
    position: absolute;
    /* set position to right bottom corner of block */
    right: 0;
    bottom: 0;
  }
  /* hide … if we have text, which is less than or equal to max lines */
  &::after {
    /* points in the end */
    content: '';
    /* absolute position */
    position: absolute;
    /* set position to right bottom corner of text */
    right: 0;
    /* set width and height */
    width: 1em;
    height: 1em;
    margin-top: 0.2em;
    /* bg color = bg color under block */
    background-color: ${bgColor}
  }
`

export {
  rem,
  truncateText,
}
