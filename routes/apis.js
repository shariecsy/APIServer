var express = require('express');
var router = express.Router();

/* call api by get/post method. */
router.use('/:version/:module/:submodule/:action', function(req, res, next) {
	console.error(req.query);
	console.log('../apis/' + req.params.version + '/' + req.params.module + '/' + req.params.submodule);
	try {
		var api = require('../apis/' + req.params.version + '/' + req.params.module + '/' + req.params.submodule);
		api.do(req.params.action, req.query, res);
	} catch(e) {
		console.error(e);
	}
});

module.exports = router;