import { combineReducers } from 'redux'

import user from './user'
import home from './home'

const reducer = combineReducers({
  user,
  home
})

export default reducer
