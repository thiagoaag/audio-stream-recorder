var vlc = require('../vlc');

function log(data){
	console.log("CALLBACK: " + data);
};

//// GOOD LINKs ////
//vlc({"url": "http://listen.trance.fm/1/128"}, log );
  vlc({"url": "rtsp://155.obj.netromedia.net/capitalfmflash/capitalfmflash"}, log);

//// FAIL LINKs ////
//vlc({"url": "http://127.0.0.1:8080/liste"}, log);

