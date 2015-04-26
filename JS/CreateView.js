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
  TouchableWithoutFeedback,
  TextInput,
  ScrollView
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

  query: function (query, prefix) {

    if (!query) {return};

    fetch('http://developer.myntra.com/search/data/' + query.replace(' ', '-')).then((data) => {
      return data.json();
    }).then((json) => {
      var obj = {};
      obj[prefix + 'ResultsDataSource'] = this.state[prefix + 'ResultsDataSource'].cloneWithRows(json.data.results.products.slice(0, TOTAL_ITEMS));
      this.setState(obj);
    });
  },

  // componentDidMount: function () {
  //   query(this.state.topQuery || 'shirts', 'top');
  //   query(this.state.bottomQuery || 'shirts', 'bottom');
  // },

  renderTopwearItem: function (data) {
    return (
      <Image 
        key={data.styleid}
        source={{
        uri: getImageURL(data)
      }} style={{
        width: ITEM_WIDTH,
        height: ITEM_HEIGHT,
        marginHorizontal: ITEM_MARGIN
      }} />
    );
  },

  renderBottomwearItem: function (data) {
    return (
      <Image
        key={data.styleid}
        source={{
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

    console.log(currentItemIndex);

    return currentItemIndex;
  },

  saveOutfit: function () {

    var topItemData = this.state.topResultsDataSource.getRowData(0, this.state.currentTopwearIndex);
    var bottomItemData = this.state.bottomResultsDataSource.getRowData(0, this.state.currentBottomwearIndex);

    var data = {
      topwearID: topItemData.styleid,
      topwearImage: getImageURL(topItemData),

      bottomwearID: bottomItemData.styleid,
      bottomwearImage: getImageURL(bottomItemData),

      subtitle: this.state.outfitDescription,
      createdBy: 'Mahesh Jha'
    };

    console.log(data);

    if (data.topwearID && data.bottomwearID) {
      ParseReact.Mutation.Create('Styles', data).dispatch();
      setTimeout(() => {
        this.setState({
          topQuery: null,
          bottomQuery: null
        });
      }, 500)
    };
  },

  render: function() {
    return (
      <ScrollView
        ref='scrollingContainer'
        style={{paddingTop: 64, paddingBottom: 64}}
        keyboardDismissMode="onDrag"
        keyboardShouldPersistTaps={true}
        automaticallyAdjustContentInsets={false}
      >
        <TouchableWithoutFeedback
          onPress={() => {
            this.setState({
              topQuery: null,
              bottomQuery: null
            });
          }}
        >
          <Icon
            name='ion|ios-refresh-empty'
            size={32}
            color='#CCC'
            style={{alignSelf:'center', width: 32, height: 32}}
          />
        </TouchableWithoutFeedback>
        {/*<GenderSelector onSelect={this.selectedGender}/>*/}
        {this.state.topQuery ? <ListView
          key='toplist'
          style={{height: ITEM_HEIGHT, paddingHorizontal: PADDING_HORIZONTAL}}
          horizontal={true}
          dataSource={this.state.topResultsDataSource}
          renderRow={this.renderTopwearItem}
          automaticallyAdjustContentInsets={false}
          onScroll={(e) => {
            var index = this.calculateItemIndex(e);
            if (index >= 0) {
              this.setState({
                currentTopwearIndex: index
              });
            };
          }}
        /> : <View style={{height: ITEM_HEIGHT, justifyContent: 'center', alignItems: 'center', flexDirection: 'row'}}>
          <TextInput
            ref='textInputTopwear'
            style={{alignSelf: 'center', width: 180, height: 30, margin: 5, borderColor: '#EEE', borderWidth: 1}}
            onChangeText={(text) => this.setState({topQueryInProgress: text})}
            placeholder="Search Topwear"
          />
          <TouchableWithoutFeedback
            onPress={() => {
              this.query(this.state.topQueryInProgress, 'top');
              console.log(this.refs.textInputTopwear.blur());
              this.setState({
                topQuery: this.state.topQueryInProgress
              });

            }}
          >
            <Icon
              name='ion|ios-search'
              size={32}
              color='#3A2DFF'
              style={{width: 32, height: 32}}
            />
          </TouchableWithoutFeedback>
          </View>}
        {this.state.bottomQuery ? <ListView
          key='bottomlist'
          style={{height: ITEM_HEIGHT, paddingHorizontal: PADDING_HORIZONTAL}}
          horizontal={true}
          dataSource={this.state.bottomResultsDataSource}
          renderRow={this.renderBottomwearItem}
          automaticallyAdjustContentInsets={false}
          onScroll={(e) => {
            var index = this.calculateItemIndex(e);

            if (index >= 0) {
              this.setState({
                currentBottomwearIndex: index
              });
            };
          }}
        /> : <View style={{height: ITEM_HEIGHT, justifyContent: 'center', alignItems: 'center', flexDirection: 'row'}}>
          <TextInput
            ref='textInputBottomwear'
            style={{alignSelf: 'center', width: 180, height: 30, margin: 5, borderColor: '#EEE', borderWidth: 1}}
            onChangeText={(text) => this.setState({bottomQueryInProgress: text})}
            placeholder="Search Bottomwear"
            onFocus={() => this.refs.scrollingContainer.scrollTo(140, 0)}
          />
          <TouchableWithoutFeedback
            onPress={() => {
              this.query(this.state.bottomQueryInProgress, 'bottom');
              console.log(this.refs.textInputBottomwear.blur());
              this.setState({
                bottomQuery: this.state.bottomQueryInProgress
              })
            }}
          >
            <Icon
              name='ion|ios-search'
              size={32}
              color='#3A2DFF'
              style={{width: 32, height: 32}}
            />
          </TouchableWithoutFeedback>
          </View>}
        <View style={{flex: 1, flexDirection: 'row', height: 50, marginBottom: 80}}>
          <TextInput
          ref='save'
            style={{flex: 1, margin: 5, borderColor: '#EEE', borderWidth: 1}}
            onChangeText={(text) => this.setState({outfitDescription: text})}
            placeholder="Description"
            onFocus={() => this.refs.scrollingContainer.scrollTo(240, 0)}
          />
          <TouchableWithoutFeedback
            onPressIn={() => {this.setState({
              buttonHighlighted: true
            })}}
            onPressOut={() => {this.setState({
              buttonHighlighted: false
            })}}
            onPress={() => {
              this.saveOutfit();
              console.log(this.refs.save.blur());

            }}
          >
            <Icon
              name={this.state.buttonHighlighted ? 'ion|ios-checkmark' : 'ion|ios-checkmark-outline'}
              size={44}
              color='#3A2DFF'
              style={{width: 44, height: 44}}
            />
          </TouchableWithoutFeedback>
        </View>
      </ScrollView>
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