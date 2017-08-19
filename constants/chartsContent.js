import { ELEMENT_TYPE } from '../constants/chart-constants'

export const chartsContent = {
  'intro-1': {
    range: {
      xRange: [1978, 2020],
      yRange: [3000, 25000],
    },
    axisUnit: {
      x: '年份',
      y: '月薪(元)',
    },
    axisSetting: {
      gridTick: 5,
      axisYTick: 5,
      skewWheMobile: false,
    },
    elements: [
      {
        type: ELEMENT_TYPE.line,
        dataName: 'twMinWage',
        color: '#275623',
        legendText: '台灣基本工資變化',
        animate: true,
      },
    ],
  },
  'intro-2': {
    range: {
      xRange: [0, 10],
      yRange: [0, 100],
    },
    axisUnit: {
      x: '年份',
      y: '月薪(元)',
    },
    axisSetting: {
      gridTick: 5,
      axisYTick: 5,
      skewWheMobile: false,
    },
    elements: [
      {
        type: ELEMENT_TYPE.line,
        dataName: 'testdata2',
        color: '#275623',
        legendText: '資料二',
        animate: false,
      },
      {
        type: ELEMENT_TYPE.line,
        dataName: 'testdata',
        color: '#d87341',
        legendText: '資料零',
        animate: true,
      },
    ],
  },
  'intro-3': {
    range: {
      xRange: [0, 10],
      yRange: [0, 200],
    },
    axisUnit: {
      x: '年份',
      y: '年薪(萬元)',
    },
    axisSetting: {
      gridTick: 5,
      axisYTick: 5,
      skewWheMobile: false,
    },
    elements: [
      {
        type: ELEMENT_TYPE.line,
        dataName: 'testdata1',
        color: '#275623',
        legendText: '資料一',
        animate: true,
      },
      {
        type: ELEMENT_TYPE.marker,
        pos: { start: 3, end: 7 },
      },
    ],
  },
}
