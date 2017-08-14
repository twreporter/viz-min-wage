import { combineReducers } from 'redux'
import section from './section'
import chart from './chart'

const rootReducer = combineReducers({
  section,
  chart,
})

export default rootReducer
