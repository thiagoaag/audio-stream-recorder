var exec = require('child_process').exec;
var logText = '';
	
module.exports = function(options, callback){
	

	var url = options.url;
	var timeRecord = options.time || 10;
	var path = options.path || "/tmp/radio_" + new Date().getTime() + ".ogg";	
	
	var args = url + " --run-time=" + timeRecord + " vlc://quit --sout='#transcode{acodec=vorbi,ab=128,channels=1,samplerate=44100}:std{access=file,mux=ogg,dst=" + path + "'}";

	var cmd = 'cvlc ' + args;
	
	var vlc = exec(cmd, function(error, stdout, stderr){

		if(error){
			console.log(error.stack);
			console.log('Error code: ' + error.code);
			console.log('Signal received: ' + error.signal);
		}
	});


	vlc.stdout.on('data', function(data){
		log("STDOUT: " + data);
		logText += data;
	});
	
	vlc.stderr.on('data', function(data){
		//log("STDERR: " + data);
		if(data.indexOf('Raw-audio server found') !=  -1){
			log("Initing record:\n" + url);
		}
		logText += data;
	});

	vlc.on('exit', function(code){
		if(logText.indexOf('connection failed') != -1)
			log('Connection failed: ' + url);
		else
			log('Finished: ' + path);
			callback(path);
	});

};
	function log(data){
		console.log(data);
	};
	

