import * as types from '../constants/action-types'

import { assign } from 'lodash'

const _ = {
  assign,
}

const initState = {
  isMobile: false,
}

export default function (state = initState, action) {
  switch (action.type) {
    case types.SET_MOBILE: {
      return _.assign({}, state, {
        isMobile: true,
      })
    }
    case types.SET_NON_MOBILE: {
      return _.assign({}, state, {
        isMobile: false,
      })
    }
    default:
      return state
  }
}
