import React from 'react';
import {View, Text, StyleSheet} from 'react-native';
import Repos from './src/components/Repos';
import codePush from 'react-native-code-push';

let codePushOptions = {
  checkFrequency: codePush.CheckFrequency.ON_APP_RESUME,
  updateDialog: {appendReleaseDescription: true},
};

const App = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>Olá Felipe</Text>
      <Repos />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 10,
  },
  text: {
    color: '#000',
    fontSize: 30,
    fontWeight: 'bold',
    padding: 20,
  },
});

export default codePush(codePushOptions)(App);
