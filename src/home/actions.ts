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
  firstOperand: number
  operator: string
  secondOperand: number
  res: number
  aryResults: number[]
  aryOperators: any
  arySecondOperands: number[]
  digit: string
}

// NOTE: updateExpressionAndResult() === { type: 'Home/updateExpressionAndResult', payload: {} }
const updateExpressionAndResult = actionCreator<IPayload>('Home/updateExpressionAndResult')
const updateCalcCondrollerData = actionCreator<ICalcControllerData>('Home/updateCalcCondrollerData')

function calculate(firstOperand: number, operator: string, secondOperand: number) {
  switch (operator) {
    case '+':
      return firstOperand + secondOperand
    case '-':
      return firstOperand - secondOperand
    case '*':
      return firstOperand * secondOperand
    case '/':
      return firstOperand / secondOperand
    default:
    return 0
  }
}

function isNumeric(n: any) {
  return !isNaN(parseFloat(n)) && isFinite(n)
}

const addCalculationData = (butttonId: ButtonEnum): any => {
  return (dispatch: Dispatch<any>, getState: () => RootState) => {

    let firstOperand = getState().home.firstOperand
    let operator = getState().home.operator
    let secondOperand = getState().home.secondOperand
    let res = getState().home.res
    let aryResults: number[] = getState().home.aryResults
    let aryOperators: any[] = getState().home.aryOperators
    let arySecondOperands: number[] = getState().home.arySecondOperands
    let digit = getState().home.digit
    const digitRegex = /^-?\d+\.?\d*$/

    if (getState().home.equation.slice(-1) === butttonId) {
      return
    }
    let tempEquation = getState().home.equation + butttonId
    if ((tempEquation.length === 1) && (tempEquation.match(/^[*/]$/))) {
      return
    }
    let lastEquationValue = butttonId + ''

    if (butttonId === ButtonEnum.Point) {
      if (digit.indexOf('.') > -1) return
      digit = digit + lastEquationValue
      dispatch(updateCalcCondrollerData({firstOperand, operator, secondOperand, res, aryResults, aryOperators, arySecondOperands, digit}))
      dispatch(updateExpressionAndResult({expression: tempEquation, result: (res === 0) ? '' : String(res)}))
      return
    }

    if (lastEquationValue.match(digitRegex)) {
      digit = digit + lastEquationValue
      if (operator === '') {
        firstOperand = Number(digit)
      } if (operator !== '') {
        secondOperand = Number(digit)
        let tempRes = calculate(firstOperand, operator, secondOperand)
        if (isNumeric(tempRes)) {
          res = tempRes
        } else {
          dispatch(updateCalcCondrollerData({firstOperand, operator, secondOperand, res, aryResults, aryOperators, arySecondOperands, digit}))
          dispatch(updateExpressionAndResult({expression: tempEquation, result: 'Error'}))
          return
        }
      }
    } else {

      if (tempEquation.length > 2) {
        let prevData = tempEquation.charAt(tempEquation.length - 2)
        if (!prevData.match(digitRegex)) {
          digit = ''
          if (prevData !== operator) {
            if (lastEquationValue.match(/^[*/]$/)) {
              tempEquation = tempEquation.slice(0, -3)
              tempEquation = tempEquation + lastEquationValue
              operator = lastEquationValue
              if (aryOperators.length > 0) {
                aryOperators.slice(0, -1)
                aryOperators.push(operator)
              }
            } else if (lastEquationValue.match(/^[-+]$/)) {
              if (lastEquationValue === '+') {
                tempEquation = tempEquation.slice(0, -2)
              } else {
                digit = digit + lastEquationValue
              }
            }
          } else {
            if (prevData.match(/^[*/]$/)) {
              if (lastEquationValue === '-') {
                digit = '-'
              } else {
                tempEquation = tempEquation.slice(0, -2)
                tempEquation = tempEquation + lastEquationValue
                operator = lastEquationValue
                if (aryOperators.length > 0) {
                  aryOperators.slice(0, -1)
                  aryOperators.push(operator)
                }
              }
            } else {
              tempEquation = tempEquation.slice(0, -2)
              tempEquation = tempEquation + lastEquationValue
              operator = lastEquationValue
              if (aryOperators.length > 0) {
                aryOperators.slice(0, -1)
                aryOperators.push(operator)
              }
            }
          }
          dispatch(updateCalcCondrollerData({firstOperand, operator, secondOperand, res, aryResults, aryOperators, arySecondOperands, digit}))
          dispatch(updateExpressionAndResult({expression: tempEquation, result: (res === 0) ? '' : String(res)}))
          return
        }
      }
      if (tempEquation.length === 2 && !tempEquation.charAt(0).match(digitRegex)) {
        tempEquation = lastEquationValue.match(/^[*/]$/) ? tempEquation.slice(0, -1) : lastEquationValue
        if (tempEquation === '-') {
          digit = digit + tempEquation
        } else {
          digit = ''
        }
        operator = ''
        dispatch(updateCalcCondrollerData({firstOperand, operator, secondOperand, res, aryResults, aryOperators, arySecondOperands, digit}))
        dispatch(updateExpressionAndResult({expression: tempEquation, result: (res === 0) ? '' : String(res)}))
        return
      }

      if (operator !== '') {
        aryResults.push(res)
        aryOperators.push(operator)
        arySecondOperands.push(secondOperand)
        operator = lastEquationValue
        firstOperand = res
        secondOperand = 0
        digit = ''
      } else {
        operator = lastEquationValue
        aryResults.push(Number(digit))
        digit = ''
      }
    }
    dispatch(updateCalcCondrollerData({firstOperand, operator, secondOperand, res, aryResults, aryOperators, arySecondOperands, digit}))
    dispatch(updateExpressionAndResult({expression: tempEquation, result: (res === 0 && (aryOperators.length === 0)) ? '' : String(res)}))
  }
}

