var Sequelize = require('sequelize');
var connection  = require('./../Connection');

var Facilities = connection.define('facilities', {
    type: Sequelize.STRING,
    description: Sequelize.STRING,
    image: Sequelize.STRING, 
    price: Sequelize.DOUBLE
},{
    tableName: 'facilities',
    updatedAt: 'updatedAt',
    createdAt: 'createdAt',
    paranoid: true
});

module.exports = Facilities;