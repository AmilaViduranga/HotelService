var Sequelize = require('sequelize');
var connection  = require('./../Connection');

var Rooms = connection.define('rooms', {
    type: Sequelize.STRING,
    image: Sequelize.STRING,
    price: Sequelize.DOUBLE,
    description: Sequelize.STRING
},{
    tableName: 'rooms',
    updatedAt: 'updatedAt',
    createdAt: 'createdAt',
    paranoid: true
});

module.exports = Rooms;