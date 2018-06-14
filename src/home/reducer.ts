import { Action, combineReducers } from 'redux'
import { reducerWithInitialState } from 'typescript-fsa-reducers'
import { actions, IPayload } from './actions'

export interface State {
  equation: string
  prevResult: string
  result: string
  error: string
}

const initialState: State = {
  equation: '',
  prevResult: '',
  result: '',
  error: ''
}

/*
 * updateExpressionAndResultHandler action handler
 */
const updateExpressionAndResultHandler = (state: State, payload: IPayload): State => ({
  ...state,
  equation: payload.expression,
  prevResult: payload.prevResult,
  result: payload.result,
  error: payload.error
})

export const reducer = reducerWithInitialState(initialState)
  .case(actions.updateExpressionAndResult, updateExpressionAndResultHandler)
  .build()
