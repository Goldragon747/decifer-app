import React from 'react';
import { createAppContainer, createStackNavigator } from 'react-navigation';
import HomeScreen from '../screens/HomeScreen';
import CaesarScreen from '../screens/CaesarScreen';
import FrequencyAnalysis from '../screens/FrequencyAnalysis';
export default createAppContainer(createStackNavigator({
  // You could add another route here for authentication.
  // Read more at https://reactnavigation.org/docs/en/auth-flow.html
  Main: HomeScreen,
  Caesar: CaesarScreen,
  FrequencyAnalysis: FrequencyAnalysis
}));