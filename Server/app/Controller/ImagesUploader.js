var fileUpload = require('fs');
var StatusHandler = require('./StatusHandler');
var path = require('path');

function ImageUploader() {
	/*
	 * upload the image
	 */
	this.uploadImage = function(imageType, fileInstance, imagename, res, callback) {
		this.getLocation(imageType, function(location) {
			fileUpload.writeFile(path.join(__dirname,'../../images', location)+imagename+".jpg", fileInstance, function(err) {
				if(err) {
					return StatusHandler.ServerErrorStatus(res);
				}
				return callback(location+imagename+".jpg");
			})
		})
	}

	/*
	 * get the requested image
	 */
	this.getImage = function(imagePath, res, callback) {
		fileUpload.readFile(path.join(__dirname,'../../images', imagePath), function(err, data) {
			if(err) {
				return StatusHandler.ServerErrorStatus(res);
			}
			return callback(new Buffer(data).toString('base64'));
		});
	}

	/*
	 * path locations
	 */
	this.getLocation = function(type, callback) {
		var imageLocation = null;
		switch(type) {
			case "Hotel":
				imageLocation = "Hotels/";
				break;
			case "Facilities":
				imageLocation = "Facilities/";
				break;
			case "Rooms":
				imageLocation = "Rooms/";
				break;
		}
		return callback(imageLocation);
	}
}

module.exports = new ImageUploader();