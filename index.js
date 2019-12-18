/**
 * @format
 */

import App from './App';
import TestScreen from './screens/TestScreen';
import ResultScreen from './screens/ResultScreen';
import {Navigation} from 'react-native-navigation';
import {Dimensions} from 'react-native';
import Drawer from './screens/Drawer';
import Rules from './screens/Rules';

Navigation.registerComponent('Home', () => App);
Navigation.registerComponent('TestScreen', () => TestScreen);
Navigation.registerComponent('ResultScreen', () => ResultScreen);
Navigation.registerComponent('Drawer', () => Drawer);
Navigation.registerComponent('Rules', () => Rules);

const {width} = Dimensions.get('window');
Navigation.events().registerAppLaunchedListener(() => {
  Navigation.setDefaultOptions({
    topBar: {
      elevation: 0,
      visible: true,
      drawBehind: true,
      animate: false,
      borderHeight: 1,
      leftButtons: [
        {
          icon: require('./images/Hamburger_icon.png'),
          id: 'drawerButton',
        },
      ],
      title: {
        color: 'white',
        alignment: 'center',
        text: 'Home',
      },
      background: {
        color: 'gray',
      },
    },
  });

  Navigation.setRoot({
    root: {
      sideMenu: {
        left: {
          component: {
            id: 'drawerId',
            name: 'Drawer',
            fixedWidth: width,
          },
        },
        center: {
          stack: {
            id: 'MAIN_STACK',
            children: [
              {
                component: {
                  id: 'homeScreen',
                  name: 'Home',
                },
              },
            ],
          },
        },
      },
    },
  }).then();
});

Navigation.events().registerNavigationButtonPressedListener(() => {
  Navigation.mergeOptions('drawerId', {
    sideMenu: {
      left: {
        visible: true,
      },
    },
  });
});
