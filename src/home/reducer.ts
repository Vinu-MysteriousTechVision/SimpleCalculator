import { Action, combineReducers } from 'redux'
import { reducerWithInitialState } from 'typescript-fsa-reducers'
import { actions, IPayload, ICalcControllerData } from './actions'

export interface State {
  equation: string
  processingData: [any]
  result: string
  firstOperand: number
  operator: string
  secondOperand: number
  res: number
  aryResults: number[]
  aryOperators: any[]
  arySecondOperands: number[]
  digit: string
}

const initialState: State = {
  equation: '',
  result: '',
  processingData: [0],
  firstOperand: 0,
  operator: '',
  secondOperand: 0,
  res: 0,
  aryResults: [],
  aryOperators: [],
  arySecondOperands: [],
  digit: ''
}

/*
 * updateExpressionAndResultHandler action handler
 */
const updateExpressionAndResultHandler = (state: State, payload: IPayload): State => ({
  ...state,
  equation: payload.expression,
  result: payload.result
})

const updateCalcCondrollerDataHandler = (state: State, payload: ICalcControllerData): State => {
  return ({
  ...state,
  firstOperand: payload.firstOperand,
  operator: payload.operator,
  secondOperand: payload.secondOperand,
  res: payload.res,
  aryResults: payload.aryResults,
  aryOperators: payload.aryOperators,
  arySecondOperands: payload.arySecondOperands,
  digit: payload.digit
})}

export const reducer = reducerWithInitialState(initialState)
  .case(actions.updateExpressionAndResult, updateExpressionAndResultHandler)
  .case(actions.updateCalcCondrollerData, updateCalcCondrollerDataHandler)
  .build()
