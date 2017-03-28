var Sequelize = require('sequelize');
var connection  = require('./../Connection');

var Hotel = connection.define('hotel', {
    description: Sequelize.STRING,
    image: Sequelize.STRING,
    name: Sequelize.STRING,
    location: Sequelize.STRING
},{
    tableName: 'hotel',
    updatedAt: 'updatedAt',
    createdAt: 'createdAt',
    paranoid: true
});

module.exports = Hotel;