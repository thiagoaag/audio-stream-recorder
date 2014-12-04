var exec = require('child_process').exec;

	
module.exports = function(options, callback){
	

	var url = options.url;
	var timeRecord = options.time || 10;
	var path = options.path || "/tmp/radio_" + new Date().getTime() + ".ogg";	
	
	var args = url + " --stop-time=" + timeRecord + " vlc://quit --sout='#transcode{acodec=vorbi,ab=128,channels=1,samplerate=44100}:std{access=file,mux=ogg,dst=" + path + "'}";

	var cmd = 'cvlc ' + args;
	
	console.log("\n\n CMD: " + cmd + "\n\n");
 
	var vlc = exec(cmd, function(error, stdout, stderr){

		if(error){
			console.log(error.stack);
			console.log('Error code: ' + error.code);
			console.log('Signal received: ' + error.signal);
		}
		
	});


	vlc.stdout.on('data', function(data){
		log("STDOUT: " + data);
	});
	
	vlc.stderr.on('data', function(data){
		log("STDERR: " + data);
	});

	vlc.on('exit', function(code){
		console.log('Record finished: ' + path);
		console.log('Child process exited with exit code ' + code);
	});

};
	function log(data){
		console.log(data);
	};
	

