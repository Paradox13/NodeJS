var cron = require('node-schedule');
var http = require('http');

var server = http.createServer();
server.listen(process.env.PORT);
console.log('server started??');

/* This runs at 3:10AM every Friday, Saturday and Sunday. */
var rule2 = new cron.RecurrenceRule();
rule2.dayOfWeek = [2];
rule2.hour = 23;
rule2.minute = 30;
cron.scheduleJob(rule2, function(){
    http.request({host:'doubledox.ru', path:'/Other/Some.aspx?test=test'}).end();
	console.log('request sent');
});