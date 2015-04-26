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
  ListView,
  TouchableWithoutFeedback
} = React;

var OutfitCard = require('./OutfitCard');
var LoadingScreen = require('./LoadingScreen');

var FeaturedView = React.createClass({
  mixins: [ParseReact.Mixin],

  observe: function() {
    // Subscribe to all Comment objects, ordered by creation date
    // The results will be available at this.data.comments
    return {
      user: ParseReact.currentUser,
      styles: (new Parse.Query('Styles')).descending('createdAt')
    };
  },

  getInitialState: function () {

    return {
      templateDataSource: new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2}),
    };
  },

  renderRow: function (rowData) {
    return (
      <OutfitCard key={rowData.topwearID} data={rowData} />
    );
  },

  renderHeader: function () {
    return (
       <TouchableWithoutFeedback
          onPress={() => {
            console.log('refresh')
            this.refreshQueries(['styles']);
          }}
        >
          <Icon
            name='ion|ios-refresh-empty'
            size={32}
            color='#CCC'
            style={{alignSelf:'center', width: 32, height: 32}}
          />
        </TouchableWithoutFeedback>
    );
  },

  render: function() {

    var dataLoaded = this.data.styles.length > 0;

    return (
      <View style={styles.fullScreen}>
        {dataLoaded ?
          <ListView
            dataSource={this.state.templateDataSource.cloneWithRows(this.data.styles)}
            renderHeader={this.renderHeader}
            renderRow={this.renderRow}
            contentContainerStyle={styles.container}
            automaticallyAdjustContentInsets={false}
          /> : <LoadingScreen />}
        </View>
    );
  }
});

var styles = StyleSheet.create({
  fullScreen: {
    flex: 1
  },

  container: {
    paddingTop: 64,
    paddingBottom: 64,
    backgroundColor: '#EEEEEE',
  },
});

module.exports = FeaturedView;