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

export {
  rem,
}
