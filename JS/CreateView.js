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

var TOTAL_ITEMS = 5;
var PADDING_HORIZONTAL = 5;
var ITEM_WIDTH = 300;
var ITEM_HEIGHT = 200;
var ITEM_MARGIN = 5;

var fetch = require('fetch');
var OutfitCard = require('./OutfitCard');
var GenderSelector = require('./GenderSelector');

var FeaturedView = React.createClass({
  getInitialState: function () {
    return {
      topResultsDataSource: new ListView.DataSource({
        rowHasChanged: (r1, r2) => r1 !== r2
      }),
      bottomResultsDataSource: new ListView.DataSource({
        rowHasChanged: (r1, r2) => r1 !== r2
      }),
      buttonHighlighted: false,

      currentTopwearIndex: 0,
      currentBottomwearIndex: 0,

    };
  },

  componentDidMount: function () {

    var topQuery = 'women kurti';
    var bottomQuery = 'women jeans';

    fetch('http://developer.myntra.com/search/data/' + topQuery.replace(' ', '-')).then((data) => {
      return data.json();
    }).then((json) => {
      this.setState({
        topResultsDataSource: this.state.topResultsDataSource.cloneWithRows(json.data.results.products.slice(0, TOTAL_ITEMS))
      });
    });

    fetch('http://developer.myntra.com/search/data/' + bottomQuery.replace(' ', '-')).then((data) => {
      return data.json();
    }).then((json) => {
      this.setState({
        bottomResultsDataSource: this.state.bottomResultsDataSource.cloneWithRows(json.data.results.products.slice(0, TOTAL_ITEMS))
      });
    });
  },

  renderTopwearItem: function (data) {

    console.log('renderintopwear', data.styleid);

    return (
      <Image source={{
        uri: getImageURL(data)
      }} style={{
        width: ITEM_WIDTH,
        height: ITEM_HEIGHT,
        marginHorizontal: ITEM_MARGIN
      }} />
    );
  },

  renderBottomwearItem: function (data) {

    console.log('renderinbottomwear', data.styleid);

    return (
      <Image source={{
        uri: getImageURL(data)
      }} style={{
        width: ITEM_WIDTH,
        height: ITEM_HEIGHT,
        marginHorizontal: ITEM_MARGIN,
      }} />
    );
  },

  calculateItemIndex: function (e) {
    var boxWidth = e.nativeEvent.layoutMeasurement.width;
    var itemWidth = ITEM_WIDTH + (ITEM_MARGIN*2);
    var scrolled = e.nativeEvent.contentOffset.x;
    var scrollSize = e.nativeEvent.contentSize.width - (PADDING_HORIZONTAL*2);

    var percentComplete = scrolled/scrollSize;
    var currentItemIndex = Math.round(percentComplete * TOTAL_ITEMS);

    return currentItemIndex;
  },

  saveOutfit: function () {

    var data = {
      topwearID: this.state.currentTopwearID,
      topwearImage: this.state.currentTopwearImage,
      bottomwearID: this.state.currentBottomwearID,
      bottomwearImage: this.state.currentBottomwearImage,
      subtitle: "Goes great on weekends!",
      createdBy: 'John Doe'
    };

    console.log(data);

    ParseReact.Mutation.Create('Styles', data).dispatch();
  },

  render: function() {
    return (
      <View style={{paddingTop: 64, paddingBottom: 64}}>
        {/*<GenderSelector onSelect={this.selectedGender}/>*/}
        <ListView
          style={{height: ITEM_HEIGHT, paddingHorizontal: PADDING_HORIZONTAL}}
          horizontal={true}
          dataSource={this.state.topResultsDataSource}
          renderRow={this.renderTopwearItem}
          automaticallyAdjustContentInsets={false}
          onScroll={(e) => {
            var index = this.calculateItemIndex(e);
            var itemData = this.state.topResultsDataSource.getRowData(0, index);

            this.setState({
              currentTopwearIndex: index,
              currentTopwearID: itemData.styleid,
              currentTopwearImage: getImageURL(itemData)
            });
          }}
          scrollEventThrottle={100}
        />
        <ListView
          ref='bottomwear'
          style={{height: ITEM_HEIGHT, paddingHorizontal: PADDING_HORIZONTAL}}
          horizontal={true}
          dataSource={this.state.bottomResultsDataSource}
          renderRow={this.renderBottomwearItem}
          automaticallyAdjustContentInsets={false}
          onScroll={(e) => {
            var index = this.calculateItemIndex(e);
            var itemData = this.state.bottomResultsDataSource.getRowData(0, index);

            this.setState({
              currentBottomwearIndex: index,
              currentBottomwearID: itemData.styleid,
              currentBottomwearImage: getImageURL(itemData)
            });
          }}
          scrollEventThrottle={100}
        />
        <View style={{flex: 1, alignItems: 'center', justifyContent: 'center', height: 100}}>
          <TouchableWithoutFeedback
            onPressIn={() => {this.setState({
              buttonHighlighted: true
            })}}
            onPressOut={() => {this.setState({
              buttonHighlighted: false
            })}}
            onPress={this.saveOutfit}
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

function getImageURL (product) {

  var imageURL = product.search_image;
  var imageEntry = JSON.parse(product.imageEntry_default);
  if (imageEntry && imageEntry.servingUploaderType === 'CL') {
    imageURL = imageEntry.domain + 'w_360/' + imageEntry.relativePath;
  } else if (imageEntry && imageEntry.servingUploaderType === 'S3') {
    imageURL = imageEntry.domain + imageEntry.resolutionFormula.replace('($width)', '360').replace('($height)', '480');
  }

  return imageURL;
};

var styles = StyleSheet.create({  
  container: {
    backgroundColor: '#EEEEEE',
  },
});

module.exports = FeaturedView;