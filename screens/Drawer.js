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
import {tasks} from '../objects/Quiz';

export default class Drawer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [],
    };
  }

  chooseName(text, title = '') {
    if (title === '') {
      if (text === 'ResultScreen') return 'Results';
      else return 'Home';
    } else return title;
  }

  goToScreen = (screenName, title = '') => {
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
              text: this.chooseName(screenName, title),
            },
          },
        },
      },
    });
  };

  goToTest = (title, numberOfTasks, id) => {
    Navigation.push('MAIN_STACK', {
      component: {
        name: 'TestScreen',
        passProps: {
          ti: title,
          numberOfTasks: numberOfTasks,
          id: id,
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

  getTestsFromAPIAsync() {
    return fetch('http://www.tgryl.pl/quiz/tests')
      .then(response => response.json())
      .then(responseJson => {
        this.setState({data: responseJson});
      })
      .catch(error => {
        alert(error);
      });
  }

  componentDidMount() {
    this.getTestsFromAPIAsync();
  }

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

            {tasks.map((task, id) => {
              id++;
              return (
                <TouchableOpacity
                  key={id}
                  style={styles.buttonStyle}
                  onPress={() =>
                    this.goToTest(`Test #${id}`, task.numberOfTasks, task.id)
                  }>
                  <Text style={styles.buttonText}>{`Test #${id}`}</Text>
                </TouchableOpacity>
              );
            }, 0)}
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
    fontFamily: 'Roboto-Black',
  },
  buttonText: {
    fontSize: 20,
  },
});
