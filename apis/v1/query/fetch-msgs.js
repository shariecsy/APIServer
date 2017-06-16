var pool = require('../../../services/db-services.js');
var Constants = require('../../constants/fetch-msgs.js');
var MsgQuery = (function(){
	var _fetch_msg_list = function(param,res){
		pool.query('select a.id,a.msg_title as title,a.msg_content as content,a.msg_sub_content as subtitle,a.msg_time as btime from msg_center a,user b where a.user_id = b.user_id and b.mobile_no = ?', [param.mobileNo], function(error, results, fields) {
			if(error) {
				res.json({
					code: -1,
					msg: error
				});
			} else {
				res.json({code:0,result:results});
			}
		});
	}
	
	return {
		do:function(action,param,res){
			if(action==Constants.FETCH_MSG_LIST){
				_fetch_msg_list(param,res);
			}
		}
	}
})();

module.exports = MsgQuery;
