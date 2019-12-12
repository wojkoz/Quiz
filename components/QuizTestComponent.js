import React from 'react';
import {
  View,
  Text,
  ProgressBarAndroid,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';

export default class QuizTestComponent extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }


  render() {
    let anw = this.props.answers;

    let buttons = [];
    for (let i = 0; i < anw.length; i++) {
      buttons.push(
        <TouchableOpacity
          key={i}
          onPress={() => {
            this.props.func(i);
          }}
          style={styles.buttons}>
          <Text>{anw[i].content}</Text>
        </TouchableOpacity>,
      );
    }
    return (
      <View>
        <View>
          <View style={{marginLeft: 10}}>
            <Text>
              Question {this.props.currQuestion} of
              {' ' + this.props.amountofQuestions}
            </Text>
            <Text>{this.props.time}</Text>
          </View>
          <View style={styles.container}>
            <ProgressBarAndroid
              styleAttr="Horizontal"
              indeterminate={false}
              progress={this.props.progress}
              animating={true}
            />
          </View>
        </View>
        <View>
          <Text style={{fontSize: 18, textAlign: 'center'}}>
            {this.props.question}
          </Text>
          <View style={styles.buttonContainer}>{buttons}</View>
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
