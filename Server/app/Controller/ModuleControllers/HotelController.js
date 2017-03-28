var StatusHandler = require('../StatusHandler');
var ImageUploader = require('../ImagesUploader');
var Module = require("../../models/Models");
var Hotel = Module.HotelModel;

function HotelController() {
	/*
	 * add new hotel
	 */
	this.addHotel = function(hotelInstance, res) {
		if(hotelInstance.imageFile) {
			var hotelImage = new Buffer(hotelInstance.imageFile, 'base64');
			ImageUploader.uploadImage("Hotel", hotelImage, Math.round(new Date().getTime()/1000), res, function(path) {
				hotelInstance.image = path;
				Hotel.create(hotelInstance).then(function() {
					return StatusHandler.SuccessStatus(res);
				}).catch(function(err) {
					return StatusHandler.ServerErrorStatus(res);
				})
			});
		} else {
			Hotel.create(hotelInstance).then(function() {
				return StatusHandler.SuccessStatus(res);
			}).catch(function(err) {
				return StatusHandler.ServerErrorStatus(res);
			});
		}
	}

	/*
	 * update hotel
	 */
	this.updateHotel = function(hotelInstance, res) {
		if(hotelInstance.imageFile) {
			var hotelImage = Buffer.from(hotelInstance.imageFile, 'base64');
			ImageUploader.uploadImage("Hotel", hotelImage, Math.round(new Date().getTime()/1000), res, function(path) {
				hotelInstance.image = path;
				Hotel.find({
					where: {
						id: hotelInstance.id
					}
				}).then(function(data) {
					if(data) {
						data.update({
							description: hotelInstance.description,
							image: hotelInstance.image,
							name: hotelInstance.name,
							location: hotelInstance.location
						}).then(function(result) {
							return StatusHandler.SuccessStatus(res);
						}).catch(function(err) {
							return StatusHandler.ServerErrorStatus(res);
						});
					}
				})
			});
		} else {
			Hotel.find({
				where: {
					id: hotelInstance.id
				}
			}).then(function(data) {
				if(data) {
					data.update({
						description: hotelInstance.description,
						name: hotelInstance.name,
						location: hotelInstance.location
					}).then(function(result) {
						return StatusHandler.SuccessStatus(res);
					}).catch(function(err) {
						return StatusHandler.ServerErrorStatus(res);
					});
				}
			}).catch(function(err) {
				return StatusHandler.ServerErrorStatus(res);
			});
		}
	}

	/*
	 * delete hotel
	 */
	this.deleteHotel = function(hotelId, res) {
		Hotel.find({
			where: {
				id: hotelId
			}
		}).then(function(data) {
			data.destroy().then(function() {
				return StatusHandler.SuccessStatus(res);
			}).catch(function(err) {
				return StatusHandler.ServerErrorStatus(res);
			});;
		}).catch(function(err) {
			return StatusHandler.ServerErrorStatus(res);
		});
	}

	/*
	 * get all hotel details
	 */ 
	this.getAllHotels = function(res) {
		Hotel.findAll().then(function(data) {
			return res.send(data);
		}).catch(function(err) {
			return StatusHandler.ServerErrorStatus(res);
		});
	}

	/*
	 * get hotel by id
	 */ 
	this.getSingleHotel = function(hotelId, res) {
		Hotel.find({
			where: {
				id: hotelId
			},
			attributes: ['id', 'description', 'image', 'name', 'location']
		}).then(function(data) {
			if(data.image != null) {
				return ImageUploader.getImage(data.image, res, function(image) {
					data.image = image;
					res.send(data);
				});
			}
			return res.send(data);
		}).catch(function(err) {
			return StatusHandler.ServerErrorStatus(res);
		});
	}

	/*
	 * get hotel image
	 */
	this.getHotelImage = function(hotelId, res) {
		Hotel.find({
			where: {
				id: hotelId
			}
		}).then(function(data) {
			return ImageUploader.getImage(data.image, res, function(data) {
				res.send(data);
			});
		}).catch(function(err) {
			return StatusHandler.ServerErrorStatus(res);
		});
	}   
}

module.exports = new HotelController();