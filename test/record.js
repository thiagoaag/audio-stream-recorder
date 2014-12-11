var vlc = require('../vlc');
var num = 0;

function log(data){
	console.log("CALLBACK: " + data);	
};

//// GOOD LINKs ////
//vlc({"url": "http://listen.trance.fm/1/128", "time": 15}, log );
//vlc({"url": "rtsp://155.obj.netromedia.net/capitalfmflash/capitalfmflash"}, log);
vlc({"radioName": "Trance.fm", "url": "http://listen######.trance.fm/1/128"}, log );

//// FAIL LINKs ////
//vlc({"url": "http://127.0.0.1:8080/live", "time": 300}, log);
vlc({"radioName": "Localhost", "url": "rtsp://127.0.0.1:8554/live-rtsp"}, log);
