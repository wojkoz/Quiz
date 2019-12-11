import React from 'react';
import {View, Text, StyleSheet} from 'react-native';
import QuizTestComponent from '../components/QuizTestComponent';
import {Navigation} from 'react-native-navigation';

export default class TestScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: true,
      progress: 0,
      time: 0,
      data: {},
      tasks: [],
      task: {},
      result: {
        score: 0,
        nick: 'Mariuszek',
        total: '',
        type: '',
        date: '',
      },
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
    this.setState(() => ({
      time: duration,
      progress: 0,
    })),
      (this.interval = setInterval(
        () =>
          this.setState(prev => ({
            progress: prev.progress + 0.033,
            time: prev.time - 1,
          })),
        1000,
      ));
  }

  checkAnserw(id) {
    const arr = this.state.task.answers;

    if (arr[id].isCorrect) {
      this.setState(prev => ({
        result: {
          score: prev.result.score + 2,
        },
        currId: prev.currId < this.props.numberOfTasks ? prev.currId + 1 : null,
        task: this.state.tasks[this.state.currId],
      }));
    } else {
      this.setState(prev => ({
        currId: prev.currId < this.props.numberOfTasks ? prev.currId + 1 : null,
        task: this.state.tasks[this.state.currId],
      }));
    }
    this.setProgress(this.state.task.duration);
  }

  sendResultAsync(result) {
    fetch('http://tgryl.pl/quiz/results', {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(result),
    });
  }

  goToResults() {
    var date = new Date().getDate(); //Current Date
    var month = new Date().getMonth() + 1; //Current Month
    var year = new Date().getFullYear(); //Current Year

    const result = {
      score: this.state.result.score,
      nick: 'Mariuszek',
      total: this.props.numberOfTasks,
      type: this.state.data.tags[0],
      date: date + '-' + month + '-' + year,
    };

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

  timeIsZero() {
    clearInterval(this.interval);
    this.setState(prev => ({
      currId: prev.currId < this.props.numberOfTasks ? prev.currId + 1 : null,
      task: this.state.tasks[this.state.currId + 1],
    }));
    this.setProgress(this.state.task.duration);
  }

  render() {
    if (this.state.time <= 0) {
      this.timeIsZero();
    }
    if (this.state.currId >= this.props.numberOfTasks) {
      this.goToResults();
      this.setState({loading: true});
    }

    return (
      <View>
        <View>
          {this.state.loading === false ? (
            <QuizTestComponent
              currQuestion={this.state.currId}
              amountofQuestions={this.props.numberOfTasks}
              time={this.state.time}
              progress={this.state.progress}
              question={this.state.task.question}
              answers={this.state.task.answers}
              func={this.checkAnserw.bind(this)}
              prog={this.setProgress.bind(this)}
            />
          ) : null}
        </View>
        <Text>Score : {this.state.result.score}</Text>
      </View>
    );
  }
}
const styles = StyleSheet.create({});
