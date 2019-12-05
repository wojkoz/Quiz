import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  StyleSheet,
} from 'react-native';
import {Navigation} from 'react-native-navigation';
import AsyncStorage from '@react-native-community/async-storage';

import TestComponent from './components/TestComponent';
import {tests} from './objects/Tests';

export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {show: true};

    this.getData();
    this.storeData();
  }


  goToTest = (title, testObejct) => {
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

  goToRules = () => {
    Navigation.push(this.props.componentId, {
      component: {
        name: 'Rules',
        passProps: {
          text: '',
        },
        options: {
          topBar: {
            title: {
              text: 'Rules',
              alignment: 'center',
            },
          },
        },
      },
    }).then();
  };


  storeData = async () => {
    try {
      await AsyncStorage.setItem('@regulain_Key', 'true');
    } catch (e) {
      // saving error
    }
  };

  getData = async () => {
    try {
      const value = await AsyncStorage.getItem('@regulain_Key');
      if (value !== null) {
        this.setState({show: 'false'});
      } else {
        this.goToRules();
      }
    } catch (e) {
      // error reading value
    }
  };


  render() {
    let testsArr = [];

    for (let i = 0; i < tests.length; i++) {
      testsArr.push(
        <TouchableOpacity
          style={styles.testStyle}
          key={i}
          onPress={() => {
            this.goToTest(tests[i].title, tests[i]);
          }}>
          <TestComponent title={tests[i].title} tags={'#tag1 #tag2'} />
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
