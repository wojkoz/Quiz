import React from 'react';
import {View, Text, StyleSheet} from 'react-native';

const ResultListItem = props => {
  return (
    <View style={{margin: 10, marginBottom: 0, backgroundColor: 'gray'}}>
      <Text style={styles.text}>Nick: {props.item.nick}</Text>
      <Text style={styles.text}>Score: {props.item.score}</Text>
      <Text style={styles.text}>Total: {props.item.total}</Text>
      <Text style={styles.text}>Type: {props.item.type}</Text>
      <Text style={styles.text}>Date: {props.item.date}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  text: {
    fontSize: 20,
  },
});

export default ResultListItem;
