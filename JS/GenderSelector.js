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

var Button = require('./Button');

var GenderSelector = React.createClass({
  getInitialState: function () {
    return {
      selected: '',
    };
  },

  render: function() {
    return (
      <View style={styles.container}>
        <Button
          style={styles.button}
          highlightedStyle={styles.highlightedButton}
          selectedStyle={styles.selectedButton}
          selected={this.state.selected === 'men'}
          onSelect={() => {
          this.props.selectedGender('men');
          this.setState({
            selected: 'men'
          })}}
          title='Men' />
        <Button
          style={styles.button}
          highlightedStyle={styles.highlightedButton}
          selectedStyle={styles.selectedButton}
          selected={this.state.selected === 'women'}
          onSelect={() => {this.setState({
            selected: 'women'
          })}}
          title='Women' />
      </View>
    );
  }
});

var styles = StyleSheet.create({ 
  container: {
    flexDirection: 'row',
    height: 40
  },
  button: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: '#DDD',
    marginVertical: 5,
    marginHorizontal: 15,
    borderRadius: 5
  },
  highlightedButton: {
    backgroundColor: '#39F',
  },
  selectedButton: {
    backgroundColor: '#39F'
  }
});

module.exports = GenderSelector;