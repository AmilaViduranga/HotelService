var Sequelize = require('sequelize');
var connection  = require('./../Connection');

var Customer = connection.define('customer', {
    contact: Sequelize.STRING,
    customerName: Sequelize.STRING
},{
    tableName: 'customer',
    updatedAt: 'updatedAt',
    createdAt: 'createdAt',
    paranoid: true
});

module.exports = Customer;