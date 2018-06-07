import { applyMiddleware, compose, createStore } from 'redux'
import thunk from 'redux-thunk'
import { rootReducer, RootState } from './reducer'

const configureStore = () => {
  return createStore<RootState>(rootReducer, applyMiddleware(thunk))
}

export const store = configureStore()
