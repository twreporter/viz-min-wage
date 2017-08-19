import { ELEMENT_TYPE, ELEMENT_COLOR,
         STROKE_ANITIME_SHORT,
         STROKE_ANITIME_LONG } from '../constants/chart-constants'

export const chartsContent = {
  'intro-1': {
    range: {
      xRange: [1980, 2020],
      yRange: [3000, 25000],
    },
    axisUnit: {
      x: '年份',
      y: '月薪(元)',
    },
    axisSetting: {
      gridTick: 5,
      axisXTick: 6,
      axisYTick: 5,
      skewWheMobile: false,
    },
    elements: [
      {
        type: ELEMENT_TYPE.line,
        dataName: 'twMinWageMonthly',
        color: ELEMENT_COLOR.green,
        legendText: '台灣基本工資變化',
        animate: true,
        delay: 0,
        animateTime: STROKE_ANITIME_LONG,
      },
    ],
  },
  'intro-2': {
    range: {
      xRange: [1992, 2020],
      yRange: [20, 220],
    },
    axisUnit: {
      x: '年份',
      y: '時薪(元)',
    },
    axisSetting: {
      gridTick: 5,
      axisXTick: 6,
      axisYTick: 5,
      skewWheMobile: true,
    },
    elements: [
      {
        type: ELEMENT_TYPE.line,
        dataName: 'twMinWageHourly',
        color: ELEMENT_COLOR.green,
        legendText: '台灣最低時薪',
        animate: true,
        delay: 0,
        animateTime: STROKE_ANITIME_SHORT,
      },
      {
        type: ELEMENT_TYPE.line,
        dataName: 'krMinWageHourly',
        color: ELEMENT_COLOR.orange,
        legendText: '韓國最低時薪',
        animate: true,
        delay: STROKE_ANITIME_SHORT,
        animateTime: STROKE_ANITIME_LONG,
      },
    ],
  },
  'intro-3': {
    range: {
      xRange: [1990, 2018],
      yRange: [-5, 15],
    },
    axisUnit: {
      x: '年份',
      y: 'GDP(%)',
    },
    axisSetting: {
      gridTick: 5,
      axisXTick: 6,
      axisYTick: 5,
      skewWheMobile: true,
    },
    elements: [
      {
        type: ELEMENT_TYPE.line,
        dataName: 'twYOY',
        color: ELEMENT_COLOR.green,
        legendText: '台灣經濟成長率',
        animate: true,
        delay: 0,
        animateTime: STROKE_ANITIME_SHORT,
      },
      {
        type: ELEMENT_TYPE.line,
        dataName: 'krYOY',
        color: ELEMENT_COLOR.orange,
        legendText: '韓國經濟成長率',
        animate: true,
        delay: STROKE_ANITIME_SHORT,
        animateTime: STROKE_ANITIME_LONG,
      },
    ],
  },
  'intro-4': {
    range: {
      xRange: [1990, 2018],
      yRange: [-5, 13],
    },
    axisUnit: {
      x: '年份',
      y: 'CPI年增率',
    },
    axisSetting: {
      gridTick: 5,
      axisXTick: 6,
      axisYTick: 5,
      skewWheMobile: true,
    },
    elements: [
      {
        type: ELEMENT_TYPE.line,
        dataName: 'twCPI',
        color: ELEMENT_COLOR.green,
        legendText: '台灣CPI年增率',
        animate: true,
        delay: 0,
        animateTime: STROKE_ANITIME_SHORT,
      },
      {
        type: ELEMENT_TYPE.line,
        dataName: 'krCPI',
        color: ELEMENT_COLOR.orange,
        legendText: '韓國CPI年增率',
        animate: true,
        delay: STROKE_ANITIME_SHORT,
        animateTime: STROKE_ANITIME_LONG,
      },
    ],
  },
  'intro-5': {
    range: {
      xRange: [1993, 2018],
      yRange: [10000, 32000],
    },
    axisUnit: {
      x: '年份',
      y: '月薪(元)',
    },
    axisSetting: {
      gridTick: 5,
      axisXTick: 6,
      axisYTick: 5,
      skewWheMobile: true,
    },
    elements: [
      {
        type: ELEMENT_TYPE.line,
        dataName: 'twMinWageMonthlyRecently',
        color: ELEMENT_COLOR.green,
        legendText: '台灣基本工資',
        animate: false,
        delay: 0,
        animateTime: STROKE_ANITIME_SHORT,
      },
      {
        type: ELEMENT_TYPE.line,
        dataName: 'MOLFormula',
        color: ELEMENT_COLOR.orange,
        legendText: '勞動部公式',
        animate: true,
        delay: STROKE_ANITIME_SHORT,
        animateTime: STROKE_ANITIME_LONG,
      },
    ],
  },
  'intro-6': {
    range: {
      xRange: [1995, 2018],
      yRange: [10000, 32000],
    },
    axisUnit: {
      x: '年份',
      y: '月薪(元)',
    },
    axisSetting: {
      gridTick: 5,
      axisXTick: 6,
      axisYTick: 5,
      skewWheMobile: true,
    },
    elements: [
      {
        type: ELEMENT_TYPE.line,
        dataName: 'twMinWageMonthlyRecently',
        color: ELEMENT_COLOR.green,
        legendText: '台灣基本工資',
        animate: false,
        delay: 0,
        animateTime: STROKE_ANITIME_LONG,
      },
      {
        type: ELEMENT_TYPE.line,
        dataName: 'ILOFormula',
        color: ELEMENT_COLOR.orange,
        legendText: 'ILO公式',
        animate: true,
        delay: 0,
        animateTime: STROKE_ANITIME_LONG,
      },
    ],
  },
  'intro-7': {
    range: {
      xRange: [1994, 2022],
      yRange: [13000, 25000],
    },
    axisUnit: {
      x: '年份',
      y: '月薪(元)',
    },
    axisSetting: {
      gridTick: 5,
      axisXTick: 6,
      axisYTick: 5,
      skewWheMobile: true,
    },
    elements: [
      {
        type: ELEMENT_TYPE.line,
        dataName: 'twMinWageMonthlyRecently',
        color: ELEMENT_COLOR.green,
        legendText: '台灣基本工資變化',
        animate: false,
        delay: 0,
        animateTime: STROKE_ANITIME_LONG,
      },
      {
        type: ELEMENT_TYPE.marker,
        pos: { start: 1997, end: 2006 },
      },
      {
        type: ELEMENT_TYPE.marker,
        pos: { start: 2007, end: 2010 },
      },
    ],
  },
  'intro-8': {
    range: {
      xRange: [1992, 2020],
      yRange: [20, 220],
    },
    axisUnit: {
      x: '年份',
      y: '時薪(元)',
    },
    axisSetting: {
      gridTick: 5,
      axisXTick: 6,
      axisYTick: 5,
      skewWheMobile: true,
    },
    elements: [
      {
        type: ELEMENT_TYPE.line,
        dataName: 'twMinWageHourly',
        color: ELEMENT_COLOR.green,
        legendText: '台灣最低時薪',
        animate: true,
        delay: 0,
        animateTime: STROKE_ANITIME_SHORT,
      },
      {
        type: ELEMENT_TYPE.line,
        dataName: 'krMinWageHourly',
        color: ELEMENT_COLOR.orange,
        legendText: '韓國最低時薪',
        animate: true,
        delay: STROKE_ANITIME_SHORT,
        animateTime: STROKE_ANITIME_LONG,
      },
    ],
  },
}
