exports.log = function(original_message, styles){	
	try { this.fs.mkdirSync(this.config.logFolder, "777") } catch(e) { }; 
	if(styles == null){styles = ["white"];}
	if(this.utils != undefined){
		var time_string = this.utils.sqlDateTime();
	}else{
		var time_string = "!";
	}
	var console_message = this.consoleColors.grey(time_string) + this.consoleColors.grey(" | ");
	var inner_message = original_message;
	for(var i in styles){
		var style = styles[i];
		if(style == "bold"){inner_message = this.consoleColors.bold(inner_message);}
		else if(style == "italic"){inner_message = this.consoleColors.italic(inner_message);}
		else if(style == "underline"){inner_message = this.consoleColors.underline(inner_message);}
		else if(style == "inverse"){inner_message = this.consoleColors.inverse(inner_message);}
		else if(style == "white"){inner_message = this.consoleColors.white(inner_message);}
		else if(style == "grey"){inner_message = this.consoleColors.grey(inner_message);}
		else if(style == "black"){inner_message = this.consoleColors.black(inner_message);}
		else if(style == "blue"){inner_message = this.consoleColors.blue(inner_message);}
		else if(style == "cyan"){inner_message = this.consoleColors.cyan(inner_message);}
		else if(style == "green"){inner_message = this.consoleColors.green(inner_message);}
		else if(style == "yellow"){inner_message = this.consoleColors.yellow(inner_message);}
		else if(style == "red"){inner_message = this.consoleColors.red(inner_message);}
		else if(style == "cyan"){inner_message = this.consoleColors.cyan(inner_message);}
		else if(style == "magenta"){inner_message = this.consoleColors.magenta(inner_message);}
		else if(style == "rainbow"){inner_message = this.consoleColors.rainbow(inner_message);}
		else if(style == "black"){inner_message = this.consoleColors.black(inner_message);}
		else if(style == "zebra"){inner_message = this.consoleColors.zebra(inner_message);}
		else if(style == "zalgo"){inner_message = this.consoleColors.zalgo(inner_message);}
	}
	console_message += inner_message;
	console.log(console_message);
	var file_message = time_string + " | " + original_message;
	if (this.logWriter == null){
		this.logWriter = this.fs.createWriteStream((this.config.logFolder + "/" + this.config.logFile), {flags:"a"});
	}
	try{
		this.logWriter.write(file_message + "\r\n");
	}catch(e){
		console.log(" !!! Error writing to log file: " + e);
	}
};
