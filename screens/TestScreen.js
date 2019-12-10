import React from 'react';
import {
  View,
  Text,
  ProgressBarAndroid,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import {results} from '../objects/ResultObject';

export default class TestScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      progress: 0,
      time: 0,
    };
  }
  componentDidMount() {
    this.setState(() => ({
      time: this.props.test.duration,
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
  componentWillUnmount() {
    clearInterval(this.interval);
  }

  checkAnserw(id) {
    const arr = this.props.test.answers;

    for (let i = 0; i < arr.length; i++) {
      if (id === arr[i].isCorrect) {
        results.push({
          nick: '' + Math.random(),
          score: 18,
          total: 20,
          type: 'historia',
          date: '2018-11-22',
        });
      }
    }
  }

  render() {
    return (
      <View>
        {this.state.time <= 0 ? clearInterval(this.interval) : null}
        <View>
          <View style={{marginLeft: 10}}>
            <Text>
              Question {this.props.currQuestion} of
              {' ' + this.props.amountofQuestions}
            </Text>
            <Text>{this.state.time}</Text>
          </View>
          <View style={styles.container}>
            <ProgressBarAndroid
              styleAttr="Horizontal"
              indeterminate={false}
              progress={this.state.progress}
              animating={true}
            />
          </View>
        </View>
        <View>
          <Text style={{fontSize: 18, textAlign: 'center'}}>
            {this.props.test.question}
          </Text>
          <View style={styles.buttonContainer}>
            <TouchableOpacity style={styles.buttons}>
              <Text>{this.props.test.answers[0].content}</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.buttons}>
              <Text>{this.props.test.answers[1].content}</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.buttons}>
              <Text> {this.props.test.answers[2].content}</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.buttons}>
              <Text>{this.props.test.answers[3].content}</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    );
  }
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'space-evenly',
    padding: 10,
  },
  buttonContainer: {
    flex: 1,
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  buttons: {
    flex: 1,
    margin: 15,
    backgroundColor: 'gray',
    padding: 5,
  },
});
