var vlc = require('../vlc');

function log(data){
	console.log("CALLBACK: " + data);
};

vlc("", log );
//vlc({"url": "http://127.0.0.1:8080/liste"}, log);
