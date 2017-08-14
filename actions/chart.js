import * as actionTypes from '../constants/action-types'

export const setSvg = (svg) => dispatch => {
  return dispatch({
    type: actionTypes.SET_SVG,
    payload: svg
  })
}

export const setChartSize = (size) => dispatch => {
  return dispatch({
    type: actionTypes.SET_CHART_SIZE,
    payload: size
  })
}

export const setChartFunc = (func) => dispatch => {
  return dispatch({
    type: actionTypes.SET_CHART_FUNC,
    payload: func
  })
}

export const setAnimating = (name) => dispatch => {
  return dispatch({
    type: actionTypes.ANIMATING,
    payload: name
  })
}
