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

export default class Drawer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [],
      loading: true,
    };
  }

  chooseName(text, title = '') {
    if (title === '') {
      if (text === 'Result') {
        return 'Results';
      } else {
        return 'Home';
      }
    } else {
      return title;
    }
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
  componentDidMount() {
    this.getTestsFromAPIAsync();
    this.setState({
      loading: false,
    });
  }
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

  createButtons() {
    let buttons = [];
    alert(this.state.data[0].id);

    for (let i = 0; i < this.state.data.length; i++) {
      buttons.push(
        <TouchableOpacity
          key={i}
          style={styles.scrollViewButtons}
          onPress={() =>
            this.goToTest(
              `Test #${i + 1}`,
              this.state.data[i].numberOfTasks,
              this.state.data[i].id,
            )
          }>
          <Text style={styles.textStyle}>{`Test #${i + 1}`}</Text>
        </TouchableOpacity>,
      );
    }

    return buttons;
  }

  render() {
    if (this.state.loading === true) {
      return (
        <View>
          <Text>Loading...</Text>
        </View>
      );
    } else {
      return (
        <View style={styles.container}>
          <View style={styles.titleView}>
            <Text style={styles.titleText}>Quiz App</Text>
          </View>
          <Image
            style={{width: 250, height: 250, alignSelf: 'center'}}
            source={require('../images/hamburger.png')}
          />
          <TouchableOpacity
            style={styles.buttons}
            onPress={() => this.goToScreen('Home')}>
            <Text style={styles.textStyle}>Home</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.buttons}
            onPress={() => this.goToScreen('Result')}>
            <Text style={styles.textStyle}>Results</Text>
          </TouchableOpacity>
          <View style={{flex: 3}}>
            <ScrollView
              contentContainerStyle={{
                flexGrow: 1,
                justifyContent: 'space-between',
              }}>
              {this.createButtons()}
            </ScrollView>
          </View>
        </View>
      );
    }
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'gray',
  },
  scrollViewStyle: {
    width: '100%',
  },
  scrollViewButtons: {
    height: 60,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 10,
    marginLeft: 10,
    marginRight: 10,
    borderRadius: 10,
    borderStyle: 'solid',
    borderWidth: 3,
  },
  buttons: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 10,
    marginLeft: 10,
    marginRight: 10,
    borderRadius: 10,
    borderStyle: 'solid',
    borderWidth: 3,
    fontFamily: 'Roboto-Medium',
    fontSize: 18,
  },
  imageStyle: {
    flex: 3,
    backgroundColor: 'black',
    marginBottom: 10,
  },
  titleText: {
    color: 'white',
    fontSize: 24,
  },
  textStyle: {
    color: '#eeeeee',
  },
  titleView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'gray',
  },
});
