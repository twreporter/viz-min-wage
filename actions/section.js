import * as actionTypes from '../constants/action-types'
import { breakpoints } from '../styles/common-variables'

export const detectWindowSize = () => (dispatch) => {
  const w = window
  const d = document
  const documentElement = d.documentElement
  const body = d.getElementsByTagName('body')[0]

  const width = w.innerWidth || documentElement.clientWidth || body.clientWidth
  const height = w.innerHeight || documentElement.clientHeight || body.clientHeight
  const mobileWidth = breakpoints.small.min * 16

  if (width < mobileWidth) {
    return dispatch({ type: actionTypes.SET_MOBILE, width, height })
  }

  return dispatch({ type: actionTypes.SET_NON_MOBILE, width, height })
}

export const setSectionIndex = index => dispatch => dispatch({ type: actionTypes.SET_SECTION_INDEX, index })
