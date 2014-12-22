var exec = require('child_process').exec;

	
module.exports = function(options, callback){

var webSource = options.webSource || "record";
	webSource = webSource.replace(/\s/g, "");

var url = options.url;

if(url === undefined || url.trim() == ""){
	return callback('Failed: url not defined');
}
	
var timeRecord = options.time || 5;
	
var path = options.path || "/tmp/" + webSource + "_" + new Date().toISOString().slice(0, 23).replace("T","_") + ".ogg";	
	
var logText = "";


var cmd = "cvlc -vvv";
	cmd += " --run-time=" + timeRecord;
	//cmd += " --stop-time=" + timeRecord;
	cmd +=  " " + url;
	cmd += " --sout='#transcode{acodec=vorbi,ab=128,channels=1,samplerate=44100}:";
	cmd += "std{access=file,mux=ogg,dst=" + path + "}'";
	cmd += " vlc://quit";
	
	//console.log("cmd: " + cmd);

	var vlc = exec(cmd, function(error, stdout, stderr){

		if(error){
			//console.log(error.stack);
			console.log('Error code: ' + error.code);
			return callback('Failed: command [clvc] not found');
		}
	});


	vlc.stdout.on('data', function(data){
		log("STDOUT: " + data);
		logText += data;
	});
	
	vlc.stderr.on('data', function(data){
			
		//log("STDERR: " + data);
		
		logText += data;

		if(data.indexOf('writing header') != -1 ){
			log("\n\nIniting record:\n" + webSource + "\n\n");
		}

	});

		
	vlc.on('exit', function(code){
		if( logText.indexOf('demux error: Failed to connect') != -1 || logText.indexOf('is unable to open') != -1 ){
			log('Connection failed: ' + url);
		}
		else{
			log('\n\nFinished');
			callback(webSource + "\n" + path);
		}
	});

};
	
	function log(data){
		console.log(data);
	};