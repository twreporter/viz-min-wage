import { ELEMENT_TYPE } from '../constants/chart-constants'

export const chartsContent = {
  'intro-1': {
    range: {
      xRange: [0, 10],
      yRange: [0, 100],
    },
    tick: 5,
    elements: [
      {
        type: ELEMENT_TYPE.line,
        dataName: 'basedata',
        color: 'black',
        legendText: '基準',
        animate: false,
      },
    ],
  },
  'intro-2': {
    range: {
      xRange: [0, 10],
      yRange: [0, 100],
    },
    tick: 5,
    elements: [
      {
        type: ELEMENT_TYPE.line,
        dataName: 'testdata2',
        color: 'orange',
        legendText: '資料二',
        animate: true,
      },
      {
        type: ELEMENT_TYPE.line,
        dataName: 'testdata',
        color: 'green',
        legendText: '資料零',
        animate: false,
      },
    ],
  },
  'intro-3': {
    range: {
      xRange: [0, 10],
      yRange: [0, 200],
    },
    tick: 5,
    elements: [
      {
        type: ELEMENT_TYPE.marker,
        pos: { start: 3, end: 7 },
      },
      {
        type: ELEMENT_TYPE.line,
        dataName: 'testdata1',
        color: 'red',
        legendText: '資料一',
        animate: true,
      },
    ],
  },
}
