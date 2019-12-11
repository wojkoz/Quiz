import React from 'react';
import {
  View,
  FlatList,
  RefreshControl,
  ScrollView,
  StyleSheet,
} from 'react-native';
import ResultListitem from '../components/ResultListItem';

export default class ResultScreen extends React.Component {
  state = {
    refreshing: false,
    data: [],
  };

  getResultsFromAPIAsync() {
    return fetch('http://www.tgryl.pl/quiz/results')
      .then(response => response.json())
      .then(responseJson => {
        this.setState({data: responseJson});
      })
      .catch(error => {
        alert(error);
      });
  }
  componentDidMount() {
    this.getResultsFromAPIAsync();
  }

  render() {
    return (
      <View>
        <FlatList
          data={this.state.data}
          renderItem={({item}) => <ResultListitem item={item}></ResultListitem>}
          keyExtractor={item => item.nick + Math.random()}
          refreshControl={this._refreshControl()}
        />
      </View>
    );
  }

  _refreshControl() {
    return (
      <RefreshControl
        refreshing={this.state.refreshing}
        onRefresh={() => this._refreshListView()}
      />
    );
  }

  _refreshListView() {
    //Start Rendering Spinner
    this.setState({refreshing: true});

    this.getResultsFromAPIAsync();

    this.setState({refreshing: false}); //Stop Rendering Spinner
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 5,
  },
  scrollView: {
    flex: 1,
    backgroundColor: 'pink',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
