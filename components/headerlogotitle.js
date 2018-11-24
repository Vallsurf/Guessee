import React, { Component } from 'react'
import {
    Image,
    Platform,
    ScrollView,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
  } from 'react-native';

export default class HeaderLogoTitle extends Component {
  render() {
    return (
        <Image
            source={require('../assets/images/guesseelogo.png')}
            style={{ width: 130, height: 40 }}
        />
    )
  }
}
