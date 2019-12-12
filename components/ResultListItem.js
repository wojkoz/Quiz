import React from 'react';
import {View, Text, StyleSheet} from 'react-native';

const ResultListItem = props => {
  return (
    <View style={{margin: 10, marginBottom: 0, backgroundColor: 'gray'}}>
      <Text style={styles.text}>{props.item.nick}</Text>
      <Text style={styles.text}>{props.item.score}</Text>
      <Text style={styles.text}>{props.item.total}</Text>
      <Text style={styles.text}>{props.item.type}</Text>
      <Text style={styles.text}>{props.item.date}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  text: {
    fontSize: 20,
  },
});

export default ResultListItem;
