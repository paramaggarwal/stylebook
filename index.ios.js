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
  Image,
  TabBarIOS,
  NavigatorIOS,
  ListView
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
              component: StyleView,
              title: 'My View Title',
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
              component: StyleView,
              title: 'My View Title',
              passProps: { myProp: 'foo' },
            }}
            style={styles.fullScreen}
          />
        </SMXTabBarItemIOS>
      </SMXTabBarIOS>);
  }
});

var StyleView = React.createClass({
  getInitialState: function () {
    var ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});

    return {
      dataSource: ds.cloneWithRows(['row 1', 'row 2']),
    };
  },

  renderRow: function (rowData) {
    return (
      <View style={styles.feedCard}>
        <View style={{
          flex: 1,
          flexDirection: 'column'
        }}>
          <Image source={{
            uri: 'http://assets.myntassets.com/h_307,q_95,w_230/v1/image/style/properties/587216/Roadster-Men-Navy-Sutil-Solid-Shelby-Slim-Fit-Casual-Shirt_1_4bade0ed34f6e5ca0bbadbcd864badb0_mini.jpg'
          }} style={styles.productImage} />
          <Image source={{
            uri: 'http://assets.myntassets.com/h_307,q_95,w_230/v1/images/style/properties/Roadster-Men-Light-Grey-Corvette-Slim-Fit-Jeans_d8ef5e352f2eaa6d45135ddf274950c6_images_mini.jpg'
          }} style={styles.productImage} />
        </View>
        <View style={{
          flex: 1,
        }}>
          <View style={{
            alignItems: 'center'
          }}>
            <Image source={{
              uri: 'http://organicthemes.com/demo/profile/files/2012/12/profile_img.png'
            }} style={{
              borderRadius: 20,
              height: 40,
              width: 40
            }} />
            </View>
          <Text style={styles.welcome}>John Doe</Text>
          <Text style={styles.tags}>Casual Wear</Text>
          <Text style={styles.instructions}>Goes great on Monday mornings. The dark shade of the shirt contrasts really well with the light blue jeans.</Text>
          <Icon
            name='ion|ios-heart-outline'
            size={44}
            color='#FF3A2D'
            style={{flex: 1, height: 44}}
          />
        </View>
      </View>
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
  feedCard: {
    flexDirection: 'row',
    margin: 10,
    padding: 20,
    borderRadius: 5,
    backgroundColor: 'white',
    shadowColor: 'black',
    shadowRadius: 1,
    shadowOffset: {
      h: 1
    },
    shadowOpacity: 0.1
  },
  productImage: {
    width: 120,
    height: 160
  },
  fullScreen: {
    flex: 1
  },
  container: {
    paddingTop: 64,
    paddingBottom: 64,
    backgroundColor: '#EEEEEE',
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
    
  },
  tags: {
    fontSize: 14,
    fontWeight: 'bold',
    textAlign: 'center',
    // marginTop: 5,
    marginBottom: 20
  },
  instructions: {
    fontSize: 13,
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
    height: 120
  },
});

AppRegistry.registerComponent('Stylebook', () => Stylebook);
