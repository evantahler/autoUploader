exports.config = {
	
	sourceDirectory: "~/Desktop/source/",
	destinationDirectory: "~/Desktop/dest/",
	
	uploadHost: "myapp.example.com",
	uploadPath: "/upload.php",
	uploadPort: 80,
	uploadFileFieldName: "file",
	
	metadataFile: true,
	metadataFileExtension: ".json",
	
	additionalUploadParams: {
		password: "secret"
	},
	
	checkCycleTime: 1000,
	logFolder: "./log/",
	logFile: "autoUploader.log",
	maxLogFileSize: 100000

};