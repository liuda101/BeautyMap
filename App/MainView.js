'use strict';

var React = require('react-native');
var {
  StyleSheet,
  View,
  Image,
  Animated,
  TouchableHighlight
} = React;

var Model = require('./Model');

var {
  BoyRecord,
  GirlRecord
} = Model;

var AV = require('avoscloud-sdk').AV;

var MapView = require('./RNAMapView');
var UploadingView = require('./UploadingView');

var TOANIMATES = ['girlScale', 'boyScale'];

var MainView = React.createClass({
  getInitialState: function() {
    return {
      boyScale: new Animated.Value(1),
      girlScale: new Animated.Value(1)
    };
  },
  _uploadBoy: function() {
    this.refs.uploadingView.uploadBoy();
  },

  _uploadGirl: function() {
    this.refs.uploadingView.uploadGirl();
  },

  onUploadSuccess: function(type) {
    var self = this;
    Animated.spring(self.state[TOANIMATES[type]], {
      toValue: 2
    }).start(function() {
      Animated.spring(self.state[TOANIMATES[type]], {
        toValue: 1
      }).start();
    });

    self.fetchData();
  },

  fetchData: function() {
    var query = new AV.Query(BoyRecord);
    var self = this;
    query.find({
      success: function(data) {
        var ary = [];

        for(var i = 0; i < data.length; i ++) {
          var pos = data[i].toJSON();
          ary.push({
            longitude: pos.position.longitude,
            latitude: pos.position.latitude,
            intensity: pos.count
          });
        }

        self.refs.mapView.setHotMap(ary);
      }
    });
  },

  componentDidMount: function() {
    this.fetchData();

    navigator.geolocation.getCurrentPosition(
      (initialPosition) => {
        console.log('abc');
        this.refs.mapView.setCenter({
          latitude: initialPosition.coords.latitude,
          longitude: initialPosition.coords.longitude
        });
      },
      (error) => console.log(error.message),
      {enableHighAccuracy: true, timeout: 20000, maximumAge: 1000}
    );
  },

  render: function() {
    return (
      <View style={styles.container}>
        <MapView ref={'mapView'} zoomLevel={15}/>

        <TouchableHighlight style={styles.addBoy} underlayColor={'#1458BD'} onPress={this._uploadBoy}>
          <Animated.Image source={require('image!boy')} style={{backgroundColor: 'transparent', transform: [{scale: this.state.boyScale}]}} />
        </TouchableHighlight>

        <TouchableHighlight style={styles.addGirl} underlayColor={'#AD1818'} onPress={this._uploadGirl}>
          <Animated.Image source={require('image!girl')} style={{backgroundColor: 'transparent', transform: [{scale: this.state.girlScale}]}}/>
        </TouchableHighlight>

        <UploadingView ref={'uploadingView'} style={{position: 'absolute', left: 0, right: 0, bottom: 0, top: 0}} onUploadSuccess={this.onUploadSuccess}/>
      </View>
    );
  }
});

var styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#888'
  },
  addBoy: {
    position: 'absolute',
    left: 10,
    bottom: 10,
    width: 60,
    height: 60,
    borderRadius: 32,
    borderWidth: 2,
    borderColor: '#fff',
    backgroundColor: '#2e82ff',
    alignItems: 'center',
    justifyContent: 'center'
  },

  addGirl: {
    position: 'absolute',
    right: 10,
    bottom: 10,
    width: 60,
    height: 60,
    borderRadius: 32,
    borderWidth: 2,
    borderColor: '#fff',
    backgroundColor: '#E02B2B',
    alignItems: 'center',
    justifyContent: 'center'
  }
});



module.exports = MainView;