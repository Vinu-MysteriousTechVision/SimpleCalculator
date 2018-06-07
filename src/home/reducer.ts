import { Action, combineReducers } from 'redux'
import { reducerWithInitialState } from 'typescript-fsa-reducers'
import { actions, IPayload, ICalcControllerData } from './actions'
// NOTE: Below are just an example.

export interface State {
  /*
   * NOTE: switch home screen's content depending on the user's status in the future.
   * For the initial development userStatus consider as number
   */
  equation: string
  processingData: [any]
  result: string
  n1: number
  op: string
  n2: number
  res: number
  aryN1: number[]
  aryOP: any[]
  aryN2: number[]
  digit: string
}

const initialState: State = {
  equation: '',
  result: '',
  processingData: [0],
  n1: 0,
  op: '',
  n2: 0,
  res: 0,
  aryN1: [],
  aryOP: [],
  aryN2: [],
  digit: ''
}

/*
 * topPage onPressTakeExam button action handler
 */
const updateCountHandler = (state: State, payload: IPayload): State => ({
  ...state,
  equation: payload.expression,
  result: payload.result
})

const updateCalcCondrollerDataHandler = (state: State, payload: ICalcControllerData): State => ({
  ...state,
  n1: payload.n1,
  op: payload.op,
  n2: payload.n2,
  res: payload.res,
  aryN1: payload.aryN1,
  aryOP: payload.aryOP,
  aryN2: payload.aryN2,
  digit: payload.digit
})

export const reducer = reducerWithInitialState(initialState)
  .case(actions.updateCount, updateCountHandler)
  .case(actions.updateCalcCondrollerData, updateCalcCondrollerDataHandler)
  .build()
