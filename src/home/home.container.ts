import * as React from 'react'
import { connect, MapDispatchToProps, MapStateToProps } from 'react-redux'
import { Action, Dispatch } from 'redux'
import { ButtonEnum } from '../constants'
import { RootState } from '../reducer'
import { actions } from './actions'
import {
  Home,
  IHomeComponentDispatchProps,
  IHomeComponentStateProps
} from './home.component'

interface OwnProps {}

// NOTE: get required value for this screen from Redux's State, and map it to the interface Component wants.
const mapStateToProps: MapStateToProps<IHomeComponentStateProps, OwnProps, RootState> = (state: RootState, ownProps: OwnProps) => {
  const {equation, result} = state.home
  return {
    equation,
    result
  }
}

// NOTE: dispatch Redux action from component's event. e.g. `onPress: dispatch(actions.submit({}))`
const mapDispatchToProps: MapDispatchToProps<IHomeComponentDispatchProps, OwnProps> = (dispatch: Dispatch<Action>, ownProps: OwnProps) => ({
  onAddCount: (butttonId: ButtonEnum) => {
    dispatch(actions.calcController(butttonId))
  }
})

export const HomeContainer = connect(mapStateToProps, mapDispatchToProps)(Home)
