exports.upload = function(AU, filename, metadata, next){
	
	function EncodeFieldPart(boundary,name,value) {
	    var return_part = "--" + boundary + "\r\n";
	    return_part += "Content-Disposition: form-data; name=\"" + name + "\"\r\n\r\n";
	    return_part += value + "\r\n";
	    return return_part;
	}

	function EncodeFilePart(boundary,type,name,filename) {
	    var return_part = "--" + boundary + "\r\n";
	    return_part += "Content-Disposition: form-data; name=\"" + name + "\"; filename=\"" + filename + "\"\r\n";
	    return_part += "Content-Type: " + type + "\r\n\r\n";
	    return return_part;
	}
	
	function PreparePost(AU, metadata, next) {
	  var boundary = Math.random();
	  var post_data = [];
	  
	  if(metadata != null){
		  for(var i in metadata){
		  	post_data.push(new Buffer(EncodeFieldPart(boundary, i, metadata[i]), 'ascii'));
		  }
      }
	  for(var i in AU.config.additionalUploadParams){
	  	post_data.push(new Buffer(EncodeFieldPart(boundary, i, AU.config.additionalUploadParams[i]), 'ascii'));
	  }
	  post_data.push(new Buffer(EncodeFilePart(boundary, 'application/data', AU.config.uploadFileFieldName, filename), 'ascii'));

	  var file_reader = AU.fs.createReadStream(filename, {encoding: 'binary'});
	  var file_contents = '';
	  file_reader.on('data', function(data){
	    file_contents += data;
	  });
	  file_reader.on('end', function(){
	    post_data.push(new Buffer(file_contents, 'binary'))
	    post_data.push(new Buffer("\r\n--" + boundary + "--"), 'ascii');

	    MakePost(AU, post_data, boundary, next);
	  });
	}
	
	function MakePost(AU, post_data, boundary, next) {
	  var length = 0;
	  for(var i = 0; i < post_data.length; i++) {
	    length += post_data[i].length;
	  }

	  var post_options = {
	    host: AU.config.uploadHost,
	    path: AU.config.uploadPath,
	    port: AU.config.uploadPort,
	    method: 'POST',
	    headers : {
	        'Content-Type' : 'multipart/form-data; boundary=' + boundary,
	        'Content-Length' : length
	    }
	  };

	  var resp = ""
	  var post_request = AU.http.request(post_options, function(response){
		response.setEncoding('utf8');
		response.on('data', function(chunk){
		  resp += chunk;
		});
		response.on("end", function(){
		  if(typeof next == "function"){
			  next(resp);
		  }
		});
		
	  });
	  for (var i = 0; i < post_data.length; i++) {
	    post_request.write(post_data[i]);
	  }
	  post_request.end();
	}

	PreparePost(AU, metadata, next);
};