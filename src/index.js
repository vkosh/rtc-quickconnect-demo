var freeice = require('freeice');
var quickconnect = require('rtc-quickconnect');

var opts = {
  room: 'qcdemo42',
  debug: true,
  OfferToReceiveAudio: false,
  OfferToReceiveVideo: false,
  iceServers: freeice()
};

var connecton = quickconnect('https://switchboard.rtc.io/', opts);
console.log("ID: " + connecton.id);
connecton
  .createDataChannel('test')
  .on('channel:opened:test', function (id, dc) {
    console.log('dc open for peer: ' + id);
  })
  .on('message:candidate', function (data) {
    console.warn(data)
  });
