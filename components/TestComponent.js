import React from 'react';
import {View, Text, H1} from 'react-native';

const TestComponent = props => {
  return (
    <View style={{borderRadius: 20, borderColor: 'gray', borderWidth: 3}}>
      <Text style={{fontSize: 16, textAlign: 'center'}}>{props.title}</Text>
      <View>
        <Text
          style={{
            fontSize: 12,
            marginLeft: 10,
            fontFamily: 'LilitaOne-Regular',
          }}>
          {props.tags.join(' ')}
        </Text>
      </View>
      <View>
        <Text style={{margin: 15, fontFamily: 'Roboto-Italic'}}>
          {props.desc}
        </Text>
      </View>
    </View>
  );
};

export default TestComponent;
