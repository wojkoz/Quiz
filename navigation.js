import {Navigation} from 'react-native-navigation';

export const goToTest = i =>
  Navigation.setRoot({
    root: {
      stack: {
        id: 'TestScreen',
        children: [
          {
            component: {
              name: 'TestScreen',
              testNumber: i,
            },
          },
        ],
      },
    },
  });

export const goToResult = () =>
  Navigation.setRoot({
    root: {
      stack: {
        id: 'ResultScreen',
        children: [
          {
            component: {
              name: 'ResultScreen',
            },
          },
        ],
      },
    },
  });

export const goToHome = () =>
  Navigation.setRoot({
    root: {
      stack: {
        id: 'Home',
        children: [
          {
            component: {
              name: 'Home',
            },
          },
        ],
      },
    },
  });
