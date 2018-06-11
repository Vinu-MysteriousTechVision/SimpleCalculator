import React, { Component } from 'react'
import {
  ImageBackground,
  StatusBar,
  ScrollView,
  StyleSheet,
  Text,
  View
} from 'react-native'
import { ButtonEnum } from '../constants'
import { Color } from '../styles'
import { CustomButton } from '../components/component.button'

export interface IHomeComponentStateProps {
  equation: string
  result: string
}

// NOTE: Component must not know what will happen when button pressed.
// just passing event to parent (container) and container handles the event by emitting action of Redux.
export interface IHomeComponentDispatchProps {
  onAddCount: (butttonId: ButtonEnum) => void
}

interface IHomeProps extends IHomeComponentStateProps, IHomeComponentDispatchProps {}

interface IHomeState {}

export class Home extends React.Component<IHomeProps, IHomeState> {
  constructor(props: IHomeProps) {
    super(props)
    this.state = {} as IHomeState
  }

  onPressAction = (butttonId: ButtonEnum) => () => {
    const {onAddCount} = this.props
    onAddCount(butttonId)
  }

  public render() {
    const {equation, onAddCount, result} = this.props
    return (
      <View style={styles.container}>
        <StatusBar  backgroundColor="#1d1e22"  barStyle="light-content"/>
        <ImageBackground  style={[styles.expressionContainer, {alignItems: 'flex-end'}]} source={require('../res/bgBlue.png')}>
          <ScrollView
            ref={ref => this.scrollView = ref}
            ontentContainerStyle={styles.expressionLabelContainer}
            horizontal={true}
            showsHorizontalScrollIndicator={false}
            onContentSizeChange={(contentWidth, contentHeight)=>{
              this.scrollView.scrollToEnd({animated: true});
            }}>
            <Text style={styles.expressionLabel} numberOfLines={1}>{equation}</Text>
          </ScrollView>
          <Text style={styles.resultLabel} numberOfLines={1}>{result}</Text>
        </ImageBackground >
        <View style={{ flex: 1, backgroundColor: Color.bgResultView, flexDirection: 'row' }}>
          <View style={{flex: 1, backgroundColor: Color.bgDigitsView}}>
            <View style={{flex: 1, flexDirection: 'row', marginVertical: 0, backgroundColor: 'transparent'}}>
              <CustomButton title='7' onPressAction={this.onPressAction(ButtonEnum.Seven)}/>
              <CustomButton title='8' onPressAction={this.onPressAction(ButtonEnum.Eight)}/>
              <CustomButton title='9' onPressAction={this.onPressAction(ButtonEnum.Nine)}/>
            </View>
            <View style={{flex: 1, flexDirection: 'row', marginVertical: 0, backgroundColor: 'transparent'}}>
              <CustomButton title='4' onPressAction={this.onPressAction(ButtonEnum.Four)}/>
              <CustomButton title='5' onPressAction={this.onPressAction(ButtonEnum.Five)}/>
              <CustomButton title='6' onPressAction={this.onPressAction(ButtonEnum.Six)}/>
            </View>
            <View style={{flex: 1, flexDirection: 'row', marginVertical: 0, backgroundColor: 'transparent'}}>
              <CustomButton title='1' onPressAction={this.onPressAction(ButtonEnum.One)}/>
              <CustomButton title='2' onPressAction={this.onPressAction(ButtonEnum.Two)}/>
              <CustomButton title='3' onPressAction={this.onPressAction(ButtonEnum.Three)}/>
            </View>
            <View style={{flex: 1, flexDirection: 'row', marginVertical: 0, backgroundColor: 'transparent'}}>
              <CustomButton title='.' onPressAction={this.onPressAction(ButtonEnum.Point)}/>
              <CustomButton title='0' onPressAction={this.onPressAction(ButtonEnum.Zero)}/>
              <CustomButton title='=' onPressAction={this.onPressAction(ButtonEnum.Equals)}/>
            </View>
          </View>
          <View style={{width: 100, backgroundColor: Color.bgOperatorsView, marginVertical: 0}}>
            <CustomButton title='CLR'
              buttonStyle={{ backgroundColor: 'transparent', marginHorizontal: 0 }}
              onPressAction={this.onPressAction(ButtonEnum.Clear)} onLongPressAction={this.onPressAction(ButtonEnum.AllClear)}/>
            <CustomButton title='/' buttonStyle={{ backgroundColor: 'transparent', marginHorizontal: 0 }}
              onPressAction={this.onPressAction(ButtonEnum.Division)}/>
            <CustomButton title='*' buttonStyle={{ backgroundColor: 'transparent', marginHorizontal: 0 }}
              onPressAction={this.onPressAction(ButtonEnum.Multiplication)}/>
            <CustomButton title='-' buttonStyle={{ backgroundColor: 'transparent', marginHorizontal: 0 }}
              onPressAction={this.onPressAction(ButtonEnum.Minus)}/>
            <CustomButton title='+' buttonStyle={{ backgroundColor: 'transparent', marginHorizontal: 0 }}
              onPressAction={this.onPressAction(ButtonEnum.Plus)}/>
          </View>
        </View>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1, backgroundColor: '#FFFFFF'
  },
  expressionContainer: {
    height: 200, backgroundColor: Color.bgResultView, justifyContent: 'flex-end', paddingBottom: 50
  },
  expressionLabelContainer: {
    justifyContent: 'flex-end', alignSelf: 'flex-end', height: 44
  },
  expressionLabel: {
    justifyContent: 'flex-end', alignSelf: 'flex-end', height: 44, paddingHorizontal: 20,
    fontSize: 32,
    fontWeight: '300',
    color: '#FFFFFF'
  },
  resultLabel: {
    justifyContent: 'flex-end',
    alignSelf: 'flex-end',
    height: 44,
    paddingHorizontal: 20,
    fontSize: 24,
    fontWeight: '300',
    color: '#FFFFFF'
  },

  button: {
    flex: 1, marginHorizontal: 5, backgroundColor: 'gray', justifyContent: 'center', alignItems: 'center'
  }
})
