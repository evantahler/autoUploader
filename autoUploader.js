var AU = {};

AU.util = require("util");
AU.fs = require("fs");
AU.http = require("http");
AU.path = require("path");
AU.consoleColors = require('colors');
AU.config = require("./config.js").config;
AU.utils = require("./utils.js").utils;
AU.upload = require("./upload.js").upload;
AU.log = require("./log.js").log;

// version compatibility
if(process.version.split(".")[0] == "v0" && process.version.split(".")[1] <= "6"){
	AU.fs.existsSync = AU.path.existsSync;
	AU.fs.exists = AU.path.exists;
}

///////////////////////////// AU /////////////////////////////

AU.loop = function(AU){
	AU.log("Checking folder: "+AU.config.sourceDirectory);
	if(AU.loopTimer != null){ clearTimeout(AU.loopTimer); }
	
	var fileFound = false;
	AU.fs.readdirSync(AU.config.sourceDirectory).forEach( function(file){
		var extension = file.split(".")[1];
		if("."+extension != AU.config.metadataFileExtension && fileFound == false){
			fileFound = true // only do one file per cycle
			var toUpload = false;
			AU.log("  File: "+file);
			if(AU.config.metadataFile){
				try{
					var metadataFile = AU.config.sourceDirectory + file.split(".")[0] + AU.config.metadataFileExtension;
					AU.fs.realpathSync(metadataFile);
					var size = AU.fs.statSync(metadataFile).size;
					if (size > 0){
						var metadata = JSON.parse(AU.fs.readFileSync(metadataFile,'utf8'));
						toUpload = true;
					}
				}catch(e){
					AU.log("  Metadata file not present; expecting '"+metadataFile+"'; ignoring");
				}
			}else{
				toUpload = true;
			}
		
			if(toUpload){
				AU.log("	Uploading: "+file);
				AU.upload(AU, AU.config.sourceDirectory + file, metadata, function(resp){
					try{
						resp = JSON.parse(resp);
						if(resp.error == false){
							AU.log("  Uploaded!", "green");
							if(AU.config.destinationDirectory != null && AU.config.destinationDirectory != ""){
								AU.utils.moveFile(AU, AU.config.sourceDirectory + file, AU.config.destinationDirectory + file, function(){
									if(AU.config.metadataFile){
										AU.utils.moveFile(AU, metadataFile, AU.config.destinationDirectory + file.split(".")[0] + AU.config.metadataFileExtension, function(){
											AU.log("  Files Moved");
											loopCleanup();
										});
									}else{
										AU.log("  File Moved");
										loopCleanup();
									}
								});
							}
						}else{
							AU.log("  Problem Uploading: "+resp.error, ["red", "bold"])
							loopCleanup();
						}
					}catch (e){
						AU.log("  Error Uploading: "+e , ["red", "bold"])
						loopCleanup();
					}
				})
			}
		}
	});
	if(fileFound == false){
		AU.log("  No files found");
		loopCleanup();
	}
	
	function loopCleanup(){
		AU.utils.cleanLargeLogFile(AU)
		AU.loopTimer = setTimeout(AU.loop, AU.config.checkCycleTime, AU);
	}
}

///////////////////////////// Go! /////////////////////////////
AU.log("Starting...")
AU.loop(AU);