import React from 'react'
import { Text } from 'react-native'
import type { ErrorHelperProps } from './types'

const ErrorHelper = ({ error, errorColor = '#fc1f4a', errorPaddingTop = 8, errorFontSize = 12 }: ErrorHelperProps) => {
  return (
    <Text
      style={{
        paddingTop: errorPaddingTop,
        color: errorColor,
        textAlign: 'left',
        fontSize: errorFontSize
      }}>
      {error}
    </Text>
  )
}

export default ErrorHelper
