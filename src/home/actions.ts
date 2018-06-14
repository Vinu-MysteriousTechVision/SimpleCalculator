import { Action, Dispatch } from 'redux'
import actionCreatorFactory from 'typescript-fsa'
import { RootState } from '../reducer'
import { ButtonEnum } from '../constants'

const actionCreator = actionCreatorFactory()

export interface IPayload {
  expression: string
  prevResult: string
  result: string
}

// NOTE: updateExpressionAndResult() === { type: 'Home/updateExpressionAndResult', payload: {} }
const updateExpressionAndResult = actionCreator<IPayload>('Home/updateExpressionAndResult')

// The method to apply an operator and return the result.
function calculate(firstOperand: number, operator: string, secondOperand: number) {
  switch (operator) {
    case '+':
      return firstOperand + secondOperand
    case '-':
      return firstOperand - secondOperand
    case '*':
      return firstOperand * secondOperand
    case '/':
      if (secondOperand === 0)
        console.log('Cannot divide by zero')
      return secondOperand / firstOperand
    default:
    return 0
  }
}

// Returns true if 'op2' has higher or same precedence as 'op1',
// otherwise returns false.
const hasPrecedence = (op1: string, op2: string) => {
    if ((op1 === '*' || op1 === '/') && (op2 === '+' || op2 === '-'))
        return false
    else
        return true
}

function isNumeric(n: any) {
  return !isNaN(parseFloat(n)) && isFinite(n)
}

const addCalculationData = (butttonId: ButtonEnum): any => {
  return (dispatch: Dispatch<any>, getState: () => RootState) => {

    let tempEquation = getState().home.equation
    const aryDigits = tempEquation.split((/\*|\+|-|\//))
    if (butttonId === ButtonEnum.Point) {
      if (aryDigits[aryDigits.length - 1].indexOf('.') > -1) return
    }

    if (tempEquation.length <= 0 && String(butttonId).match(/^[*/]$/)) return
    if (tempEquation.length === 1 && tempEquation.match(/^[+-]$/) && String(butttonId).match(/^[*/]$/)) return
    const val = tempEquation.slice(-1, -2)
    if (tempEquation.length > 2 && tempEquation.charAt(tempEquation.length - 2).match(/^[*/]$/)) {
      if (String(butttonId).match(/^[-]$/) && tempEquation.slice(-1).match(/^[-]$/)) {
        tempEquation = tempEquation
      } else if (String(butttonId).match(/^[+]$/) && tempEquation.slice(-1).match(/^[-]$/)) {
        tempEquation = tempEquation.slice(0, -1)
      } else if (String(butttonId).match(/^[*/]$/) && tempEquation.slice(-1).match(/^[-]$/)) {
        tempEquation = tempEquation.slice(0, -2) + butttonId
      } else {
        tempEquation = getState().home.equation + butttonId
      }
    } else if (tempEquation.slice(-1).match(/^[*/]$/) && String(butttonId).match(/^[-]$/)) {
      tempEquation = getState().home.equation + butttonId
    } else if (tempEquation.slice(-1).match(/^[*/+-]$/) && String(butttonId).match(/^[*/+-]$/)) {
      tempEquation = tempEquation.slice(0, -1) + butttonId
    } else {
      tempEquation = getState().home.equation + butttonId
    }

    let res = evaluate(tempEquation)
    dispatch(updateExpressionAndResult({expression: tempEquation, prevResult: String(getState().home.prevResult),  result: isNumeric(res) ? String(res) : String(getState().home.result)}))
  }
}

const removeCalculationData = (butttonId: ButtonEnum): any => {
  return (dispatch: Dispatch<any>, getState: () => RootState) => {

    if (butttonId === ButtonEnum.AllClear) {
      dispatch(updateExpressionAndResult({expression: '', result: '', prevResult: ''}))
      return
    }

    let tempEquation = getState().home.equation.slice(0, -1)
    if (tempEquation === '') {
      dispatch(updateExpressionAndResult({expression: '', result: '', prevResult: ''}))
      return
    }
    let tempEquationValue = tempEquation
    let res = evaluate(tempEquation)
    while (!isNumeric(res) && tempEquation !== '') {
      tempEquationValue = tempEquationValue.slice(0, -1)
      res = evaluate(tempEquationValue)
    }
    const prevResult = String(getState().home.prevResult)
    dispatch(updateExpressionAndResult({expression: tempEquation, prevResult: String(getState().home.prevResult), result: isNumeric(res) ? String(res) : String(getState().home.prevResult)}))
  }
}

const getResults = (butttonId: ButtonEnum): any => {
  return (dispatch: Dispatch<any>, getState: () => RootState) => {
    dispatch(updateExpressionAndResult({expression: String(getState().home.result), result: '', prevResult: ''}))
  }
}

const evaluate = (expression: String) => {
  const equation = expression
  const arySplitEquation = expression.split('')

  let isLastdigitIsOperator: boolean = false
  let i = 0
  let operands: number[] = []
  let operators: string[] = []

  while (i < equation.length) {
    let value: string = ''
    if (arySplitEquation[i].match(/^[0-9.]$/) || (isLastdigitIsOperator && arySplitEquation[i] === '-')) {
      // add as digit
      isLastdigitIsOperator = false
      value = value + arySplitEquation[i]
      i++
      while (i < equation.length && (arySplitEquation[i].match(/^[0-9.]+$/))) {
        // check next value is digit
        value = value + arySplitEquation[i]
        i++
      }
      operands.push(Number(value))
    } else {
      // add as operand
      isLastdigitIsOperator = true
      // IF lastEquationValue is operator and current value is '-' then its digit
      while ((operators.length > 0) && hasPrecedence(arySplitEquation[i], operators[0])) {

        let value1 = operands[operands.length - 1]
        operands.pop()
        let operator = operators[operators.length - 1]
        operators.pop()
        let value2 = operands[operands.length - 1]
        operands.pop()
        operands.push(calculate(value1, operator, value2))
      }
      operators.push(arySplitEquation[i])
      i++
    }
  }

  while (operators.length > 0) {

    let value1 = operands[operands.length - 1]
    operands.pop()
    let operator = operators[operators.length - 1]
    operators.pop()
    let value2 = operands[operands.length - 1]
    operands.pop()
    operands.push(calculate(value1, operator, value2))
  }
  return operands[0]
}

export const actions = {
  updateExpressionAndResult,
  addCalculationData,
  removeCalculationData,
  getResults
}
