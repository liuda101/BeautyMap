var React = require('react-native');

var {
  requireNativeComponent,
  PropTypes
} = React;



var MapView = React.createClass({

  render: function() {
    return (
      <RNAMapView {... this.props} />
    );
  }
});

MapView.propTypes = {
  zoomLevel: PropTypes.number
};


var RNAMapView = requireNativeComponent('RNAMapView', MapView);

module.exports = MapView;