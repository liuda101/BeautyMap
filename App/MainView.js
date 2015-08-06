'use strict';

var React = require('react-native');
var {
  StyleSheet,
  View,
  Image,
  Animated,
  TouchableHighlight
} = React;


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