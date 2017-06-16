var pool = require('../../../services/db-services.js');
var Constants = require('../../constants/register.js');
var Redis = require('../../../services/redis-client.js');
var Register = (function() {
	//注册
	var _register = function(param, res) {
		_check_user(param, res, _insert_user); //先检测用户是否已注册
	};

	//添加记录
	var _insert_user = function(param, res) {
		pool.query('insert into user set ?', {
			mobile_no: param.mobileNo
		}, function(error, results, fields) {
			if(error) {
				res.json({
					code: -1,
					msg: error
				});
			} else {
				res.json({
					code: 0,
					result: results.insertId
				});
			}
		});
	}

	//检查用户是否已注册
	var _check_user = function(param, res, fn) {
		pool.query('select count(1) as solution from user where mobile_no = ?', [param.mobileNo], function(error, results, fields) {
			if(error) {
				res.json({
					code: -1,
					msg: error
				});
			} else {
				if(results[0].solution > 0) { //已注册
					res.json({
						code: -1,
						msg: '用户已注册!'
					});
				} else {
					fn(param, res);
				}
			}
		});
	}

	//校验验证码
	var _check_code = function(param, res) {
		Redis.get(param.mobileNo, function(err, value) {
			if(err) {
				res.json({
					code: -1,
					msg: err
				})
			} else {
				console.log(param.mobileNo+':'+value);
				if(value == param.code) {
					Redis.del(param.mobileNo);
					res.json({
						code: 0,
						result: true
					})
				}else{
					res.json({code:-1,msg:'验证码不正确'})
				}
			}
		});
	}

	//获取验证码
	var _get_code = function(param, res) {
		_check_user(param, res, function() {
			Redis.set(param.mobileNo, _create_code(param.mobileNo));
			res.json({
				code: 0,
				time: 50 * 1000
			});
		});
	}

	//创建验证码
	var _create_code = function(mobileNo) {
		return '123456';
	}

	return {
		do: function(action, param, res) {
			if(action == Constants.REGISTER_ACTION) { //注册
				_register(param, res);
			} else if(action == Constants.CHECK_CODE_ACTION) { //获取难码
				_check_code(param, res);
			} else if(action == Constants.GET_CODE_ACTION) { //获取难码
				_get_code(param, res);
			}
		}
	}
})();

module.exports = Register;