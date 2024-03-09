/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import React from 'react';
import {SafeAreaView, StyleSheet} from 'react-native';
import PlayBoard from './src/screens/play-board';
import Login from './src/screens/login';
import {Provider} from 'react-redux';
import store from './src/store';
import History from './src/screens/history';
import Status from './src/screens/status';

const Stack = createNativeStackNavigator();

function App(): React.JSX.Element {
  return (
    <Provider store={store}>
      <SafeAreaView style={styles.view}>
        <NavigationContainer>
          <Stack.Navigator>
            <Stack.Screen name="Login" component={Login} />
            <Stack.Screen name="PlayBoard" component={PlayBoard} />
            <Stack.Screen name="History" component={History} />
            <Stack.Screen name="Status" component={Status} />
          </Stack.Navigator>
        </NavigationContainer>
      </SafeAreaView>
    </Provider>
  );
}

const styles = StyleSheet.create({
  view: {
    flex: 1,
  },
});

export default App;
