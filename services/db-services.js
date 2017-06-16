var mysql = require('mysql');
var option = require('../config/db');
var dbpool = (function() {
	return mysql.createPool(option);
})();
module.exports = dbpool;