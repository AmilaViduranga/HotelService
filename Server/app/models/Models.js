/**
 * Created by User on 9/6/2016.
 * Develop: Amila
 * Registry of the model and every model have to register here
 */
var Models = {};

Models.BookingModel = require('./entity/BookingModel');
Models.CustomerModel = require('./entity/CustomerModel');
Models.FacilitiesModel = require('./entity/FacilitiesModel');
Models.HotelModel = require('./entity/HotelModel');
Models.RoomsModel = require('./entity/RoomsModel');

module.exports = Models;