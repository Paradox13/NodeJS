var cron = require('node-schedule');
var http = require('http');
var nodemailer = require('nodemailer');

var server = http.createServer();
server.listen(process.env.PORT);
console.log('server started');

/* This runs at 3:10AM every Friday, Saturday and Sunday. */
var rule2 = new cron.RecurrenceRule();
rule2.dayOfWeek = [process.env.day];
rule2.hour = process.env.hour;
rule2.minute = process.env.minute;

console.log('on ' + rule2.dayOfWeek + ' at ' + rule2.hour + ':' + rule2.minute);

cron.scheduleJob(rule2, function(){
    console.log('hit');
	http.request({host:'doubledox.ru', path:'/Other/Some.aspx?test=test'}).end();
	console.log('request sent');
});