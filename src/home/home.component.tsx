import React, { Component } from 'react'
import {
  Button,
  Dimensions,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  TouchableHighlight
} from 'react-native'
import { ButtonEnum } from '../constants'
import { CustomButton } from '../components/component.button'
const windowWidth: number = Dimensions.get('window').width // full width
const windowHeight: number = Dimensions.get('window').height // full height

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
        <View style={styles.expressionContainer}>
          <Text style={styles.expressionLabel} numberOfLines={1}>{equation}</Text>
          <Text style={styles.expressionLabel} numberOfLines={1}>{result}</Text>
        </View>
        <View style={{ flex: 1, backgroundColor: 'transparent', flexDirection: 'row' }}>
          <View style={{flex: 1, backgroundColor: 'black'}}>
            <View style={{flex: 1, flexDirection: 'row', marginVertical: 5, backgroundColor: 'transparent'}}>
              <CustomButton title='7' onPressAction={this.onPressAction(ButtonEnum.Seven)}/>
              <CustomButton title='8' onPressAction={this.onPressAction(ButtonEnum.Eight)}/>
              <CustomButton title='9' onPressAction={this.onPressAction(ButtonEnum.Nine)}/>
            </View>
            <View style={{flex: 1, flexDirection: 'row', marginVertical: 5, backgroundColor: 'transparent'}}>
              <CustomButton title='4' onPressAction={this.onPressAction(ButtonEnum.Four)}/>
              <CustomButton title='5' onPressAction={this.onPressAction(ButtonEnum.Five)}/>
              <CustomButton title='6' onPressAction={this.onPressAction(ButtonEnum.Six)}/>
            </View>
            <View style={{flex: 1, flexDirection: 'row', marginVertical: 5, backgroundColor: 'transparent'}}>
              <CustomButton title='1' onPressAction={this.onPressAction(ButtonEnum.One)}/>
              <CustomButton title='2' onPressAction={this.onPressAction(ButtonEnum.Two)}/>
              <CustomButton title='3' onPressAction={this.onPressAction(ButtonEnum.Three)}/>
            </View>
            <View style={{flex: 1, flexDirection: 'row', marginVertical: 5, backgroundColor: 'transparent'}}>
              <CustomButton title='0' onPressAction={this.onPressAction(ButtonEnum.Zero)}/>
              <CustomButton title='.' onPressAction={this.onPressAction(ButtonEnum.Point)}/>
              <CustomButton title='=' onPressAction={this.onPressAction(ButtonEnum.Equals)}/>
            </View>
          </View>
          <View style={{width: 100, backgroundColor: '#E1E1E1'}}>
            <CustomButton title='Del'
              buttonStyle={{ backgroundColor: '#E1E1E1', marginHorizontal: 0 }}
              onPressAction={this.onPressAction(ButtonEnum.Clear)} onLongPressAction={this.onPressAction(ButtonEnum.AllClear)}/>
            <CustomButton title='/' buttonStyle={{ backgroundColor: '#E1E1E1', marginHorizontal: 0 }}
              onPressAction={this.onPressAction(ButtonEnum.Division)}/>
            <CustomButton title='*' buttonStyle={{ backgroundColor: '#E1E1E1', marginHorizontal: 0 }}
              onPressAction={this.onPressAction(ButtonEnum.Multiplication)}/>
            <CustomButton title='-' buttonStyle={{ backgroundColor: '#E1E1E1', marginHorizontal: 0 }}
              onPressAction={this.onPressAction(ButtonEnum.Minus)}/>
            <CustomButton title='+' buttonStyle={{ backgroundColor: '#E1E1E1', marginHorizontal: 0 }}
              onPressAction={this.onPressAction(ButtonEnum.Plus)}/>
          </View>
          <View style={{width: 5, backgroundColor: '#000000'}}/>
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
    height: 300, backgroundColor: '#E1E1E1', justifyContent: 'flex-end', paddingBottom: 50
  },
  expressionLabel: {
    justifyContent: 'flex-end', alignSelf: 'flex-end', height: 44, paddingHorizontal: 20,
    fontSize: 36,
    fontWeight: '300',
    lineHeight: Platform.select({
      ios: 0,
      android: 18
    })
  },
  button: {
    flex: 1, marginHorizontal: 5, backgroundColor: 'gray', justifyContent: 'center', alignItems: 'center'
  }
})
