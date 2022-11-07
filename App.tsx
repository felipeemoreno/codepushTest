import React, {useEffect} from 'react';
import {View, Text, StyleSheet, Alert} from 'react-native';
import Repos from './src/components/Repos';
import codePush from 'react-native-code-push';

let codePushOptions = {
  checkFrequency: codePush.CheckFrequency.ON_APP_RESUME,
  installMode: codePush.InstallMode.ON_NEXT_RESTART,
  // updateDialog: {appendReleaseDescription: true},
};

const App = () => {
  useEffect(() => {
    codePush.checkForUpdate().then(update => {
      if (!update) {
        Alert.alert('The app is up to date!');
        console.log('The app is up to date!');
      } else {
        Alert.alert(
          'An update is available! Should we download it?',
          update.appVersion,
        );
        console.log('An update is available! Should we download it?');
      }
    });
  }, []);

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.text}>Lista de Repos</Text>
      </View>
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
  header: {
    backgroundColor: '#666',
  },
  text: {
    color: '#63fa43',
    fontSize: 30,
    fontWeight: 'bold',
    padding: 20,
    marginBottom: 30,
  },
});

export default codePush(codePushOptions)(App);
