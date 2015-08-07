var React = require('react-native');

var {
  requireNativeComponent,
  PropTypes,
  NativeModules: {
    RNAMapViewManager
  },
} = React;



var MapView = React.createClass({
  getViewHandle: function() {
    return React.findNodeHandle(this.refs.mapView);
  },
  setHotMap: function(mapArray) {
    RNAMapViewManager.renderHotMap(this.getViewHandle(), mapArray, function() {

    });
  },

  setCenter: function(center) {
    RNAMapViewManager.setCenter(this.getViewHandle(), center, function() {

    });
  },
  render: function() {
    return (
      <RNAMapView ref={'mapView'} {... this.props} />
    );
  }
});

MapView.propTypes = {
  zoomLevel: PropTypes.number
};


var RNAMapView = requireNativeComponent('RNAMapView', MapView);

module.exports = MapView;