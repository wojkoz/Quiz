import React from 'react';
import {View, Text, TouchableOpacity, ScrollView} from 'react-native';
import {goToTest, goToResult} from './navigation';
import {Navigation} from 'react-native-navigation';

export default class App extends React.Component {
  static get options() {
    return {
      topBar: {
        title: {
          text: 'Home',
        },
      },
    };
  }

  render() {
    let tests = [];

    for (let i = 0; i < 5; i++) {
      tests.push(
        <TouchableOpacity
          key={i}
          onPress={() => {
            goToTest({i});
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
              goToResult();
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
