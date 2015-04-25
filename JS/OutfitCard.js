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
    data: React.PropTypes.array.isRequired
  },

  render: function () {
    return (
      <View style={styles.feedCard}>
        <View style={{
          flex: 1
        }}>
          <Image source={{
            uri: this.props.data.topwearImage
          }} style={styles.productImage} />
          <Image source={{
            uri: this.props.data.bottomwearImage
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
            }} style={styles.userPicture} />
            </View>
          <Text style={styles.welcome}>{this.props.data.createdBy}</Text>
          <Text style={styles.tags}>{this.props.data.category}</Text>
          <Text style={styles.instructions}>{this.props.data.subtitle}</Text>
          <Icon
            name='ion|ios-heart-outline'
            size={44}
            color='#FF3A2D'
            style={{flex: 1, height: 44}}
          />
        </View>
      </View>
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
      height: 1
    },
    shadowOpacity: 0.1
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
  productImage: {
    width: 120,
    height: 160
  },
  userPicture: {
    borderRadius: 20,
    height: 40,
    width: 40
  }
});

module.exports = OutfitCard;