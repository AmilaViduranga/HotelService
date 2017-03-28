var StatusHandler = require('../StatusHandler');
var ImageUploader = require('../ImagesUploader');
var Module = require("../../models/Models");
var Rooms = Module.RoomsModel;
var Hotels = Module.HotelModel;

function RoomsController() {
	/*
	 * create new room
	 */
	this.createNewRoom = function(roomInstance, res) {
		if(roomInstance.imageFile) {
			var roomImage = Buffer.from(roomInstance.imageFile, 'base64');
			ImageUploader.uploadImage("Rooms", roomImage, Math.round(new Date().getTime()/1000), res, function(imageLocation) {
				if(imageLocation) {
					roomInstance.image = imageLocation;
					Rooms.create(roomInstance).then(function(room) {
						return StatusHandler.SuccessStatus(res);
					}).catch(function(err) {
						return StatusHandler.ServerErrorStatus(res);
					})
				}
			})
		} else {
			Rooms.create(roomInstance).then(function(room) {
				return StatusHandler.SuccessStatus(res);
			}).catch(function(err) {
				return StatusHandler.ServerErrorStatus(res);
			})
		}
	}

	/*
	 * update hotel room
	 */ 
	this.updateRoom = function(roomInstance, res) {
		if(roomInstance.imageFile) {
			var roomImage = Buffer.from(roomInstance.imageFile, 'base64');
			ImageUploader.uploadImage("Rooms", roomImage, Math.round(new Date().getTime()/1000), res, function(imageLocation) {
				if(imageLocation) {
					Rooms.find({
						where: {
							id: roomInstance.id
						}
					}).then(function(room) {
						room.update({
							type: roomInstance.type,
						    image: imageLocation,
						    price: roomInstance.price,
						    description: roomInstance.description
						}).then(function(result) {
							if(result) {
								return StatusHandler.SuccessStatus(res);
							}
						}).catch(function(err) {
							return StatusHandler.ServerErrorStatus(res);
						})
					}).catch(function(err) {
						return StatusHandler.ServerErrorStatus(res);
					})
				}
			});
		} else {
			Rooms.find({
				where: {
					id: roomInstance.id
				}
			}).then(function(room) {
				room.update({
					type: roomInstance.type,
				    price: roomInstance.price,
				    description: roomInstance.description
				}).then(function(result) {
					if(result) {
						return StatusHandler.SuccessStatus(res);
					}
				}).catch(function(err) {
					return StatusHandler.ServerErrorStatus(res);
				})
			}).catch(function(err) {
				return StatusHandler.ServerErrorStatus(res);
			})
		}
	}

	/*
	 * get all details of rooms respect to particular hotel
	 */
	this.getAllRoomsRelevantToHotel = function(hotelId, res) {
		return Rooms.findAll({
			where: {
				hotelId: hotelId
			},
			attributes: ['id', 'type', 'price', 'description']
		}).then(function(data) {
			if(data) {
				res.send(data);
			} else {
				return StatusHandler.userInvalidRequestErrorStatus(res);
			}
		}).catch(function(err) {
			return StatusHandler.ServerErrorStatus(res);
		})
	}

	/*
	 * get specfic room info
	 */
	this.getIndividualRoom = function(roomId, res) {
		return Rooms.find({
			where: {
				id: roomId
			},
			attributes: ['id', 'type', 'image', 'price', 'description']
		}).then(function(data) {
			if(data) {
				console.log(data);
				if(data.image != null) {
					return ImageUploader.getImage(data.image, res, function(image) {
						data.image = image;
						res.send(data);
					});
				}
				res.send(data);
			} else {
				return StatusHandler.userInvalidRequestErrorStatus(res);
			}
		}).catch(function(err) {
			return StatusHandler.ServerErrorStatus(res);
		})
	}

	/*
	 * get room image
	 */
	this.getRoomlImage = function(roomId, res) {
		Rooms.find({
			where: {
				id: roomId
			}
		}).then(function(data) {
			return ImageUploader.getImage(data.image, res, function(data) {
				res.send(data);
			});
		}).catch(function(err) {
			return StatusHandler.ServerErrorStatus(res);
		});
	}

	/*
	 * get all the rooms with hotelinfo
	 */
	this.getAllRooms = function(res) {
		return Rooms.findAll({
			attributes: ['id', 'type', 'price', 'description'],
			include: [{
                model: Hotels
            }]
		}).then(function(data) {
			if(data) {
				res.send(data);
			} else {
				return StatusHandler.userInvalidRequestErrorStatus(res);
			}
		}).catch(function(err) {
			return StatusHandler.ServerErrorStatus(res);
		})
	}      
}

module.exports = new RoomsController();