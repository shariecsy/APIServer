var redis = require('redis');
var RDS_PORT = 6379,        //端口号
RDS_HOST = '10.211.55.6',    //服务器IP
RDS_OPTS = {};           //设置项
var redis_client = redis.createClient(RDS_PORT,RDS_HOST,RDS_OPTS);
module.exports = redis_client;