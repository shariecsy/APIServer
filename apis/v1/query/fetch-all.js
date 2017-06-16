var FetchAll = (function(){
	var _do = function(param,res){
		console.log(param.action);
		res.send('respond with a resource1111111111');
	}
	
	return {
		do:_do
	}
})();

module.exports = FetchAll;