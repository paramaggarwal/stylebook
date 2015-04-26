/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 */
'use strict';

var React = require('react-native');
var Parse = require('parse').Parse;
var ParseReact = require('parse-react');
var Icon = require('FAKIconImage');

Parse.initialize("pQaxM3N7MRPr9L5vWnTP6haITXMrm3bu6w1Cnnop", "Dnbs6K9hpJnSe9HrQN7dR4DWnF9wZ4QIrxmK2E75");

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

var SMXTabBarIOS = require('SMXTabBarIOS');
var SMXTabBarItemIOS = SMXTabBarIOS.Item;

var FeaturedView = require('./JS/FeaturedView');
var CreateView = require('./JS/CreateView');

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
              component: FeaturedView,
              title: 'Stylebook',
              passProps: { myProp: 'foo' },
            }}
            style={styles.fullScreen}
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
              component: CreateView,
              title: 'Create',
              passProps: { myProp: 'foo' },
            }}
            style={styles.fullScreen}
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
              component: FeaturedView,
              title: 'Liked',
              passProps: { myProp: 'foo' },
            }}
            style={styles.fullScreen}
          />
        </SMXTabBarItemIOS>
      </SMXTabBarIOS>);
  }
});

var styles = StyleSheet.create({
  fullScreen: {
    flex: 1,
  }
});

AppRegistry.registerComponent('Stylebook', () => Stylebook);
