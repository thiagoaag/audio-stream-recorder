var exec = require('child_process').exec;
var fs = require('fs');

	
module.exports = function(options, callback){

	var logText = "";

	var webSource = options.webSource || "record";
		webSource = webSource.replace(/\s/g, "");
		webSource = webSource.replace(/\./g, "-");

	var timeRecord = options.time || 5; //seconds

	var url = options.url;

	if(url === undefined || url.trim() == ""){
		return callback("Failed: url not defined\n");
	}
	
	var dateNow = new Date().toISOString().slice(0, 23).replace("T","_").replace(".", "");
	
	var fileName =  webSource + "_" + dateNow + ".ogg";

	var path = options.path;

	if(path === undefined || path.trim() == ""){
		path = "/tmp/" + fileName;
	}else if(!fs.existsSync(path)){

		fs.mkdirSync(path, 0766, function(err) {
			if(err){
				return callback("Failed: can't make the directory \n");
			}
		});
	}else{
		path += "/" + fileName;
	}
		
	var cmd = "cvlc -vvv";
	cmd += " --run-time=" + timeRecord;
	if( url.indexOf("rtsp") == -1){ 
		cmd += " --stop-time=" + timeRecord; }	
	cmd +=  " " + url;
	cmd += " --sout='#transcode{acodec=vorbi,ab=128,channels=1,samplerate=44100}:";
	cmd += "std{access=file,mux=ogg,dst=" + path + "}'";
	cmd += " vlc://quit";
	
	log("cmd: " + cmd);

	var vlc = exec(cmd, function(error, stdout, stderr){

		if(error){
			//log(error.stack);
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