const removeCalculationData = (butttonId: ButtonEnum): any => {
  return (dispatch: Dispatch<any>, getState: () => RootState) => {

    if (butttonId === ButtonEnum.AllClear) {
      dispatch(updateExpressionAndResult({expression: '', result: ''}))
      dispatch(updateCalcCondrollerData({firstOperand: 0, operator: '', secondOperand: 0, res: 0, aryResults: [], aryOperators: [], arySecondOperands: [], digit: ''}))
      return
    }

    let firstOperand = getState().home.firstOperand
    let operator = getState().home.operator
    let secondOperand = getState().home.secondOperand
    let res = getState().home.res
    let aryResults: number[] = getState().home.aryResults
    let aryOperators: any[] = getState().home.aryOperators
    let arySecondOperands: number[] = getState().home.arySecondOperands
    let digit = getState().home.digit
    const digitRegex = /^-?\d+\.?\d*$/

    let tempEquation = getState().home.equation
    let lastEquationValue = tempEquation.charAt(tempEquation.length - 1)
    tempEquation = tempEquation.slice(0, -1)
    digit = String(secondOperand)
    digit = digit.slice(0, -1)

    if (tempEquation.length === 0) {
      dispatch(updateExpressionAndResult({expression: '', result: ''}))
      dispatch(updateCalcCondrollerData({firstOperand: 0, operator: '', secondOperand: 0, res: 0, aryResults: [], aryOperators: [], arySecondOperands: [], digit: ''}))
      return
    }

    if (lastEquationValue === '.' && operator !== '') {
      dispatch(updateCalcCondrollerData({firstOperand, operator, secondOperand, res, aryResults, aryOperators, arySecondOperands, digit}))
      dispatch(updateExpressionAndResult({expression: tempEquation, result: (res === 0) ? '' : String(res)}))
      return
    }

    if (lastEquationValue.match(digitRegex) && digit.match(digitRegex)) {
      if (operator !== '') {
        secondOperand = Number(digit)
        let tempRes = calculate(firstOperand, operator, secondOperand)
        if (isNumeric(tempRes)) {
          res = tempRes
        } else {
          dispatch(updateCalcCondrollerData({firstOperand, operator, secondOperand, res, aryResults, aryOperators, arySecondOperands, digit}))
          dispatch(updateExpressionAndResult({expression: tempEquation, result: 'Error'}))
          return
        }
      }
    } else if (!lastEquationValue.match(digitRegex) || (digit.length === 1 && !digit.slice(-1).match(digitRegex))) {
      if (digit.length === 1) {
        digit = digit.slice(0, -1)
        res = (aryResults.length > 0) ? aryResults[(aryResults.length - 1)] : firstOperand
        secondOperand = (arySecondOperands.length > 0) ? arySecondOperands[(arySecondOperands.length - 1)] : 0
        dispatch(updateExpressionAndResult({expression: tempEquation, result: String(res)}))
        dispatch(updateCalcCondrollerData({firstOperand, operator, secondOperand, res, aryResults, aryOperators, arySecondOperands, digit}))
        return
      } else {
        if (tempEquation.length > 2) {
          let prevData = tempEquation.charAt(tempEquation.length - 1)
          if (!prevData.match(digitRegex) && prevData.match(/^[*/]$/)) {
            dispatch(updateExpressionAndResult({expression: tempEquation, result: String(res)}))
            dispatch(updateCalcCondrollerData({firstOperand, operator, secondOperand, res, aryResults, aryOperators, arySecondOperands, digit}))
            return
          }
        }
      }

      if (operator !== '') {
        operator = (aryOperators.length > 0) ? aryOperators[(aryOperators.length - 1) > 0 ? (aryOperators.length - 1) : 0] : ((digit.length > 0) ? operator : '')
        aryOperators = (aryOperators.length > 0) ? aryOperators.slice(0, -1) : aryOperators

        aryResults = (aryResults.length > 0) ? aryResults.slice(0, -1) : aryResults
        firstOperand = (aryResults.length > 0) ? aryResults[(aryResults.length - 1)] : firstOperand
        secondOperand = (arySecondOperands.length > 0) ? arySecondOperands[(arySecondOperands.length - 1)] : 0
        arySecondOperands = (arySecondOperands.length > 0) ? arySecondOperands.slice(0, -1) : arySecondOperands
      }
    } else {
      res = (aryResults.length > 0) ? aryResults[(aryResults.length - 1)] : firstOperand
      digit = ''
    }

    if (operator === '') {
      dispatch(updateExpressionAndResult({expression: tempEquation, result: ''}))
      dispatch(updateCalcCondrollerData({firstOperand: Number(tempEquation), operator: '', secondOperand: 0, res: Number(tempEquation), aryResults: [], aryOperators: [], arySecondOperands: [], digit: tempEquation}))
      return
    }
    dispatch(updateExpressionAndResult({expression: tempEquation, result: String(res)}))
    dispatch(updateCalcCondrollerData({firstOperand, operator, secondOperand, res, aryResults, aryOperators, arySecondOperands, digit}))
  }
}

const getResults = (butttonId: ButtonEnum): any => {
  return (dispatch: Dispatch<any>, getState: () => RootState) => {
    let res = getState().home.res
    if (butttonId === ButtonEnum.Equals) {
      dispatch(updateExpressionAndResult({expression: String(res), result: ''}))
      dispatch(updateCalcCondrollerData({firstOperand: res, operator: '', secondOperand: 0, res: 0, aryResults: [], aryOperators: [], arySecondOperands: [], digit: String(res)}))
      return
    }
  }
}

export const actions = {
  updateExpressionAndResult,
  updateCalcCondrollerData,
  addCalculationData,
  removeCalculationData,
  getResults
}
