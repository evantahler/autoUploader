var utils = {};

utils.sqlDateTime = function(time){
	if(time == null){ time = new Date(); }
	var dateStr = 
		this.padDateDoubleStr(time.getFullYear()) +
		"-" + this.padDateDoubleStr(1 + time.getMonth()) +
		"-" + this.padDateDoubleStr(time.getDate()) +
		" " + this.padDateDoubleStr(time.getHours()) +
		":" + this.padDateDoubleStr(time.getMinutes()) +
		":" + this.padDateDoubleStr(time.getSeconds());
	return dateStr;
};

utils.padDateDoubleStr = function(i){
    return (i < 10) ? "0" + i : "" + i;
};

utils.cleanLargeLogFile = function(AU){
	var file = AU.config.logFolder + "/" + AU.config.logFile;
	AU.fs.exists(file, function (exists){
		if(exists){
			size = AU.fs.statSync(file).size;
			if(size >= AU.config.maxLogFileSize)
			{
				AU.log(file + " is larger than " + AU.config.maxLogFileSize + " bytes.  Deleting.", "yellow");
				AU.fs.unlinkSync(file);
				AU.logWriter = AU.fs.createWriteStream(file, {flags:"a"});
			}
		}
	});
}

utils.moveFile = function(AU, source_file, destination_file, next){
	var is = AU.fs.createReadStream(source_file)
	var os = AU.fs.createWriteStream(destination_file);
	AU.util.pump(is, os, function() {
	    AU.fs.unlinkSync(source_file);
		if(typeof next == "function"){
			next(true);
		}
	});	
}

exports.utils = utils;