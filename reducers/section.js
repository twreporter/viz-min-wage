import * as types from '../constants/action-types'

import { assign } from 'lodash'

const _ = {
  assign,
}

const initState = {
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
    default:
      return state
  }
}
