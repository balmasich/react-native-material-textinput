import React, { useState, useEffect } from 'react'
import { View, Animated } from 'react-native'
import type { UnderlineProps } from './types'

const Underline = ({
  activeColor,
  underlineHeight = 1,
  underlineColor = 'gray',
  underlineDuration = 200,
  underlineActiveColor = '#3f51b5',
  underlineActiveHeight = 2,
  error,
  errorColor,
  focused
}: UnderlineProps) => {
  const [animatedScaleX] = useState(new Animated.Value(error ? 1 : 0.01))
  const [animatedOpacity] = useState(new Animated.Value(error ? 1 : 0))

  useEffect(() => {
    const isActive = focused || error
    let sequence = []

    if (isActive) {
      sequence.push(
        Animated.timing(animatedOpacity, {
          toValue: 1,
          duration: 0,
          useNativeDriver: true
        })
      )
    }

    sequence.push(
      Animated.timing(animatedScaleX, {
        toValue: isActive ? 1 : 0.01,
        duration: underlineDuration,
        useNativeDriver: true
      })
    )

    if (!isActive) {
      sequence.push(
        Animated.timing(animatedOpacity, {
          toValue: 0,
          duration: 0,
          useNativeDriver: true
        })
      )
    }
    if (isActive) {
      Animated.parallel(sequence).start()
    } else {
      Animated.sequence(sequence).start()
    }
  }, [focused, error])

  return (
    <View
      style={{
        borderColor: underlineColor,
        borderTopWidth: underlineHeight
      }}>
      <Animated.View
        style={{
          marginTop: -underlineHeight,
          transform: [{ scaleX: animatedScaleX }],
          opacity: animatedOpacity,
          borderColor: (error && errorColor) || activeColor || underlineActiveColor,
          borderTopWidth: underlineActiveHeight
        }}
      />
    </View>
  )
}

export default Underline
