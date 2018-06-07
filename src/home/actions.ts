import { Action, Dispatch } from 'redux'
import actionCreatorFactory from 'typescript-fsa'
import { RootState } from '../reducer'
import { ButtonEnum } from '../constants'

const actionCreator = actionCreatorFactory()

export interface IPayload {
  expression: string
  result: string
}

export interface ICalcControllerData {
  n1: number
  op: string
  n2: number
  res: number
  aryN1: number[]
  aryOP: any
  aryN2: number[]
  digit: string
}

// NOTE: updateCount() === { type: 'Home/UPDATE_COUNT', payload: {} }
const updateCount = actionCreator<IPayload>('Home/UPDATE_COUNT')
const updateCalcCondrollerData = actionCreator<ICalcControllerData>('Home/updateCalcCondrollerData')

function calculate(n1: number, op: string, n2: number) {
  switch (op) {
    case '+':
      return n1 + n2
    case '-':
      return n1 - n2
    case '*':
      return n1 * n2
    case '/':
      return n1 / n2
    default:
    return 0
  }
}

const calcController = (butttonId: ButtonEnum): any => {
  return (dispatch: Dispatch<any>, getState: () => RootState) => {

    let n1 = getState().home.n1
    let op = getState().home.op
    let n2 = getState().home.n2
    let res = getState().home.res
    let aryN1: number[] = getState().home.aryN1
    let aryOP: any[] = getState().home.aryOP
    let aryN2: number[] = getState().home.aryN2
    let digit = getState().home.digit
    if (butttonId === ButtonEnum.AllClear) {
      dispatch(updateCount({expression: '', result: ''}))
      dispatch(updateCalcCondrollerData({n1: 0, op: '', n2: 0, res: 0, aryN1: [], aryOP: [], aryN2: [], digit: ''}))
      return
    } else if (butttonId !== ButtonEnum.Clear) {
      let digitString = getState().home.equation + butttonId
      const equation = digitString
      let equationData = butttonId + '' // equation.charAt(i)
      let digitRegex = /^-?\d+\.?\d*$/

      if (equationData.match(digitRegex)) {
        digit = digit + equationData
        if (op === '') {
          n1 = Number(digit)
        } if (op !== '') {
          n2 = Number(digit)
          res = calculate(n1, op, n2)
        }
      } else {
        if (equation.length > 0) {
          let prevData = equation.charAt(equation.length - 2)
          if (prevData.match(/^[*/]$/)) {
            digit = digit + equationData
            return // continue
          } else if (!prevData.match(digitRegex)) {
            aryOP[aryOP.length - 1] = op
            op = equationData
            return // continue
          }
        }

        if (op !== '') {
          aryN1.push(res)
          aryOP.push(op)
          aryN2.push(n2)
          op = equationData
          n1 = res
          n2 = 0
          digit = ''
        } else {
          op = equationData
          aryN1.push(Number(digit))
          digit = ''
        }
      }
      dispatch(updateCalcCondrollerData({n1, op, n2, res, aryN1, aryOP, aryN2, digit}))
      dispatch(updateCount({expression: equation, result: (res === 0) ? '' : String(res)}))
    } else {
      let digitString = getState().home.equation

      digit = String(n2)
      let equationData = digitString.charAt(digitString.length - 1)
      digitString = digitString.slice(0, -1)
      if (digitString.length === 0) {
        dispatch(updateCount({expression: '', result: ''}))
        dispatch(updateCalcCondrollerData({n1: 0, op: '', n2: 0, res: 0, aryN1: [], aryOP: [], aryN2: [], digit: ''}))
        return
      }

      let digitRegex = /^-?\d+\.?\d*$/

      if (equationData.match(digitRegex)) {
        digit = digit.slice(0, -1)
        if (digit.match(digitRegex)) {
          if (op !== '') {
            n2 = Number(digit)
            res = calculate(n1, op, n2)
          }
        } else if (digit !== '') {
          digit = digit.slice(0, -1)

          res = (aryN1.length > 0) ? aryN1[(aryN1.length - 1) > 0 ? (aryN1.length - 1) : 0] : res
          aryN1 = (aryN1.length > 0) ? aryN1.slice(0, -1) : aryN1
          n1 = (aryN1.length > 0) ? aryN1[(aryN1.length - 1) > 0 ? (aryN1.length - 1) : 0] : n1
          n2 = (aryN2.length > 0) ? aryN2[(aryN2.length - 1) > 0 ? (aryN2.length - 1) : 0] : 0
          digit = String(n2)
          aryN2 = (aryN2.length > 0) ? aryN2.slice(0, -1) : aryN2
        } else if (digit === '') {
          res = (aryN1.length > 0) ? aryN1[(aryN1.length - 1) > 0 ? (aryN1.length - 1) : 0] : res
          aryN1 = (aryN1.length > 0) ? aryN1.slice(0, -1) : aryN1
          n1 = (aryN1.length > 0) ? aryN1[(aryN1.length - 1) > 0 ? (aryN1.length - 1) : 0] : n1
          n2 = (aryN2.length > 0) ? aryN2[(aryN2.length - 1) > 0 ? (aryN2.length - 1) : 0] : 0
          digit = (n2 === 0) ? String(n1) : String(n2)
          aryN2 = (aryN2.length > 0) ? aryN2.slice(0, -1) : aryN2
        }
      } else {
        if (op !== '') {
          op = (aryOP.length > 0) ? aryOP[(aryOP.length - 1) > 0 ? (aryOP.length - 1) : 0] : ''
          aryOP = (aryOP.length > 0) ? aryOP.slice(0, -1) : aryOP
        }
      }
      if (op === '') {
        dispatch(updateCount({expression: digitString, result: ''}))
        dispatch(updateCalcCondrollerData({n1: Number(digitString), op: '', n2: 0, res: Number(digitString), aryN1: [], aryOP: [], aryN2: [], digit: digitString}))
        return
      }
      dispatch(updateCount({expression: digitString, result: String(res)}))
      dispatch(updateCalcCondrollerData({n1, op, n2, res, aryN1, aryOP, aryN2, digit}))
    }
  }
}

export const actions = {
  updateCount,
  calcController,
  updateCalcCondrollerData
}
