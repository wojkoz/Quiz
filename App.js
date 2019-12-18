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

import _ from 'lodash';

export default class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      data: [],
    };

    this.getData();
    this.storeData();
  }

  getTestsFromAPIAsync() {
    return fetch('http://www.tgryl.pl/quiz/tests')
      .then(response => response.json())
      .then(responseJson => {
        this.setState({data: _.shuffle(responseJson)});
      })
      .catch(error => {
        alert(error);
      });
  }

  goToTest = (title, numberOfTasks, id) => {
    Navigation.push(this.props.componentId, {
      component: {
        name: 'TestScreen',
        passProps: {
          ti: title,
          numberOfTasks: numberOfTasks,
          task_id: id,
        },
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
      await AsyncStorage.setItem('@key1', 'true');
    } catch (e) {
      // saving error
    }
  };

  getData = async () => {
    try {
      const value = await AsyncStorage.getItem('@key1');
      if (value !== null) {
      } else {
        this.goToRules();
      }
    } catch (e) {
      // error reading value
    }
  };

  componentDidMount() {
    this.getTestsFromAPIAsync();
  }

  render() {
    let testsArr = [];
    const data = this.state.data;

    for (let i = 0; i < data.length; i++) {
      testsArr.push(
        <TouchableOpacity
          style={styles.testStyle}
          key={i}
          onPress={() => {
            this.goToTest(`Test #${i + 1}`, data[i].numberOfTasks, data[i].id);
          }}>
          <TestComponent
            title={`Test #${i + 1}`}
            tags={data[i].tags}
            desc={data[i].description}
          />
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
