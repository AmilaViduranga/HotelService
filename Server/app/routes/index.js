/*
 * handle the url for any get, put, post and delete request
 * developer : Amila
 */

 
var express = require('express');
var router = express.Router();

var HotelRoute = require('./moduleRoutes/HotelRoute');
var RoomRoute = require('./moduleRoutes/RoomRoute');

router.use('/hotel/', HotelRoute);
router.use('/room/', RoomRoute);

module.exports = router;
