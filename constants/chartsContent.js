import { ELEMENT_TYPE } from '../constants/chart-constants'

export const chartsContent = {
  'intro-1': {
    range: {
      xRange: [0, 10],
      yRange: [0, 100],
    },
    tick: 5,
    elements: [
      { type: ELEMENT_TYPE.line, dataName: 'basedata', animate: false },
    ],
  },
  'intro-2': {
    range: {
      xRange: [0, 10],
      yRange: [0, 100],
    },
    tick: 5,
    elements: [
      { type: ELEMENT_TYPE.line, dataName: 'testdata2', animate: true },
    ],
  },
  'intro-3': {
    range: {
      xRange: [0, 10],
      yRange: [0, 200],
    },
    tick: 5,
    elements: [
      { type: ELEMENT_TYPE.marker, pos: { start: 3, end: 7 } },
      { type: ELEMENT_TYPE.line, dataName: 'testdata1', animate: true },
    ],
  },
}
