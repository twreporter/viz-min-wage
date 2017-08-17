import { ELEMENT_TYPE } from '../constants/chart-types'

export const scripts = {
  HourlyRate: {
    xRange: [0, 10],
    yRange: [0, 100],
    sectionIndex0: [
      { type: ELEMENT_TYPE.line, dataName: 'basedata', animate: false },
      { type: ELEMENT_TYPE.line, dataName: 'testdata1', animate: true },
    ],
    sectionIndex2: [
      { type: ELEMENT_TYPE.line, dataName: 'basedata', animate: false },
      { type: ELEMENT_TYPE.line, dataName: 'testdata2', animate: true },
    ],
  },
  MonthlyRate: {
    xRange: [0, 10],
    yRange: [0, 200],
    sectionIndex1: [
      { type: ELEMENT_TYPE.line, dataName: 'testdata1', animate: false },
      { type: ELEMENT_TYPE.line, dataName: 'testdata2', animate: true },
      { type: ELEMENT_TYPE.marker, pos: { start: 3, end: 7 } },
    ],
  },
}
