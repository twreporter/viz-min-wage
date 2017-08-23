import * as actionTypes from '../constants/action-types'
import { breakpoints } from '../styles/common-variables'
import { appConfig } from '../config'

let readSections = []

export const detectWindowSize = () => (dispatch) => {
  const w = window
  const d = document
  const documentElement = d.documentElement
  const body = d.getElementsByTagName('body')[0]

  const width = w.innerWidth || documentElement.clientWidth || body.clientWidth
  let height = w.innerHeight || documentElement.clientHeight || body.clientHeight
  const mobileWidth = breakpoints.small.min * 16

  if (width < mobileWidth) {
    // on mobile => set height according to the size of body
    height = body.clientHeight || documentElement.clientHeight || w.innerHeight
    return dispatch({ type: actionTypes.SET_MOBILE, width, height })
  }

  return dispatch({ type: actionTypes.SET_NON_MOBILE, width, height })
}

export const setSectionIndex = index => (dispatch) => {
  if (!readSections.includes(index)) {
    // reading the section fot the first time
    readSections.push(index)
    if (ga) {
      ga('send', {
        hitType: 'event',
        eventCategory: `${appConfig.projectName}-Viewing`,
        eventAction: 'Section',
        eventLabel: `section-${index}`,
      })
    }
  }
  return dispatch({ type: actionTypes.SET_SECTION_INDEX, index })
}
