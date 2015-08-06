'use strict';

var AV = require('avoscloud-sdk').AV;

var BoyRecord = AV.Object.extend({
  className: 'BoyRecord'
});

var GirlRecord = AV.Object.extend({
  className: 'GirlRecord'
});

module.exports = {
  BoyRecord: BoyRecord,
  GirlRecord: GirlRecord
};