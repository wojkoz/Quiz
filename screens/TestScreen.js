import React from 'react';
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';

import QuizComponent from '../components/QuizTestComponent';
import {Navigation} from 'react-native-navigation';

export default class TestScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isNext: false,
      loading: true,
      progress: 0,
      time: 0,
      data: {},
      tasks: [],
      task: {},

      nick: 'Mariuszek',
      total: '',
      type: '',
      score: 0,

      currId: 0,
    };
  }

  getTestFromAPIAsync() {
    return fetch(`http://www.tgryl.pl/quiz/test/${this.props.task_id}`)
      .then(response => response.json())
      .then(responseJson => {
        this.setState({
          loading: false,
          data: responseJson,
          tasks: responseJson.tasks,
          task: responseJson.tasks[0],
          time: responseJson.tasks[0].duration,
        });
      })
      .catch(error => {
        alert(error);
      });
  }

  componentDidMount() {
    this.getTestFromAPIAsync();
  }

  componentWillUnmount() {
    clearInterval(this.interval);
  }

  setProgress(duration) {
    clearInterval(this.interval);
    this.setState(() => ({
      time: duration,
      progress: 0,
    })),
      (this.interval = setInterval(
        () =>
          this.setState(prev => ({
            progress: prev.progress + 1.0 / this.state.task.duration,
            time: prev.time - 1,
          })),
        1000,
      ));
  }

  checkAnserw(id) {
    const arr = this.state.task.answers;

    if (arr[id].isCorrect) {
      this.setState(prev => ({
        score: prev.score + 1,

        currId:
          prev.currId <= this.props.numberOfTasks ? prev.currId + 1 : null,
        task: this.state.tasks[this.state.currId],
      }));
    } else {
      this.setState(prev => ({
        currId:
          prev.currId <= this.props.numberOfTasks ? prev.currId + 1 : null,
        task: this.state.tasks[this.state.currId],
      }));
    }

    this.setProgress(this.state.task.duration);
  }

  sendResultAsync(result) {
    fetch('http://tgryl.pl/quiz/result', {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(result),
    }).then(null);
  }

  goToResults() {
    const date = new Date().getDate(); //Current Date
    const month = new Date().getMonth() + 1; //Current Month
    const year = new Date().getFullYear(); //Current Year

    const result = {
      nick: this.state.nick,
      score: this.state.score,
      total: this.props.numberOfTasks,
      type: this.state.data.tags[0],
      date: date + '-' + month + '-' + year,
    };

    //wysylanie
    this.sendResultAsync(result);

    Navigation.push('MAIN_STACK', {
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
  }

  isMaxLenght() {
    if (this.state.currId > this.props.numberOfTasks) {
      return false;
    } else {
      return true;
    }
  }

  timeIsZero() {
    clearInterval(this.interval);
    this.setState(prev => ({
      currId: prev.currId < this.props.numberOfTasks ? prev.currId + 1 : null,
      task: this.state.tasks[this.state.currId + 1],
    }));
    this.setProgress(this.state.task.duration);
  }

  onChangeText(text) {
    this.setState({
      nick: text,
    });
  }

  render() {
    if (this.isMaxLenght()) {
      if (this.state.time <= 0) {
        this.timeIsZero();
      }
      if (this.state.loading === true) {
        return <View />;
      }
      return (
        <QuizComponent
          currQuestion={this.state.currId}
          amountofQuestions={this.props.numberOfTasks}
          time={this.state.time}
          progress={this.state.progress}
          question={this.state.task.question}
          answers={this.state.task.answers}
          func={this.checkAnserw.bind(this)}
          score={this.state.score}
        />
      );
    } else {
      clearInterval(this.interval);
      return (
        <View style={styles.container}>
          <TouchableOpacity
            onPress={() => {
              this.goToResults();
            }}>
            <Text
              style={{
                color: 'white',
                textAlign: 'center',
                marginTop: '50%',
                fontSize: 30,
              }}>
              Zakoncz test!
            </Text>
          </TouchableOpacity>
          <TextInput
            style={{height: 40, borderColor: 'gray', borderWidth: 1}}
            onChangeText={text => {
              this.onChangeText(text);
            }}
            value={this.state.nick}
          />
        </View>
      );
    }
  }
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
    backgroundColor: '#393e46',
    justifyContent: 'space-between',
  },
});
