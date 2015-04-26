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

var OutfitCard = React.createClass({
  propTypes: {
    data: React.PropTypes.object.isRequired
  },

  render: function () {
    return (
      <View style={styles.feedCard}>
        <Image
          source={{
            uri: this.props.data.topwearImage
          }}
          style={styles.productImage}
          resizeMode='cover' />

        <Image
          source={{
            uri: this.props.data.bottomwearImage
          }}
          style={styles.productImage}
          resizeMode='cover' />

        <View style={{
          flexDirection: 'row',
          backgroundColor: 'white',
          padding: 5
        }}>
          <View style={{
            alignItems: 'center'
          }}>
            <Image source={{
              uri: 'http://organicthemes.com/demo/profile/files/2012/12/profile_img.png'
            }} style={styles.userPicture} />
          </View>
          <View style={{
            justifyContent: 'flex-end',
            marginHorizontal: 5,
          }}>
            <Text style={styles.instructions}>{this.props.data.subtitle}</Text>
            <Text style={styles.welcome}>By {this.props.data.createdBy}</Text>
          </View>
          <Icon
            name='ion|heart'
            size={32}
            color='#DDD'
            style={{flex: 1, height: 32}}
          />
          
        </View>
      </View>
    );
  }
});

var styles = StyleSheet.create({
  feedCard: {
    marginHorizontal: 10,
    marginVertical: 5,
    borderRadius: 10,
    overflow: 'hidden',
    shadowColor: 'black',
    shadowRadius: 1,
    shadowOffset: {
      height: 1
    },
    shadowOpacity: 0.1
  },
  welcome: {
    fontSize: 12,
  },
  instructions: {
    fontSize: 14,
    color: '#333333',
  },
  productImage: {
    width: 300,
    height: 200
  },
  userPicture: {
    borderRadius: 20,
    height: 40,
    width: 40
  }
});

module.exports = OutfitCard;