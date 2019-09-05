import { combineReducers } from 'redux'
import { authReducer } from './authReducer'
import { jobReducer } from './jobReducer'

export const rootReducer = combineReducers({
    auth: authReducer,
    jobs: jobReducer
})