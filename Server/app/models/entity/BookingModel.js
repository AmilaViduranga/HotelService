var Sequelize = require('sequelize');
var connection  = require('./../Connection');

var Booking = connection.define('booking', {
    description: Sequelize.STRING,
    date: Sequelize.DATE
},{
    tableName: 'booking',
    updatedAt: 'updatedAt',
    createdAt: 'createdAt',
    paranoid: true
});

module.exports = Booking;