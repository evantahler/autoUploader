# autoUploader

[![Endore Me](http://api.coderwall.com/evantahler/endorsecount.png)](http://coderwall.com/evantahler)

I will monitor a directory and upload files from it.  I do this by POST-ing files to the remote server (as if I was a web form).  I can also look for metadata files in this directory and add POST information from them along with the file.  

## Requirements
- node.js V6 or later

## Configuration Values
- sourceDirectory: (string) The folder to be monitored
  - IE: "/Users/evantahler/Desktop/source/"
- destinationDirectory: (string) If I am set, I will move uploaded files to this new directory after a successful upload.
 - IE: "/Users/evantahler/Desktop/dest/"
- uploadHost: (string) The base URL of the upload server
 - IE: "mysweetserver.example.com"
- uploadPath: (string) The "page" to upload to on the uploadHost
 - IE: "/upload.php"
- uploadPort: (integer) The port to POST to on the uploadHost
  - IE: 80
- uploadFileFieldName (sting) the field name that is used to uplaod the file
  - IE: "file"
- metadataFile: (boolean) If I am true, I will not upload a file unless its corresponding metadata file is present.
  - IE: true
- metadataFileExtension: (string) The file extension expected for metadata files
  - IE: ".json"
- additionalUploadParams: (object) If there are any additional data fields that need to accompany an upload, put them here 
  - IE: { password: "secret" }
- checkCycleTime: (integer) How often to check sourceDirectory for new files
  - IE: 5000
- logFolder: (string) where to keep the application's Log
  - IE: "./log/"
- logFile: (string) the name of the application's log file
  - IE: "autoUploader.log"
- maxLogFileSize: (integer) the largest the log file can get in bytes.  It will be deleted and started over if it gets to large
  - IE: 100000

## Notes
- Metadata files should be in the JSON format, and end with .json
- Metadata files should have the same basename as the main file
	- IE: the Metadata file for movie.mp4 would be movie.json
- An example metadata file for movie.mp4 would be something like: { "first_name":"Evan", "last_name":"Tahler", "movie_name":"My Cool Movie!" }

## Example Log Output
This is rendered to your shell and to the log file

	2012-02-29 21:23:54 | Starting...
	2012-02-29 21:23:54 | Checking folder: /Users/evantahler/Desktop/source/
	2012-02-29 21:23:54 |   No files found
	2012-02-29 21:24:09 | Checking folder: /Users/evantahler/Desktop/source/
	2012-02-29 21:24:09 |   File: test.txt
	2012-02-29 21:24:09 | 	Uploading: test.txt
	2012-02-29 21:24:09 |   Uploaded!
	2012-02-29 21:24:09 |   Files Moved
	2012-02-29 21:24:14 | Checking folder: /Users/evantahler/Desktop/source/
	2012-02-29 21:24:14 |   No files found

## Thanks
- Moving Files: http://stackoverflow.com/questions/4568689/how-do-i-move-file-a-to-a-different-partition-in-node-js
- Uploading Files: http://onteria.wordpress.com/2011/05/30/multipartform-data-uploads-using-node-js-and-http-request/