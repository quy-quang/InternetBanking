var express = require('express');
var cors = require('cors');
var bodyParser = require('body-parser');
var morgan = require('morgan');

var app = express();



var userLoginCtrl = require('./user/userLoginController')
var verifyAccessToken = require('./user/Repo/authRepo').verifyAccessToken;
var userInformationCtrl = require('./user/userInformationController')


app.use(morgan('dev'));
app.use(bodyParser.json());
app.use(cors());

app.use('/userLogin', userLoginCtrl);
app.use('/userInformation', userInformationCtrl);


var port = 3000;
app.listen(port, () => console.log(`App is running on port ${port}`));