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

var FeaturedView = React.createClass({
  getInitialState: function () {
    var ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});

    return {
      dataSource: ds.cloneWithRows(['row 1','row 2' , 'row 2', 'row 2', 'row 2', 'row 2']),
      buttonHighlighted: false
    };
  },

  renderTopwearItem: function (rowData) {
    return (
      <Image source={{
        uri: 'http://assets.myntassets.com/h_307,q_95,w_230/v1/image/style/properties/587216/Roadster-Men-Navy-Sutil-Solid-Shelby-Slim-Fit-Casual-Shirt_1_4bade0ed34f6e5ca0bbadbcd864badb0_mini.jpg'
      }} style={{
        width: 120,
        height: 160
      }} />
    );
  },

  renderBottomwearItem: function (rowData) {
    return (
      <Image source={{
        uri: 'http://assets.myntassets.com/h_307,q_95,w_230/v1/image/style/properties/587216/Roadster-Men-Navy-Sutil-Solid-Shelby-Slim-Fit-Casual-Shirt_1_4bade0ed34f6e5ca0bbadbcd864badb0_mini.jpg'
      }} style={{
        width: 120,
        height: 160
      }} />
    );
  },

  render: function() {
    return (
      <View style={{paddingTop: 64, paddingBottom: 64}}>
        <ListView
          style={{height: 160}}
          horizontal={true}
          dataSource={this.state.dataSource}
          renderRow={this.renderTopwearItem}
          automaticallyAdjustContentInsets={false}
        />
        <ListView
          style={{height: 160}}
          horizontal={true}
          dataSource={this.state.dataSource}
          renderRow={this.renderBottomwearItem}
          automaticallyAdjustContentInsets={false}
        />
        <View style={{flex: 1}}>
          <TouchableWithoutFeedback
            onPressIn={() => {this.setState({
              buttonHighlighted: true
            })}}
            onPressOut={() => {this.setState({
              buttonHighlighted: false
            })}}
          >
            <Icon
            name={this.state.buttonHighlighted ? 'ion|ios-checkmark' : 'ion|ios-checkmark-outline'}
            size={44}
            color='#FF3A2D'
            style={{width: 44, height: 44}}
          />
          </TouchableWithoutFeedback>
        </View>
      </View>
    );
  }
});

var styles = StyleSheet.create({  
  container: {
    backgroundColor: '#EEEEEE',
  },
});

module.exports = FeaturedView;