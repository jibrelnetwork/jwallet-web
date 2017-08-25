import { combineReducers } from 'redux'
import lists from './listReducer'
import pockets from './pocketReducer'

// Combines all reducers to a single reducer function
const rootReducer = combineReducers({
  lists,
  pockets,
})

export default rootReducer
