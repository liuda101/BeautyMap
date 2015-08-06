/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 */
'use strict';

var React = require('react-native');
var {
  AppRegistry,
  StyleSheet,
  View,
  Image,
  TouchableHighlight
} = React;

var MapView = require('./RNAMapView');

var BeautyMap = React.createClass({

  componentDidMount: function() {
    navigator.geolocation.getCurrentPosition(
      (initialPosition) => console.log(initialPosition),
      (error) => alert(error.message),
      {enableHighAccuracy: true, timeout: 20000, maximumAge: 1000}
    );
  },


  render: function() {
    return (
      <View style={styles.container}>
        <MapView ref={'mapView'} zoomLevel={15}/>


        <TouchableHighlight style={styles.addBoy} underlayColor={'#1458BD'}>
          <Image source={require('image!boy')} style={{backgroundColor: 'transparent'}}/>
        </TouchableHighlight>

        <TouchableHighlight style={styles.addGirl} underlayColor={'#AD1818'}>
          <Image source={require('image!girl')} style={{backgroundColor: 'transparent'}}/>
        </TouchableHighlight>
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



AppRegistry.registerComponent('BeautyMap', () => BeautyMap);
