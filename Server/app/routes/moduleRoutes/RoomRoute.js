var express = require('express');
var router = express.Router();
var ControllerMap = require('../../Controller/ControllerMap');
var RoomsController = ControllerMap.RoomsController;

router.post('/', function(req, res, next) {
	RoomsController.createNewRoom(req.body, res);
});

router.put('/', function(req, res, next) {
	RoomsController.updateRoom(req.body, res);
})

router.get('/inhotel/:hotelId', function(req, res, next) {
	RoomsController.getAllRoomsRelevantToHotel(req.params.hotelId, res);
})

router.get('/:id', function(req, res, next) {
	RoomsController.getIndividualRoom(req.params.id, res);
})

router.get('/image/:id', function(req, res, next) {
	RoomsController.getRoomlImage(req.params.id, res);
})

router.get('/', function(req, res, next) {
	RoomsController.getAllRooms(res);
})
module.exports = router;