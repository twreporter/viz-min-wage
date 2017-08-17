import * as types from '../constants/action-types'
import { appConfig } from '../config'
import { slidesCnt } from '../constants/slidesContent'

import { assign } from 'lodash'

const _ = {
  assign,
}

const initState = {
  sectionIndex: 0,
  isMobile: false,
  windowWidth: 600,
  windowHeight: 600,
}

export default function (state = initState, action) {
  switch (action.type) {
    case types.SET_MOBILE: {
      return _.assign({}, state, {
        isMobile: true,
        windowWidth: action.width,
        windowHeight: action.height,
      })
    }
    case types.SET_NON_MOBILE: {
      return _.assign({}, state, {
        isMobile: false,
        windowWidth: action.width,
        windowHeight: action.height,
      })
    }
    case types.SET_SECTION_INDEX: {
      const { index } = action
      if (index >= 0 && index < slidesCnt) {
        return _.assign({}, state, {
          sectionIndex: index,
        })
      }
      return state
    }
    default:
      return state
  }
}
