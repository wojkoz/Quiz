import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  StyleSheet,
} from 'react-native';
import {Navigation} from 'react-native-navigation';

import ResultScreen from './screens/ResultScreen';
import TestScreen from './screens/TestScreen';
import TestComponent from './components/TestComponent';
import {tests} from './tests/Tests';

export default class App extends React.Component {
  goToTest = title => {
    Navigation.push(this.props.componentId, {
      component: {
        name: 'TestScreen',
        passProps: {},
        options: {
          topBar: {
            title: {
              text: title,
              alignment: 'center',
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
              alignment: 'center',
            },
          },
        },
      },
    }).then();
  };

  render() {
    let testsArr = [];

    for (let i = 0; i < tests.length; i++) {
      testsArr.push(
        <TouchableOpacity
          style={styles.testStyle}
          key={i}
          onPress={() => {
            this.goToTest(tests[i].title);
          }}>
          <TestComponent
            title={tests[i].title}
            tags={`#tag1 #tag2`}></TestComponent>
        </TouchableOpacity>,
      );
    }

    return (
      <View style={{flex: 1}}>
        <ScrollView>{testsArr}</ScrollView>

        <View>
          <TouchableOpacity
            onPress={() => {
              this.goToResults();
            }}>
            <Text
              style={{textAlign: 'center', fontSize: 24, fontFamily: 'arial'}}>
              Result
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }
}
const styles = StyleSheet.create({
  testStyle: {
    margin: 15,
  },
});
