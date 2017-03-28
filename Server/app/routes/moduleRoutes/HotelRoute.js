var express = require('express');
var router = express.Router();
var ControllerMap = require('../../Controller/ControllerMap');
var HotelController = ControllerMap.HotelController;

router.post('/', function(req, res, next) {
	HotelController.addHotel(req.body, res);
});

router.put('/', function(req, res, next) {
	HotelController.updateHotel(req.body, res);
})

router.delete('/:id', function(req, res, next) {
	HotelController.deleteHotel(req.params.id, res);
})

router.get('/', function(req, res, next) {
	HotelController.getAllHotels(res);
})

router.get('/:id', function(req, res, next) {
	HotelController.getSingleHotel(req.params.id, res);
})

router.get('/image/:id', function(req, res, next) {
	HotelController.getHotelImage(req.params.id, res);
})

module.exports = router;