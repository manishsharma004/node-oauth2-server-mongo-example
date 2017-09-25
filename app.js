var express = require('express'),
	bodyParser = require('body-parser'),
	oauthserver = require('oauth2-server'),
	mongoose = require('mongoose');

var app = express();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());



var mongoUri = 'mongodb://localhost/oauth';
mongoose.connect(mongoUri, function(err, res) {
	if (err) {
		return console.error('Error connecting to "%s":', mongoUri, err);
	}
	console.log('Connected successfully to "%s"', mongoUri);
});


app.oauth = oauthserver({
	model: require('./model.js'),
    grants: ['password'],
    accessTokenLifetime: null
});
    console.log(app.oauth.grant().toString());

var grant = app.oauth.grant();

app.post('/auth/token', function (req, res, next) {
    return grant(req, res, next);

});
// 
// console.log(app.oauth);
// 
// app.all('/oauth/token', app.oauth.grant());
// app.post('/oauth/token', app.oauth.grant());
// 
// console.log(app.oauth);
// app.listen(3000);
// 
// app.get('/', app.oauth.authorise(), function (req, res) {
// 	res.send('Congratulations, you are in a secret area!');
// });
// console.log(app.oauth);
// 
// app.use(app.oauth.errorHandler());

app.listen(3000);
