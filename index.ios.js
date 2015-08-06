'use strict';

var React = require('react-native');
var MainView = require('./App/MainView');

var AV = require('avoscloud-sdk').AV;

AV.initialize("z5w7kqb22x8lljniakv7gumws6kvtkvg0wu5lsdv8j37xn82", "0vpluhp89teymhepq0ayeauumzlflw41ot49pmm0lswk4z0a");

React.AppRegistry.registerComponent('BeautyMap', () => MainView);
