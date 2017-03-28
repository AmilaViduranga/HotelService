/**
 * Created by Amila on 9/7/2016.
 * create relationship in between each models.
 */
var Models = require('./Models');
var connection = require('./Connection');
var Relationship = function() {

    Models.HotelModel.hasMany(Models.RoomsModel);
    Models.RoomsModel.belongsTo(Models.HotelModel);

    Models.CustomerModel.hasMany(Models.BookingModel);
    Models.BookingModel.belongsTo(Models.CustomerModel);

    Models.RoomsModel.belongsToMany(Models.FacilitiesModel, {through: 'RoomFacility'});
    Models.FacilitiesModel.belongsToMany(Models.RoomsModel, {through: 'RoomFacility'});

    Models.BookingModel.belongsToMany(Models.RoomsModel, {through: 'RoomBooking'});
    Models.RoomsModel.belongsToMany(Models.BookingModel, {through: 'RoomBooking'});

    Models.BookingModel.belongsToMany(Models.FacilitiesModel, {through: 'BookingFacility'});
    Models.FacilitiesModel.belongsToMany(Models.BookingModel, {through: 'BookingFacility'});

    connection
        .sync()
        .then(function(err) {
            console.log("Database created");
        }, function (err) {
            console.log('An error occurred while creating the table:', err);
        });
}

module.exports = new Relationship();