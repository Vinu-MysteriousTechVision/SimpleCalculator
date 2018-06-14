import React, { Component } from 'react'
import {
  ImageBackground,
  StatusBar,
  ScrollView,
  StyleSheet,
  Text,
  View,
  BackHandler,
  Animated,
  Easing,
  Dimensions
} from 'react-native'
import { ButtonEnum } from '../constants'
import { Color } from '../styles'
import { CustomButton } from '../components/component.button'

const windowWidth = Dimensions.get('window').width

export interface IHomeComponentStateProps {
  equation: string
  result: string
}

// NOTE: Component must not know what will happen when button pressed.
// just passing event to parent (container) and container handles the event by emitting action of Redux.
export interface IHomeComponentDispatchProps {
  onAddCount: (butttonId: ButtonEnum) => void
  onAndroidBack: () => void
}

interface IHomeProps extends IHomeComponentStateProps, IHomeComponentDispatchProps {}

interface IHomeState {}

export class Home extends React.Component<IHomeProps, IHomeState> {
  public animatedValue: Animated.Value = new Animated.Value(0)
  constructor(props: IHomeProps) {
    super(props)
    this.state = {} as IHomeState
  }

  componentWillMount() {
    const {onAndroidBack} = this.props

    BackHandler.addEventListener('hardwareBackPress', function() {
      onAndroidBack()
      return false
    })
  }

  animate () {
    this.animatedValue.setValue(0)
    Animated.timing(
      this.animatedValue,
      {
        toValue: 1,
        duration: 1000,
        easing: Easing.linear
      }
    ).start()
  }

  onPressAction = (butttonId: ButtonEnum) => () => {
    const {onAddCount} = this.props
    onAddCount(butttonId)
    if (butttonId === ButtonEnum.AllClear) {
      this.animate()
    }
  }

  public render() {
    const {equation, onAddCount, result} = this.props
    const opacity = this.animatedValue.interpolate({
      inputRange: [0, 0.5, 1],
      outputRange: [0, 1, 0]
    })

    return (
      <View style={styles.container}>
        <StatusBar  backgroundColor='#1d1e22' barStyle='light-content'/>

        <ImageBackground  style={[styles.expressionContainer, {alignItems: 'flex-end'}]} source={require('../res/bgBlue.png')}>
          <ScrollView
            ref={ref => this.scrollView = ref}
            ontentContainerStyle={styles.expressionLabelContainer}
            horizontal={true}
            showsHorizontalScrollIndicator={false}
            onContentSizeChange={(contentWidth, contentHeight) => {
              this.scrollView.scrollToEnd({animated: true})
            }}>
            <Text style={styles.expressionLabel} numberOfLines={1}>{equation}</Text>
          </ScrollView>
          <Text style={styles.resultLabel} numberOfLines={1}>{result}</Text>
          <Animated.View style={{ flex: 1, height: 200, width: windowWidth, position: 'absolute', opacity, backgroundColor: '#4a547c'}} />
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
            <CustomButton title='AC'
              buttonStyle={{ backgroundColor: 'transparent', marginHorizontal: 0 }}
              onPressAction={this.onPressAction(ButtonEnum.AllClear)}/>
            <CustomButton title='DEL'
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
