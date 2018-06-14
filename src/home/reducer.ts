import { Action, combineReducers } from 'redux'
import { reducerWithInitialState } from 'typescript-fsa-reducers'
import { actions, IPayload } from './actions'

export interface State {
  equation: string
  prevResult: string
  result: string
}

const initialState: State = {
  equation: '',
  prevResult: '',
  result: ''
}

/*
 * updateExpressionAndResultHandler action handler
 */
const updateExpressionAndResultHandler = (state: State, payload: IPayload): State => ({
  ...state,
  equation: payload.expression,
  prevResult: payload.prevResult,
  result: payload.result
})

export const reducer = reducerWithInitialState(initialState)
  .case(actions.updateExpressionAndResult, updateExpressionAndResultHandler)
  .build()
