var StatusHandler = require('../StatusHandler');
var ImageUploader = require('../ImagesUploader');
var Module = require("../../models/Models");
var Facilities = Module.FacilitiesModel;

function FacilityController() {
	/*
	 * add new Facility
	 */
	this.addFacility = function(facilityInstance, res) {
		if(facilityInstance.imageFile) {
			var facilityImage = new Buffer(facilityInstance.imageFile, 'base64');
			ImageUploader.uploadImage("Facilities", facilityImage, Math.round(new Date().getTime()/1000), res, function(path) {
				facilityInstance.image = path;
				Facilities.create(facilityInstance).then(function() {
					return StatusHandler.SuccessStatus(res);
				}).catch(function(err) {
					return StatusHandler.ServerErrorStatus(res);
				})
			});
		} else {
			Facilities.create(facilityInstance).then(function() {
				return StatusHandler.SuccessStatus(res);
			}).catch(function(err) {
				return StatusHandler.ServerErrorStatus(res);
			})
		}
	}

	/*
	 * update hotel
	 */
	this.updateFacility = function(facilityInstance, res) {
		if(facilityInstance.imageFile) {
			var facilityImage = new Buffer(facilityInstance.imageFile, 'base64');
			ImageUploader.uploadImage("Facilities", facilityImage, Math.round(new Date().getTime()/1000), res, function(path) {
				facilityInstance.image = path;
				Facilities.find({
					where: {
						id: facilityInstance.id
					}
				}).then(function(data) {
					if(data) {
						data.update({
							description: facilityInstance.description,
							image: facilityInstance.image,
							price: facilityInstance.price,
							type: facilityInstance.type
						}).then(function(result) {
							return StatusHandler.SuccessStatus(res);
						}).catch(function(err) {
							return StatusHandler.ServerErrorStatus(res);
						});
					}
				})
			});
		} else {
			Facilities.find({
				where: {
					id: facilityInstance.id
				}
			}).then(function(data) {
				if(data) {
					data.update({
						description: facilityInstance.description,
						image: facilityInstance.image,
						price: facilityInstance.price,
						type: facilityInstance.type
					}).then(function(result) {
						return StatusHandler.SuccessStatus(res);
					}).catch(function(err) {
						return StatusHandler.ServerErrorStatus(res);
					});
				}
			})
		}
	}

	/*
	 * delete hotel
	 */
	this.deleteFacility = function(facilityId, res) {
		Facilities.find({
			where: {
				id: facilityId
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
	this.getAllFacilities = function(res) {
		Facilities.findAll().then(function(data) {
			return res.send(data);
		}).catch(function(err) {
			return StatusHandler.ServerErrorStatus(res);
		});
	}

	/*
	 * get hotel by id
	 */ 
	this.getSingleFacility = function(facilityId, res) {
		Facilities.find({
			where: {
				id: facilityId
			},
			attributes: ['id', 'description', 'image', 'type', 'price']
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
	this.getFacilityImage = function(facilityId, res) {
		Facilities.find({
			where: {
				id: facilityId
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