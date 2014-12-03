var exec = require('child_process').exec;
var util = require('util');
	
module.exports = function(options, callback){
	
	var link = options.link;
	var timeRecord = options.time || 10;
	var path = options.path || "/tmp/record_" + new Date().getTime() + ".ogg";	
	
	var args = [ link, '--stop-time=' + timeRecord, 'vlc://quit', '--sout=#transcode{acodec=vorbi,ab=128,channels=1,samplerate=44100}:std{access=file,mux=ogg,dst=' + path + '}'];

	var cmd = util.format('cvlc %s' + args);

	
	var child = exec(cmd, function(err, stdout, stderr){
		console.log('executing exec');

		if(err){
			console.log('err: ' + err);
			 return callback(err);
		}

		try{
			var data = JSON.parse(stdout)[0];
			callback(data.error, data);

			console.log('\nstdout: ' + stdout);
			console.log('\nstderr: ' + stderr);

		}catch(e){
			callback(e + " <- Exception");
		}
	});

	child.stdout.on('data', function(data){
		console.log(data.toString());
	});
	
	child.stderr.on('data', function(data){
		
		if(data.indexOf('failed') != -1){
			console.log('Link not online: ' + data.toString());
		}
	});
};

