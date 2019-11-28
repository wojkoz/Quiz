import React from 'react';
import {
  SafeAreaView,
  StyleSheet,
  ScrollView,
  View,
  Text,
  TouchableOpacity,
} from 'react-native';
import {goToHome} from './navigation';
import {Navigation} from 'react-native-navigation';

export default class TestScreen extends React.Component {

  render() {
    return (
      <View>
        <View>
          <Text> TestScreen Works</Text>
        </View>

      </View>
    );
  }
}
