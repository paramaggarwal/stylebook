var React = require('react-native');

var {
  View,
  Text,
  TouchableWithoutFeedback
} = React;

var Button = React.createClass({
  propTypes: {
    style: React.PropTypes.object,
    selectedStyle: React.PropTypes.object,
    highlightedStyle: React.PropTypes.object,
    onSelect: React.PropTypes.func.isRequired,
    selected: React.PropTypes.bool.isRequired
  },

  getInitialState: function () {
    return {
      highlighted: false
    };
  },

  render: function() {

    var styles = [this.props.style];

    if (this.state.highlighted) {
      styles.push(this.props.highlightedStyle)
    } else if (this.props.selected) {
      styles.push(this.props.selectedStyle)
    };

    return (
      <View style={styles}>
        <TouchableWithoutFeedback
          onPress={this.props.onSelect}
          onPressIn={() => {this.setState({
            highlighted: true
          })}}
          onPressOut={() => {this.setState({
            highlighted: false
          })}}>
          <Text style={{
            textAlign: 'center',
            fontWeight: 'bold',
            color: '#666'
          }}>{this.props.title}</Text>
        </TouchableWithoutFeedback>
      </View>
    );
  }
});

module.exports = Button;