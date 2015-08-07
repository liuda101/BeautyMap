'use strict';

var React = require('react-native');
var {
  StyleSheet,
  View,
  Text,
  Animated
} = React;


var Model = require('./Model');

var {
  BoyRecord,
  GirlRecord
} = Model;

var TYPES = ['美女', '帅哥'];
var RECORDS = [GirlRecord, BoyRecord];

var AV = require('avoscloud-sdk').AV;

var UploadingView = React.createClass({

  getInitialState: function() {
    return {
      uploading: false,
      pointerEvents: 'none',
      uploadingOpacity: new Animated.Value(0),
      statusText: ''
    };
  },

  uploadBoy: function() {
    this.beginUpload(1);
  },

  uploadGirl: function() {
    this.beginUpload(0);
  },


  beginUpload: function(type) {
    if (this.state.uploading) {
      return;
    }

    this.setState({
      uploading: true,
      statusText: '正在寻找' + TYPES[type] + '...'
    });

    Animated.timing(this.state.uploadingOpacity, {
      toValue: 1,
      duration: 300,
      delay: 0
    }).start();


    navigator.geolocation.getCurrentPosition(
      (initialPosition) => this.realUpload(initialPosition, type),
      (error) => console.log(error.message),
      {enableHighAccuracy: true, timeout: 20000, maximumAge: 1000}
    );
  },

  realUpload: function(position, type) {
    var self = this;

    self.setState({
      statusText: '报告' + TYPES[type] + '位置...'
    });

    var RecordObj = RECORDS[type];
    var rObj = new RecordObj();

    var currentPosition = new AV.GeoPoint({latitude: position.coords.latitude, longitude: position.coords.longitude});

    rObj.set('position', currentPosition);

    var query = new AV.Query(RecordObj);
    query.withinKilometers('position', currentPosition, 0.03);
    query.find({
      success: function(results) {
        if (results.length > 0) {
          var theRecord = results[0];
          theRecord.set('count', theRecord.get('count') + 1);
          theRecord.save(null, {
            success: function() {
              self.setState({
                uploading: false
              });

              Animated.timing(self.state.uploadingOpacity, {
                toValue: 0,
                duration: 300,
                delay: 0
              }).start(function() {
                if (self.props.onUploadSuccess) {
                  self.props.onUploadSuccess(type);
                }
              });
            }
          });
        } else {
          rObj.save(null, {
            success: function(result) {
              self.setState({
                uploading: false
              });

              Animated.timing(self.state.uploadingOpacity, {
                toValue: 0,
                duration: 300,
                delay: 0
              }).start(function() {
                if (self.props.onUploadSuccess) {
                  self.props.onUploadSuccess(type);
                }
              });
            }
          });
        }
      },
      error: function() {

      }
    });
  },

  render: function() {
    return (
      <View style={styles.container} pointerEvents={this.state.pointerEvents}>
        <Animated.View style={[styles.uploading, {opacity: this.state.uploadingOpacity}]}>
          <Text style={styles.status}>{this.state.statusText}</Text>
        </Animated.View>
      </View>
    );
  }
});

var styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'transparent',
    alignItems: 'center',
    justifyContent: 'flex-end'
  },

  uploading: {
    width: 110,
    height: 40,
    marginBottom: 20,
    backgroundColor: 'rgba(0,0,0,0.8)',
    borderRadius: 3,
    alignItems: 'center',
    justifyContent: 'center'
  },
  status: {
    fontSize: 12,
    color: '#fff'
  }
});



module.exports = UploadingView;