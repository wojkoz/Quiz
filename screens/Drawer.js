import React, {Component} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Image,
  ScrollView,
} from 'react-native';
import {Navigation} from 'react-native-navigation';
import {tests} from '../tests/Tests';

export default class Drawer extends Component {
  chooseName(text) {
    if (text === 'ResultScreen') return 'Results';
    else if (text === 'Home') return 'Home';
    else return text;
  }

  goToScreen = screenName => {
    Navigation.mergeOptions('drawerId', {
      sideMenu: {
        left: {
          visible: false,
        },
      },
    });
    Navigation.push('MAIN_STACK', {
      component: {
        name: screenName,
        options: {
          topBar: {
            title: {
              text: this.chooseName(screenName),
            },
          },
        },
      },
    });
  };

  render() {
    return (
      <View style={styles.viewStyle}>
        <View style={styles.container}>
          <Text style={{fontSize: 30}}>Quiz </Text>
          <Image
            style={{width: 250, height: 250}}
            source={require('../images/hamburger.png')}
          />
        </View>
        <View style={styles.container}>
          <ScrollView style={{width: '100%'}}>
            <TouchableOpacity
              style={styles.buttonStyle}
              onPress={() => this.goToScreen('Home')}>
              <Text style={styles.buttonText}>Home</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.buttonStyle}
              onPress={() => this.goToScreen('ResultScreen')}>
              <Text style={styles.buttonText}>Results</Text>
            </TouchableOpacity>
            <View
              style={{
                borderBottomWidth: 5,
                width: '100%',
                marginTop: 10,
              }}></View>

            {/**
              testy map
               */}

            {tests.map(test => {
              return (
                <TouchableOpacity
                  key={test.id}
                  style={styles.buttonStyle}
                  onPress={() => this.goToScreen('TestScreen')}>
                  <Text style={styles.buttonText}>{test.title}</Text>
                </TouchableOpacity>
              );
            })}
          </ScrollView>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    justifyContent: 'center',
    alignItems: 'center',
  },
  viewStyle: {
    flex: 1,
  },
  buttonStyle: {
    marginTop: 10,
    paddingTop: 15,
    paddingBottom: 15,
    marginLeft: 15,
    marginRight: 15,
    backgroundColor: 'gray',
    borderRadius: 10,
    borderWidth: 2,
    borderColor: 'black',
    alignItems: 'center',
    width: '90%',
  },
  buttonText: {
    fontSize: 20,
  },
});
