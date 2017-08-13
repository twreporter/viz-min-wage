import { createStore, applyMiddleware } from 'redux'
import { composeWithDevTools } from 'redux-devtools-extension'
import thunkMiddleware from 'redux-thunk'

const exampleInitialState = {
  lastUpdate: 0,
  light: false,
  count: 0,
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

export const actionTypes = {
  ADD: 'ADD',
  TICK: 'TICK',
  SET_SVG: 'SET_SVG',
  SET_CHART_SIZE: 'SET_CHART_SIZE',
  SET_CHART_FUNC: 'SET_CHART_FUNC',
  ANIMATING: 'ANIMATING'
}

// REDUCERS
export const reducer = (state = exampleInitialState, action) => {
  switch (action.type) {
    case actionTypes.TICK:
      return Object.assign({}, state, {
        lastUpdate: action.ts,
        light: !!action.light
      })

    case actionTypes.ADD:
      return Object.assign({}, state, {
        count: state.count + 1
      })

    case actionTypes.SET_SVG:
      return Object.assign({}, state, {
        svg: action.payload
      })

    case actionTypes.SET_CHART_SIZE:
      let size = Object.assign({}, state.chartSize, action.payload)
      return Object.assign({}, state, {
        chartSize: size
      })

    case actionTypes.SET_CHART_FUNC:
      let func = Object.assign({}, state.chartFunc, action.payload)
      return Object.assign({}, state, {
        chartFunc: func
      })

    case actionTypes.ANIMATING:
      return Object.assign({}, state, {
        animating: action.payload
      })

    default: return state
  }
}

// ACTIONS
export const setSvg = (svg) => dispatch => {
  return dispatch({ type: actionTypes.SET_SVG, payload: svg})
}

export const setChartSize = (size) => dispatch => {
  return dispatch({ type: actionTypes.SET_CHART_SIZE, payload: size })
}

export const setChartFunc = (func) => dispatch => {
  return dispatch({ type: actionTypes.SET_CHART_FUNC, payload: func })
}

export const setAnimating = (name) => dispatch => {
  return dispatch({ type: actionTypes.ANIMATING, payload: name })
}

export const serverRenderClock = (isServer) => dispatch => {
  return dispatch({ type: actionTypes.TICK, light: !isServer, ts: Date.now() })
}

export const startClock = () => dispatch => {
  return setInterval(() => dispatch({ type: actionTypes.TICK, light: true, ts: Date.now() }), 800)
}

export const addCount = () => dispatch => {
  return dispatch({ type: actionTypes.ADD })
}

export const initStore = (initialState = exampleInitialState) => {
  return createStore(reducer, initialState, composeWithDevTools(applyMiddleware(thunkMiddleware)))
}
