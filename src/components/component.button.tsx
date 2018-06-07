import * as React from 'react'
import {
  Platform,
  StyleSheet,
  Text,
  TouchableHighlight,
  View,
  ViewStyle
} from 'react-native'

export interface ICustomButtonStateProps {
  title: string
}

export interface ICustomButtonDispatchProps {
  onPressAction: () => void
  onLongPressAction?: () => void
}

interface ICustomButtonComponentProps
  extends ICustomButtonStateProps,
    ICustomButtonDispatchProps {
  buttonStyle?: ViewStyle
}

export const CustomButton: React.SFC<ICustomButtonComponentProps> = props => {
  const { buttonStyle, title, onPressAction, onLongPressAction } = props
  return (
    <TouchableHighlight style={[CustomButtonStyles.buttonContainer, buttonStyle]}
      onPress={onPressAction}
      onLongPress={onLongPressAction}
      underlayColor='#FFFFFF40'>
      <Text style={CustomButtonStyles.title}>{title}</Text>
    </TouchableHighlight>
  )
}

export const CustomButtonStyles = StyleSheet.create({
  buttonContainer: {
    flex: 1, marginHorizontal: 5, backgroundColor: 'gray', justifyContent: 'center', alignItems: 'center'
  },
  title: {
    height: 24,
    fontSize: 24,
    fontWeight: '300',
    lineHeight: Platform.select({
      ios: 0,
      android: 18
    }),
    textAlign: 'left',
    color: '#FFFFFF'
  }
})
