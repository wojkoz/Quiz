import React from 'react';
import {View, Text, H1} from 'react-native';

const TestComponent = props => {
  return (
    <View style={{borderRadius: 20, borderColor: 'gray', borderWidth: 3}}>
      <Text style={{fontSize: 16, textAlign: 'center'}}>{props.title}</Text>
      <View>
        <Text style={{fontSize: 12, paddingLeft: 10}}>{props.tags}</Text>
      </View>
      <View>
        <Text style={{margin: 15}}>Bardzo dlugi i ciekawy opis</Text>
      </View>
    </View>
  );
};

export default TestComponent;
