import { combineReducers } from 'redux'
import { reducer as homeReducer, State as HomeState } from './home'

export interface RootState {
  home: HomeState
}

export const rootReducer = combineReducers<RootState>({
  home: homeReducer
})
