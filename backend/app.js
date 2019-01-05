var express = require('express');
var cors = require('cors');
var bodyParser = require('body-parser');
var morgan = require('morgan');

var app = express();



var userCtrl = require('./user/userController')
var accountCtrl = require('./account/accountController')
var transactionCtrl = require('./transaction/transactionController')
var loginCtrl = require('./user/loginController')



var verifyAccessToken = require('./user/Repo/authRepo').verifyAccessToken;


app.use(morgan('dev'));
app.use(bodyParser.json());
app.use(cors());

app.use('/', loginCtrl);
app.use('/user', userCtrl);
// app.use('/user', verifyAccessToken, userCtrl);
app.use('/account', verifyAccessToken, accountCtrl);
// app.use('/transaction', verifyAccessToken, transactionCtrl);
app.use('/transaction', transactionCtrl);




var port = 3000;
app.listen(port, () => console.log(`App is running on port ${port}`));