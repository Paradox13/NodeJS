var cron = require('node-schedule');
var http = require('http');
var nodemailer = require('nodemailer');

var server = http.createServer();
server.listen(process.env.PORT);
console.log('server started');

/* This runs at 3:10AM every Friday, Saturday and Sunday. */
var rule2 = new cron.RecurrenceRule();
rule2.dayOfWeek = [parseInt(process.env.day)];
rule2.hour = parseInt(process.env.hour);
rule2.minute = parseInt(process.env.minute);

console.log('on ' + rule2.dayOfWeek + ' at ' + rule2.hour + ':' + rule2.minute);

var transporter = nodemailer.createTransport({
    service: 'Yandex',
    auth: {
        user: process.env.user,
        pass: process.env.pass
    }
});

cron.scheduleJob(rule2, function(){
    console.log('hit');
	http.request({host:'doubledox.ru', path:'/Other/Some.aspx?test=test'}).end();
	console.log('request sent');
	
	var mailOptions = {
		from: 'DoubleeDox', // sender address
		to: 'parax_85@mail.ru', // list of receivers
		subject: 'Hello', // Subject line
		text: 'Hello world', // plaintext body
		html: '<b>Hello world</b>' // html body
	};
	
	transporter.sendMail(mailOptions, function(error, info){
		if(error){
			console.log(error);
		}else{
			console.log('Message sent: ' + info.response);
		}
	});
});