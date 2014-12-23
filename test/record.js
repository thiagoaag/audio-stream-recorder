var vlc = require('../vlc');
var num = 0;

function log(data){
	console.log("CALLBACK: " + data);	
};



//// GOOD LINKs ////
//vlc({"id": 89651142, "url": "http://listen.trance.fm/1/128", "time": 60}, log );
//vlc({"url": "http://listen.trance.fm/1/128", "webSource": "Trance FM", "time": 10}, log );

vlc({"webSource": "Trance.fm", "url": "http://listen.trance.fm/1/128", "path": "/home/thiago/records" }, log );
vlc({"webSource": "Trance.fm", "url": "http://listen.trance.fm/1/128", "time": 10 }, log ); 

//vlc({"webSource": "Radio Difusora Fm", "url": "http://170.75.153.34:11794/"}, log);

//// FAIL LINKs ////
//vlc({"url": "http://127.0.0.1:8080/live", "time": 300}, log);
//vlc({"webSource": "Localhost", "url": "rtsp://127.0.0.1:8554/live-rtsp"}, log);
//vlc({"webSource": "Localhost", "url": "http://looc.com"}, log);
