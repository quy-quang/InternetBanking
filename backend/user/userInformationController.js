var express = require('express')

var router = express.Router();
var authRepo = require('./Repo/authRepo')
var md5 = require('md5')
var low = require('lowdb'),
	fileSync = require('lowdb/adapters/FileSync'),
	moment = require('moment');
const shortid = require('shortid');

const LOOP_FIND_REQUEST = 4;


router.post('/getAccountList', (req, res) => {
	// {
	// 	"userId":
	// }
	var userId = req.body.userId;


	var userAdapter = new fileSync('./userDB.json');
	var userDB = low(userAdapter);


	var accountList = userDB.get('user').find({ "userId": userId }).value().listAccount;


	res.statusCode = 201;
	res.json({accountList});
})

router.post('/getAccountInformation', (req, res) => {
	// {
	// "accountId":
	// }
	var bankAccountAdapter = new fileSync('./bankAccountDB.json');
	var bankAccountDB = low(bankAccountAdapter);
	var bankAccountId = req.body.bankAccountId;

	var bankAccountInfo =
	 bankAccountDB.get('bankAccountList').find({ "bankAccountId": bankAccountId }).value();
	
	res.statusCode = 201;
	res.json({bankAccountInfo});
})

module.exports = router;
