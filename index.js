/**
 * @format
 */
import {gestureHandlerRootHOC} from 'react-native-gesture-handler';
import {Navigation} from 'react-native-navigation';
import App from './App';
import ResultScreen from './screens/ResultScreen';
import TestScreen from './screens/TestScreen';
import {Dimensions} from 'react-native';
import Drawer from './screens/Drawer';
import Rules from './screens/Rules';

Navigation.registerComponent('Home', () => gestureHandlerRootHOC(App));
Navigation.registerComponent('TestScreen', () =>
  gestureHandlerRootHOC(TestScreen),
);
Navigation.registerComponent('ResultScreen', () =>
  gestureHandlerRootHOC(ResultScreen),
);
Navigation.registerComponent('Drawer', () => gestureHandlerRootHOC(Drawer));
Navigation.registerComponent('Rules', () => gestureHandlerRootHOC(Rules));

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
