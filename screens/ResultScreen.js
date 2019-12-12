import React from 'react';
import {
  View,
  FlatList,
  RefreshControl,
  ScrollView,
  StyleSheet,
} from 'react-native';
import {results} from '../objects/ResultObject';
import ResultListItem from '../components/ResultListItem';

export default class ResultScreen extends React.Component {
  state = {
    refreshing: false,
    data: results,
  };

  render() {
    return (
      <View>
        <FlatList
          data={this.state.data}
          renderItem={({item}) => <ResultListItem item={item} />}
          keyExtractor={item => item.nick}
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
    results.push({
      nick: `${Math.random()}`,
      score: 18,
      total: 20,
      type: 'historia',
      date: '2018-11-22',
    });

    //Updating the dataSource with new data
    this.setState({data: results});
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
