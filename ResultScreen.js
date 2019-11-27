import React from 'react';
import {
  SafeAreaView,
  StyleSheet,
  ScrollView,
  View,
  Text,
  StatusBar,
  TouchableOpacity,
} from 'react-native';
import {goToHome} from './navigation';

export default class ResultScreen extends React.Component {
  static get options() {
    return {
      topBar: {
        title: {
          text: 'Result',
        },
      },
    };
  }

  render() {
    return (
      <View>
        <Text>ResultScreen Works</Text>

        <View>
          <TouchableOpacity
            onPress={() => {
              goToHome();
            }}>
            <Text>Back to HOME</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }
}
