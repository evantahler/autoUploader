exports.config = {
	
	sourceDirectory: "/Users/evantahler/Desktop/source/",
	destinationDirectory: "/Users/evantahler/Desktop/dest/",
	
	uploadHost: "warhol.evantahler.com",
	uploadPath: "/upload.php",
	uploadPort: 80,
	uploadFileFieldName: "file",
	
	metadataFile: false,
	metadataFileExtension: ".json",
	
	additionalUploadParams: {
		password: "secret"
	},
	
	checkCycleTime: 1000,
	logFolder: "./log/",
	logFile: "autoUploader.log",
	maxLogFileSize: 100000

};