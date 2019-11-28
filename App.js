import React from 'react';
import {View, Text, TouchableOpacity, ScrollView} from 'react-native';
import {goToTest, goToResult} from './navigation';
import {Navigation} from 'react-native-navigation';

import ResultScreen from './ResultScreen';
import TestScreen from './TestScreen';

export default class App extends React.Component {
  goToTest = i => {
    Navigation.push(this.props.componentId, {
      component: {
        name: 'TestScreen',
        passProps: {
          text: 'Test #',
        },
        options: {
          topBar: {
            title: {
              text: i,
            },
          },
        },
      },
    }).then();
  };

  goToResults = () => {
    Navigation.push(this.props.componentId, {
      component: {
        name: 'ResultScreen',
        passProps: {
          text: '',
        },
        options: {
          topBar: {
            title: {
              text: 'Results',
            },
          },
        },
      },
    }).then();
  };

  render() {
    let tests = [];

    for (let i = 0; i < 5; i++) {
      tests.push(
        <TouchableOpacity
          key={i}
          onPress={() => {
            this.goToTest(`Test #${i}`);
          }}>
          <Text>Go to Test #{i}</Text>
        </TouchableOpacity>,
      );
    }

    return (
      <View style={{flex: 1}}>
        <ScrollView>{tests}</ScrollView>

        <View>
          <TouchableOpacity
            onPress={() => {
              this.goToResults();
            }}>
            <Text style={{textAlign: 'center', fontSize: 18}}>
              Go to Result
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }
}
