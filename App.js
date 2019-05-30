/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, {Component} from 'react';
import {Platform, SafeAreaView, StyleSheet, Text, View} from 'react-native';

type Props = {};
export default class App extends Component<Props> {
  render() {
    return (
      <SafeAreaView style={styles.first}>
        <View ref='first'>
          <Text>Teste</Text>
        </View>
        <View ref='second' style={styles.second}>
        </View>
      </SafeAreaView>
    );
  }
}

const styles = StyleSheet.create({
  
});
