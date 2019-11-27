/**
 * @format
 */

import {Navigation} from 'react-native-navigation';
import App from './App';
import ResultScreen from './ResultScreen';
import TestScreen from './TestScreen';

Navigation.registerComponent('Home', () => App);
Navigation.registerComponent('TestScreen', () => TestScreen);
Navigation.registerComponent('ResultScreen', () => ResultScreen);

Navigation.events().registerAppLaunchedListener(() => {
  Navigation.setRoot({
    root: {
      component: {
        name: 'Home',
        topBar: {
          title: {
            text: 'Home',
          },
        },
      },
    },
  });
});
