/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 */
'use strict';

var React = require('react-native');
var Parse = require('parse').Parse;
var ParseReact = require('parse-react');
var Icon = require('FAKIconImage');

var {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  TabBarIOS,
  NavigatorIOS
} = React;

var SMXTabBarIOS = require('SMXTabBarIOS');
var SMXTabBarItemIOS = SMXTabBarIOS.Item;

var Stylebook = React.createClass({
  getInitialState: function () {
    return {
      selectedTab: 'featured'
    }
  },

  render: function () {
    return (
      <SMXTabBarIOS>
        <SMXTabBarItemIOS
          iconName={'ion|star'}
          title={'Featured'}
          iconSize={32}
          selected={this.state.selectedTab === 'featured'}
          onPress={() => {
            this.setState({
              selectedTab: 'featured',
            });
          }}>
          <NavigatorIOS
            initialRoute={{
              component: StyleView,
              title: 'My View Title',
              passProps: { myProp: 'foo' },
            }}
          />
        </SMXTabBarItemIOS>
        <SMXTabBarItemIOS
          iconName={'ion|plus'}
          title={'Create'}
          iconSize={32}
          selected={this.state.selectedTab === 'create'}
          onPress={() => {
            this.setState({
              selectedTab: 'create',
            });
          }}>
          <NavigatorIOS
            initialRoute={{
              component: StyleView,
              title: 'My View Title',
              passProps: { myProp: 'foo' },
            }}
          />
        </SMXTabBarItemIOS>
        <SMXTabBarItemIOS
          iconName={'ion|heart'}
          title={'Liked'}
          iconSize={32}
          selected={this.state.selectedTab === 'liked'}
          onPress={() => {
            this.setState({
              selectedTab: 'liked',
            });
          }}>
          <NavigatorIOS
            initialRoute={{
              component: StyleView,
              title: 'My View Title',
              passProps: { myProp: 'foo' },
            }}
          />
        </SMXTabBarItemIOS>
      </SMXTabBarIOS>);
  }
});

var StyleView = React.createClass({
  render: function() {
    return (
      <View style={styles.container}>
        <Text style={styles.welcome}>
          Welcome to React Native!
        </Text>
        <Text style={styles.instructions}>
          To get started, edit index.ios.js
        </Text>
        <Text style={styles.instructions}>
          Press Cmd+R to reload,{'\n'}
          Cmd+Control+Z for dev menu
        </Text>
        <Icon
          name='ion|beer'
          size={150}
          color='#887700'
          style={styles.beer}
        />
      </View>
    );
  }
});

var styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
});

AppRegistry.registerComponent('Stylebook', () => Stylebook);
