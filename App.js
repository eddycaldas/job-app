import Expo from 'expo';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import  { Card, Button } from 'react-native-elements';
import { TabNavigator, StackNavigator } from 'react-navigation';
import { Provider } from 'react-redux';


import store from './store'
import AuthScreen from './screens/AuthScreen';
import WelcomeScreen from './screens/WelcomeScreen';
import MapScreen from './screens/MapScreen';
import DeckScreen from './screens/DeckScreen';
import SettingsScreen from './screens/SettingsScreen';
import ReviewScreen from './screens/ReviewScreen';




export default class App extends React.Component {
  
  render() {
    const MainNavigator = TabNavigator({
      welcome: { screen: WelcomeScreen },
      auth: { screen: AuthScreen },
      main: {
        screen: TabNavigator({
          map: { screen: MapScreen },
          deck: { screen: DeckScreen },
          // review: {
          //   screen: StackNavigator({
          //     review: { screen: ReviewScreen },
          //     settings: { screen: SettingsScreen }
          //   })
          // }
        })
      }
    }, {
      navigationOptions: {
        tabBarVisible : false 
      },
      lazy: true,
      swipeEnabled: false,
      animationEnabled: false
    });
    
    return (
      <Provider store={store}>
        <View style={styles.container}>
          <MainNavigator />
        </View>
      </Provider>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    justifyContent: 'center',
  },
});
