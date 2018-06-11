import * as React from 'react'
import {
  Platform,
  StyleSheet,
  Text,
  View,
  ViewStyle
} from 'react-native'
import { Button } from 'react-native-elements'

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
  titleStyle?: ViewStyle
}

export const CustomButton: React.SFC<ICustomButtonComponentProps> = props => {
  const { buttonStyle, title, titleStyle, onPressAction, onLongPressAction } = props
  return (
    <View style={[CustomButtonStyles.buttonContainer, buttonStyle]}>
      <Button
        buttonStyle={{backgroundColor: 'transparent'}}
        title={title}
        textStyle={CustomButtonStyles.title}
        onPress={onPressAction}
        onLongPress={onLongPressAction}/>
    </View>
  )
}

export const CustomButtonStyles = StyleSheet.create({
  buttonContainer: {
    flex: 1, backgroundColor: 'transparent', justifyContent: 'center'
  },
  title: {
    height: 24,
    fontSize: 24,
    fontWeight: '300',
    lineHeight: Platform.select({
      ios: 0,
      android: 26
    }),
    textAlign: 'left',
    color: '#FFFFFF'
  }
})
