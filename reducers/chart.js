import * as types from '../constants/action-types'

import { assign } from 'lodash'

const _ = {
  assign,
}

const initState = {
  svg: undefined,
  animating: undefined,
  chartSize: {
    width: undefined,
    height: undefined
  },
  chartFunc: {
    xScale: undefined,
    yScale: undefined,
    line: undefined
  }
}

export default function (state = initState, action) {
  switch (action.type) {
    case types.SET_SVG: {
      return _.assign({}, state, {
        svg: action.payload
      })
    }
    case types.SET_CHART_SIZE: {
       let size = _.assign({}, state.chartSize, action.payload)
       return Object.assign({}, state, {
         chartSize: size
       })
    }
    case types.SET_CHART_FUNC: {
      let func = _.assign({}, state.chartFunc, action.payload)
      return _.assign({}, state, {
        chartFunc: func
      })
    }
    case types.ANIMATING: {
      return _.assign({}, state, {
        animating: action.payload
      })
    }
    default:
      return state
  }
}
