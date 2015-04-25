var React = require('react-native');
var Parse = require('parse').Parse;
var ParseReact = require('parse-react');
var Icon = require('FAKIconImage');

var {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  Image,
  TabBarIOS,
  NavigatorIOS,
  ListView
} = React;

var OutfitCard = require('./OutfitCard');

var FeaturedView = React.createClass({
  getInitialState: function () {
    var ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});

    return {
      dataSource: ds.cloneWithRows(['row 1', 'row 2']),
    };
  },

  renderRow: function (rowData) {
    return (
      <OutfitCard />
    );
  },

  render: function() {
    return (
      <ListView
        dataSource={this.state.dataSource}
        renderRow={this.renderRow}
        contentContainerStyle={styles.container}
        automaticallyAdjustContentInsets={false}
      />
    );
  }
});

var styles = StyleSheet.create({  
  container: {
    paddingTop: 64,
    paddingBottom: 64,
    backgroundColor: '#EEEEEE',
  },
});

module.exports = FeaturedView;